export function generateRemark(average: number): string {
  if (average >= 80) return 'Excellent performance. Keep up the outstanding work!';
  if (average >= 70) return 'Very good performance. Continue to excel!';
  if (average >= 60) return 'Good effort. There is room for improvement.';
  if (average >= 50) return 'Satisfactory performance. More effort needed.';
  return 'Needs significant improvement. Please seek additional help.';
}

export function generateSubjectRemark(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 60) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Poor';
}
