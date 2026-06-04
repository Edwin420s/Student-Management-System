import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottom: 1, paddingBottom: 10 },
  schoolName: { fontSize: 18, fontWeight: 'bold' },
  title: { fontSize: 14, fontWeight: 'bold', marginVertical: 10 },
  row: { flexDirection: 'row', marginBottom: 5 },
  label: { width: '30%', fontWeight: 'bold' },
  value: { width: '70%' },
  table: { marginTop: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 5, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', padding: 5, borderBottomWidth: 1 },
  colSubject: { width: '40%' },
  colScore: { width: '20%' },
  colGrade: { width: '20%' },
  colRemark: { width: '20%' },
  footer: { marginTop: 30, textAlign: 'center', fontSize: 10, color: 'gray' },
});

export function ReportCardPDF({ student, scores, exam, ranking, total, average, grade, remark }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.schoolName}>Ikonex Academy</Text>
          <Text>Report Card</Text>
        </View>
        <View style={styles.row}><Text style={styles.label}>Student Name:</Text><Text style={styles.value}>{student.firstName} {student.lastName}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Admission No:</Text><Text style={styles.value}>{student.admissionNumber}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Class Stream:</Text><Text style={styles.value}>{student.stream.name}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Exam:</Text><Text style={styles.value}>{exam.name} - Term {exam.term} {exam.year}</Text></View>
        <Text style={styles.title}>Academic Performance</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colSubject}>Subject</Text>
            <Text style={styles.colScore}>Score</Text>
            <Text style={styles.colGrade}>Grade</Text>
            <Text style={styles.colRemark}>Remark</Text>
          </View>
          {scores.map(s => (
            <View key={s.subjectId} style={styles.tableRow}>
              <Text style={styles.colSubject}>{s.subject.name}</Text>
              <Text style={styles.colScore}>{s.score}</Text>
              <Text style={styles.colGrade}>{s.grade}</Text>
              <Text style={styles.colRemark}>{s.remark}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Total Marks: {total}</Text>
          <Text>Average: {average.toFixed(2)}</Text>
          <Text>Position in Class: {ranking}</Text>
          <Text>Grade: {grade}</Text>
          <Text>Remark: {remark}</Text>
        </View>
        <View style={styles.footer}>
          <Text>Generated on {new Date().toLocaleDateString()}</Text>
          <Text>Valid only with official signature</Text>
        </View>
      </Page>
    </Document>
  );
}