import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import * as XLSX from 'xlsx';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const students = await prisma.student.findMany({
    include: { stream: true },
    orderBy: { admissionNumber: 'asc' },
  });

  const data = students.map(s => ({
    'Admission Number': s.admissionNumber,
    'First Name': s.firstName,
    'Last Name': s.lastName,
    'Gender': s.gender,
    'Date of Birth': s.dob?.toISOString().split('T')[0] || '',
    'Email': s.email || '',
    'Phone': s.phone || '',
    'Class Stream': s.stream.name,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=students.xlsx',
    },
  });
}
