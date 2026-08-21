import { NextResponse } from 'next/server';
import { news } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ data: news });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newItem = {
    id: `n${Date.now()}`,
    ...body,
  };
  return NextResponse.json({ data: newItem, message: 'News article created successfully.' }, { status: 201 });
}
