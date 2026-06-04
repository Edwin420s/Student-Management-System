import { Document, Page, Text, View, StyleSheet, Table, TableCell, TableHeader, TableRow } from '@react-pdf/renderer';

interface ClassReportPDFProps {
  stream: any;
  exam: any;
  students: any[];
  rankings: any[];
  classMean: number;
}

export function ClassReportPDF({ stream, exam, students, rankings, classMean }: ClassReportPDFProps) {
  const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Helvetica' },
    header: { marginBottom: 20, borderBottom: '2 solid #000', paddingBottom: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
    subtitle: { fontSize: 14, color: '#666' },
    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: { backgroundColor: '#f0f0f0', fontWeight: 'bold' },
    cell: { padding: 8, border: '1 solid #ddd', fontSize: 10 },
    row: { '&:nth-child(even)': { backgroundColor: '#f9f9f9' } },
    stats: { display: 'flex', justifyContent: 'space-between', marginBottom: 20 },
    statBox: { padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5, width: '30%' },
    statLabel: { fontSize: 10, color: '#666' },
    statValue: { fontSize: 20, fontWeight: 'bold' },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Class Report</Text>
          <Text style={styles.subtitle}>{stream.name} - {exam.name} ({exam.term} {exam.year})</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Students</Text>
            <Text style={styles.statValue}>{students.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Class Mean</Text>
            <Text style={styles.statValue}>{classMean.toFixed(1)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Top Score</Text>
            <Text style={styles.statValue}>{rankings[0]?.average.toFixed(1) || 0}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Performance</Text>
          <Table style={styles.table}>
            <TableHeader>
              <TableRow style={styles.tableHeader}>
                <TableCell style={styles.cell}>Rank</TableCell>
                <TableCell style={styles.cell}>Admission No</TableCell>
                <TableCell style={styles.cell}>Name</TableCell>
                <TableCell style={styles.cell}>Total</TableCell>
                <TableCell style={styles.cell}>Average</TableCell>
              </TableRow>
            </TableHeader>
            {rankings.map((student, index) => (
              <TableRow key={student.id} style={styles.row}>
                <TableCell style={styles.cell}>{index + 1}</TableCell>
                <TableCell style={styles.cell}>{student.admissionNumber}</TableCell>
                <TableCell style={styles.cell}>{student.firstName} {student.lastName}</TableCell>
                <TableCell style={styles.cell}>{student.total.toFixed(1)}</TableCell>
                <TableCell style={styles.cell}>{student.average.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </Table>
        </View>
      </Page>
    </Document>
  );
}
