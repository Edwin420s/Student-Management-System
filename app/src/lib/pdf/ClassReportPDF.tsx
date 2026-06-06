import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    row: { flexDirection: 'row' },
    stats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    statBox: { padding: 10, backgroundColor: '#f5f5f5', width: '30%' },
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
          <View style={styles.table}>
            <View style={[styles.row, styles.tableHeader]}>
              <Text style={[styles.cell, { flex: 0.5 }]}>Rank</Text>
              <Text style={[styles.cell, { flex: 1 }]}>Admission No</Text>
              <Text style={[styles.cell, { flex: 1.5 }]}>Name</Text>
              <Text style={[styles.cell, { flex: 0.5 }]}>Total</Text>
              <Text style={[styles.cell, { flex: 0.5 }]}>Average</Text>
            </View>
            {rankings.map((student: any, index: number) => (
              <View key={student.id} style={styles.row}>
                <Text style={[styles.cell, { flex: 0.5 }]}>{index + 1}</Text>
                <Text style={[styles.cell, { flex: 1 }]}>{student.admissionNumber}</Text>
                <Text style={[styles.cell, { flex: 1.5 }]}>{student.firstName} {student.lastName}</Text>
                <Text style={[styles.cell, { flex: 0.5 }]}>{student.total.toFixed(1)}</Text>
                <Text style={[styles.cell, { flex: 0.5 }]}>{student.average.toFixed(1)}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
