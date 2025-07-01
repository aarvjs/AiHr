import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const StudentCourses = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [details, setDetails] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Choose a file first');
    setLoading(true);

    const fileExt = file.name.split('.').pop();
    const filePath =` resumes/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('resumes')
      .upload(filePath, file);

    if (error) {
      alert('Upload failed');
      setLoading(false);
      return;
    }

    const fileType = file.type;

    if (fileType === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }
        await sendToJemenie(text);
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        await sendToJemenie(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const sendToJemenie = async (resumeText) => {
    try {
      // Using local backend proxy to avoid CORS issues
      const response = await fetch('http://localhost:5000/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume: resumeText }),
      });

      const data = await response.json();
      console.log('ATS Analysis Response:', data);

      if (!data || !data.score) {
        alert('❌ Failed to analyze the resume.');
        setLoading(false);
        return;
      }

      setScore(data.score);
      setDetails(data.suggestions || 'No suggestions provided.');
      setAnalysis(data.analysis || null);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing resume. Please check if the backend server is running.');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📄 Upload Resume & Check ATS Score (via Jemenie)</h2>
      <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Checking...' : 'Check ATS Score'}
      </button>

      {score && (
        <div style={{ marginTop: 20, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
          <h3>✅ ATS Score: {score}/100</h3>
          
          {analysis && (
            <div style={{ marginBottom: 20 }}>
              <h4>📊 Analysis Summary</h4>
              <p><strong>Overall Rating:</strong> {analysis.overallRating}</p>
              
              <div style={{ display: 'flex', gap: 20 }}>
                <div>
                  <h5>✅ Keywords Found:</h5>
                  <ul>
                    {analysis.keywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5>⚠ Missing Keywords:</h5>
                  <ul>
                    {analysis.missingKeywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <h4>💡 Suggestions:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{details}</pre>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
