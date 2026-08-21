import { NextResponse } from 'next/server';
import { projects } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ data: projects });
}

export async function POST(request: Request) {
  const body = await request.json();
  // In production, save to database here
  const newProject = {
    id: `p${Date.now()}`,
    ...body,
  };
  return NextResponse.json({ data: newProject, message: 'Project created successfully.' }, { status: 201 });
}
