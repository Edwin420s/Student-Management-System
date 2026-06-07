import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import Papa from 'papaparse';

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const text = await file.text();
  const results = Papa.parse(text, { header: true });

  // Fetch all streams into memory to avoid N+1 query problem
  const allStreams = await prisma.classStream.findMany();
  const streamMap = new Map(allStreams.map((s: any) => [s.name, s.id]));

  // Fetch all existing admission numbers to avoid N+1 duplicate check
  const existingAdmissionNumbers = new Set(
    (await prisma.student.findMany({ select: { admissionNumber: true } }))
      .map((s: any) => s.admissionNumber)
  );

  const students = [];
  const errors = [];

  for (const row of results.data as any[]) {
    try {
      const streamId = streamMap.get(row.stream);

      if (!streamId) {
        errors.push({ row: row.admissionNumber, error: 'Stream not found' });
        continue;
      }

      // Check for duplicate admission number using in-memory set
      if (existingAdmissionNumbers.has(row.admissionNumber)) {
        errors.push({ row: row.admissionNumber, error: `Admission number ${row.admissionNumber} already exists` });
        continue;
      }

      const student = await prisma.student.create({
        data: {
          admissionNumber: row.admissionNumber,
          firstName: row.firstName,
          lastName: row.lastName,
          gender: row.gender,
          dob: row.dob ? new Date(row.dob) : null,
          email: row.email || null,
          phone: row.phone || null,
          streamId: streamId,
        },
      });
      students.push(student);
      existingAdmissionNumbers.add(row.admissionNumber); // Add to set to catch duplicates within CSV
    } catch (error) {
      errors.push({ row: row.admissionNumber, error: 'Failed to create student' });
    }
  }

  return NextResponse.json({ 
    imported: students.length, 
    errors,
    message: `Successfully imported ${students.length} students. ${errors.length} errors.`
  });
}
