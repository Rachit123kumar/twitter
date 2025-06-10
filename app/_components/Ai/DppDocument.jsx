// app/_components/Ai/PdfDocument.jsx
'use client'

import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from '@react-pdf/renderer'

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #ccc'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  description: {
    marginBottom: 5
  },
  option: {
    marginLeft: 10
  },
  answersSection: {
    marginTop: 30,
    borderTop: '2px solid black',
    paddingTop: 20
  },
  answerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline'
  }
})

const DppDocument = ({ questions }) => (
  <Document>
    <Page style={styles.page}>
      {/* Questions */}
      {questions.map((q, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.title}>{index + 1}. {q.title}</Text>
          {q.description && <Text style={styles.description}>{q.description}</Text>}
          {q.options.map((opt, i) => (
            <Text key={i} style={styles.option}>• {opt}</Text>
          ))}
        </View>
      ))}

      {/* Answers at the End */}
      <View style={styles.answersSection}>
        <Text style={styles.answerTitle}>Answers</Text>
        {questions.map((q, index) => (
          <Text key={index}>
            {index + 1}. {q.correct_answer}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
)

export default DppDocument
