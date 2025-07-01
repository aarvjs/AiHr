import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ResumeImage from '../assets/resume.png';


pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const genAI = new GoogleGenerativeAI("AIzaSyC5ohX7MWiWeDluJv1xBXTG3SPltgP_fek"); // Replace this
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7, // Adds variety
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 800,
  },
});
const StudentCourses = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');
    setLoading(true);
    setScore(null);
    setSuggestions('');
    setMessage('');

    const fileExt = file.name.split('.').pop();
    const filePath = `resumes/${Date.now()}.${fileExt}`;

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
        await analyzeWithGemini(text);
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        await analyzeWithGemini(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const analyzeWithGemini = async (resumeText) => {
    try {
      const prompt = `You are an ATS system. Analyze this resume and respond with:

- ATS Score (0–100)
- Suggestions for improvement (keep it short, maximum 70–80 words, covering only the most important improvements)
- Final Overall Rating
Resume received at: ${new Date().toISOString()}

Resume:
${resumeText}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const output = await response.text();

      const scoreMatch = output.match(/ATS Score:\s*(\d{1,3})/i);
      const atsScore = scoreMatch ? parseInt(scoreMatch[1]) : null;

      const { error: insertError } = await supabase
        .from('ats_resumes')
        .insert([
          {
            original_text: resumeText,
            ats_score: atsScore,
            suggestions: output,
          },
        ]);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        setMessage("❌ Failed to save to database.");
      } else {
        setScore(atsScore);
        setSuggestions(output);
        setMessage("✅ Resume analyzed & saved to DB.");
      }

    } catch (err) {
      console.error("Gemini error:", err);
      setMessage("❌ AI analysis failed.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
    }}>
      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        maxWidth: '1200px',
        width: '100%',
      }}>

        {/* Left side: Upload form */}
        <div style={{
  flex: 1,
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '24px',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  padding: '40px 32px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  maxWidth: '700px',
  color: '#f8fafc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '24px',
  animation: 'fadeIn 0.6s ease-in-out',
}}>

  {/* Top Header */}
  <div>
    <h2 style={{
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '6px',
      color: '#e2e8f0',
    }}>
      Upload Your Resume
    </h2>
    <p style={{
      color: '#94a3b8',
      fontSize: '15px'
    }}>
      Get an instant AI-powered ATS score and improvement suggestions.
    </p>
  </div>

  {/* File Upload */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <label style={{
      fontSize: '15px',
      fontWeight: 500,
      color: '#cbd5e1'
    }}>
      📄 Select your resume file
    </label>
    <input
      type="file"
      accept=".pdf,.doc,.docx,.txt"
      onChange={(e) => setFile(e.target.files[0])}
      style={{
        padding: '12px 14px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid #334155',
        color: '#e2e8f0',
        fontSize: '15px',
        outline: 'none',
        cursor: 'pointer',
        transition: 'border 0.3s ease'
      }}
    />
  </div>

  {/* Analyze Button */}
  <button
    onClick={handleUpload}
    disabled={loading}
    style={{
      width: '100%',
      padding: '14px',
      borderRadius: '12px',
      background: loading ? '#475569' : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease',
    }}
  >
    {loading ? '🔍 Scanning your resume...' : '🚀 Analyze with Gemini AI'}
  </button>

  {/* Feedback Message */}
  {message && (
    <div style={{
      marginTop: '8px',
      color: '#94a3b8',
      fontSize: '14px',
      fontStyle: 'italic',
    }}>
      {message}
    </div>
  )}

  {/* Results */}
  {score !== null && (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid #334155',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: score >= 80 ? '#4ade80' : score >= 60 ? '#facc15' : '#f87171',
      }}>
        ✅ ATS Score: {score}/100
      </h3>

      <div>
        <h4 style={{
          fontSize: '17px',
          fontWeight: '500',
          color: '#e2e8f0',
          marginBottom: '6px'
        }}>
          💡 Suggestions to Improve:
        </h4>
        <p style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#cbd5e1',
          backgroundColor: 'rgba(255,255,255,0.04)',
          padding: '16px',
          borderRadius: '10px',
          borderLeft: '4px solid #3b82f6',
          whiteSpace: 'pre-wrap'
        }}>
          {suggestions}
        </p>
      </div>
    </div>
  )}
</div>



        {/* Right side: Image placeholder */}
        <div style={{
          height: '500px',
          width: '350px',
          position: 'relative',
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(255,255,255,0.05)',
        }}>

          {/* Scanner Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #00ff88, #00ffaa, #00ff88)',
            animation: 'scanLine 3s linear infinite',
            zIndex: 3,
          }} />

          {/* Blurred Background Image */}
          <img
            src={ResumeImage}
            alt="Resume Placeholder"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(2px) brightness(0.8)',
              opacity: 0.8,
              zIndex: 1,
            }}
          />




          {/* Keyframes inside style tag */}
          <style>
            {`
      @keyframes scanLine {
        0% { top: 0; }
        100% { top: 100%; }
      }
        @keyframes scanLine {
  0% { top: 0; }
  100% { top: 100%; }
}
    `}
          </style>
        </div>
      </div>
    </div>
  );
}

export default StudentCourses;
