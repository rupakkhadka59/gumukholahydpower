import { randomUUID } from 'crypto';
import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import type { NewsItem } from '@/lib/data';
import { getStoredNews, saveNews } from '@/lib/news-store';

export const runtime = 'nodejs';
const newsUploadDirectory = path.join(process.cwd(), 'public', 'uploads', 'news');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.svg', '.webp', '.avif', '.heic', '.heif']);

export async function GET() {
  return NextResponse.json({ data: await getStoredNews() }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const formData = contentType.includes('multipart/form-data') ? await request.formData() : null;
  const body = formData ? Object.fromEntries(['title', 'date', 'excerpt', 'content'].map((field) => [field, formData.get(field)])) : await request.json();
  const image = formData?.get('image');
  const pdf = formData?.get('pdf');
  await mkdir(newsUploadDirectory, { recursive: true });
  const uploads: { imageUrl?: string; pdfUrl?: string } = {};

  if (image instanceof File && image.size > 0) {
    const extension = path.extname(image.name).toLowerCase();
    if (!imageExtensions.has(extension)) return NextResponse.json({ message: 'Unsupported image type.' }, { status: 400 });
    const fileName = `${randomUUID()}${extension}`;
    await writeFile(path.join(newsUploadDirectory, fileName), Buffer.from(await image.arrayBuffer()));
    uploads.imageUrl = `/uploads/news/${fileName}`;
  }
  if (pdf instanceof File && pdf.size > 0) {
    if (path.extname(pdf.name).toLowerCase() !== '.pdf') return NextResponse.json({ message: 'Only PDF files are supported.' }, { status: 400 });
    const fileName = `${randomUUID()}.pdf`;
    await writeFile(path.join(newsUploadDirectory, fileName), Buffer.from(await pdf.arrayBuffer()));
    uploads.pdfUrl = `/uploads/news/${fileName}`;
  }

  const newItem: NewsItem = {
    id: `n${Date.now()}`,
    ...body,
    imageUrl: uploads.imageUrl,
    pdfUrl: uploads.pdfUrl,
  };
  await saveNews([...(await getStoredNews()), newItem]);
  return NextResponse.json({ data: newItem, message: 'News article created successfully.' }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json() as { id?: string };
  const articles = await getStoredNews();
  const article = articles.find((item) => item.id === id);
  if (!article) return NextResponse.json({ message: 'News article not found.' }, { status: 404 });

  for (const fileUrl of [article.imageUrl, article.pdfUrl]) {
    if (!fileUrl?.startsWith('/uploads/news/')) continue;
    try {
      await unlink(path.join(process.cwd(), 'public', fileUrl));
    } catch {
      // Continue removing article metadata when an attachment is already missing.
    }
  }

  await saveNews(articles.filter((item) => item.id !== id));
  return NextResponse.json({ message: 'News article deleted successfully.' });
}
