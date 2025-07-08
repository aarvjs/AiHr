import React, { useState } from 'react';
import AIBanner from '../child_components/Attandencecard';
import UploadDocumentsCard from '../child_components/UploadDocuments';
import UploadVideosCard from '../child_components/UploadVideos';
import TeacherAssignments from '../child_components/AssignedClasses';
import { supabase } from '../supabaseClient'; // Make sure this exists and is configured

const Dashboard = () => {
  const [docFiles, setDocFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const handleDocChange = (e) => {
    const files = Array.from(e.target.files);
    setDocFiles((prev) => [...prev, ...files]);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles((prev) => [...prev, ...files]);
  };

  const handleResumeUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileName = `resume-${Date.now()}-${file.name}`;

  // 1. Upload to bucket
  const { data: storageData, error: storageError } = await supabase.storage
    .from('resume-format')
    .upload(fileName, file);

  if (storageError) {
    alert('❌ Upload failed');
    console.error(storageError);
    return;
  }

  // 2. Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('resume-format')
    .getPublicUrl(fileName);

  const fileUrl = publicUrlData.publicUrl;

  // 3. Insert file info into DB table
  const { error: dbError } = await supabase
    .from('resume_format')
    .insert([
      {
        file_name: fileName,
        file_url: fileUrl
      }
    ]);

  if (dbError) {
    alert('⚠ Upload successful, but DB insert failed');
    console.error(dbError);
  } else {
    alert('✅ Resume format uploaded and recorded!');
  }
};


  return (
    <div style={{ padding: '30px', backgroundColor: '#f6f8fc', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ marginBottom: '25px', color: '#1e1e1e' }}>Dashboard</h1>

      {/* 🎓 AI Topic Card */}
      <AIBanner />

      {/* 🧾 Upload + Teacher Assignments */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <UploadDocumentsCard docFiles={docFiles} handleDocChange={handleDocChange} />
          <UploadVideosCard videoFiles={videoFiles} handleVideoChange={handleVideoChange} />
        </div>
        <TeacherAssignments />
      </div>

      {/* 🔼 Upload Resume Format Section */}
      <div style={{ marginTop: '40px', padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '500px' }}>
        <label style={{ fontWeight: 600, marginBottom: '10px', display: 'block', fontSize: '16px' }}>
          Upload Resume Format
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            background: '#f9fafb',
            cursor: 'pointer',
            width: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
