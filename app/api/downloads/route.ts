import { NextResponse } from 'next/server';
import { downloads } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ data: downloads });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newItem = {
    id: `d${Date.now()}`,
    ...body,
  };
  return NextResponse.json({ data: newItem, message: 'Download created successfully.' }, { status: 201 });
}
