import { randomUUID } from 'crypto';
import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import type { DownloadItem } from '@/lib/data';
import { getStoredReports, saveReports } from '@/lib/report-store';
import { addActivity } from '@/lib/activity-store';

export const runtime = 'nodejs';
const reportDirectory = path.join(process.cwd(), 'public', 'uploads', 'reports');

export async function GET() {
  return NextResponse.json({ data: await getStoredReports() }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const formData = contentType.includes('multipart/form-data') ? await request.formData() : null;
  const body = formData ? Object.fromEntries(['title', 'description', 'type', 'date'].map((field) => [field, formData.get(field)])) : await request.json();
  const file = formData?.get('file');
  let fileUrl = '';
  let fileSize = String(body.fileSize ?? '');

  if (file instanceof File && file.size > 0) {
    if (path.extname(file.name).toLowerCase() !== '.pdf') return NextResponse.json({ message: 'Only PDF files are supported.' }, { status: 400 });
    await mkdir(reportDirectory, { recursive: true });
    const fileName = `${randomUUID()}.pdf`;
    await writeFile(path.join(reportDirectory, fileName), Buffer.from(await file.arrayBuffer()));
    fileUrl = `/uploads/reports/${fileName}`;
    fileSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
  }
  const newItem: DownloadItem = {
    id: `d${randomUUID()}`,
    ...body,
    type: 'PDF',
    fileSize,
    fileUrl,
  };
  await saveReports([newItem, ...(await getStoredReports())]);
  await addActivity(`Report added: ${String(newItem.title)}`);
  return NextResponse.json({ data: newItem, message: 'Download created successfully.' }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json() as { id?: string };
  const reports = await getStoredReports();
  const report = reports.find((item) => item.id === id);
  if (!report) return NextResponse.json({ message: 'Report not found.' }, { status: 404 });

  if (report.fileUrl?.startsWith('/uploads/reports/')) {
    try {
      await unlink(path.join(process.cwd(), 'public', report.fileUrl));
    } catch {
      // Continue removing metadata when the file is already missing.
    }
  }

  await saveReports(reports.filter((item) => item.id !== id));
  await addActivity(`Report deleted: ${report.title}`);
  return NextResponse.json({ message: 'Report deleted successfully.' });
}
