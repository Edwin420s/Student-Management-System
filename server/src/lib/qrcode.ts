import QRCode from 'qrcode';

export async function generateQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return '';
  }
}

export function generateReportId(studentId: string, examId: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `RPT-${studentId.substring(0, 6)}-${examId.substring(0, 6)}-${timestamp}-${random}`.toUpperCase();
}
