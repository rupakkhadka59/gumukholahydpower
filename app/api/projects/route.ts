import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { getStoredProjects, saveProjects } from '@/lib/project-store';
import type { Project } from '@/lib/data';
import { addActivity } from '@/lib/activity-store';

export const runtime = 'nodejs';

const projectImageDirectory = path.join(process.cwd(), 'public', 'uploads', 'projects');
const supportedImageExtensions = new Set(['.heic', '.heif', '.jpg', '.jpeg', '.png', '.svg', '.webp', '.avif']);

export async function GET() {
  return NextResponse.json({ data: await getStoredProjects() }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const formData = contentType.includes('multipart/form-data') ? await request.formData() : null;
  const body = formData
    ? Object.fromEntries(['id', 'name', 'location', 'capacityMW', 'status', 'commissioningYear', 'image', 'description'].map((field) => [field, formData.get(field)]))
    : await request.json();
  const file = formData?.get('imageFile');
  let image = String(body.image ?? '');
  if (image && !image.startsWith('/') && !/^https?:\/\//.test(image)) image = '';

  if (file instanceof File && file.size > 0) {
    const extension = path.extname(file.name).toLowerCase();
    if (!supportedImageExtensions.has(extension)) return NextResponse.json({ message: 'Unsupported image type.' }, { status: 400 });
  await mkdir(projectImageDirectory, { recursive: true });
  const fileName = `${randomUUID()}${extension}`;
  await writeFile(path.join(projectImageDirectory, fileName), Buffer.from(await file.arrayBuffer()));
    image = `/uploads/projects/${fileName}`;
  }

  const project: Project = {
    id: String(body.id ?? `p${Date.now()}`),
    name: String(body.name ?? ''),
  location: String(body.location ?? ''),
  capacityMW: Number(body.capacityMW ?? 0),
  status: body.status as Project['status'],
  commissioningYear: body.commissioningYear ? Number(body.commissioningYear) : undefined,
  image,
  description: String(body.description ?? ''),
  };
  const items = await getStoredProjects();
  const existingProject = items.some((item) => item.id === project.id);
  const nextItems = existingProject ? items.map((item) => item.id === project.id ? project : item) : [project, ...items];
  await saveProjects(nextItems);
  await addActivity(`${existingProject ? 'Project updated' : 'Project added'}: ${project.name}`);
  return NextResponse.json({ data: project, message: existingProject ? 'Project updated successfully.' : 'Project created successfully.' }, { status: existingProject ? 200 : 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json() as { id?: string };
  const items = await getStoredProjects();
  await saveProjects(items.filter((item) => item.id !== id));
  await addActivity(`Project deleted: ${id}`);
  return NextResponse.json({ message: 'Project deleted successfully.' });
}
