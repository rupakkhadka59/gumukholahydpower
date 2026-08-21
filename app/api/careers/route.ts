import { NextResponse } from 'next/server';

const mockCareers = [
  { id: 'j1', title: 'Senior Civil Engineer', type: 'Full-Time', location: 'On-Site (Upper Gumu Project)', department: 'Engineering', deadline: '2026-09-30', description: 'Lead civil engineering works on site.' },
  { id: 'j2', title: 'Environmental Health & Safety Manager', type: 'Full-Time', location: 'Regional Office', department: 'Operations', deadline: '2026-09-15', description: 'Manage EHS compliance across all plant sites.' },
  { id: 'j3', title: 'Hydrologist', type: 'Full-Time', location: 'Headquarters', department: 'R&D', deadline: '2026-10-01', description: 'Analyze hydrological data to optimize generation output.' },
];

export async function GET() {
  return NextResponse.json({ data: mockCareers });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newItem = {
    id: `j${Date.now()}`,
    ...body,
  };
  return NextResponse.json({ data: newItem, message: 'Vacancy created successfully.' }, { status: 201 });
}
