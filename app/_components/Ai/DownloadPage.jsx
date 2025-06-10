"use client"
import { PDFDownloadLink } from '@react-pdf/renderer';
import DppDocument from './DppDocument';


export default function DownloadPage({questions}) {

    console.log(questions)
  return (
    <div className="p-4">
      <PDFDownloadLink
        document={<DppDocument questions={questions} />}
        fileName="dpp-questions.pdf"
      >
        {({ loading }) =>
          loading ? 'Preparing PDF...' : (
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Download DPP PDF
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
