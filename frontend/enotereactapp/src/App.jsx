import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import PDFViewer from './components/PDFViewer';
import './App.css';

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  return (
    <div className="App">
      <h1>PDF Reader</h1>
      <FileUpload setPdfFile={setPdfFile} />
      {pdfFile && <PDFViewer pdfFile={pdfFile} />}
    </div>
  );
}

export default App;
