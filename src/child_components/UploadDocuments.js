import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const UploadDocuments = () => {
  const [docFiles, setDocFiles] = useState([]);

  const handleDocChange = (e) => {
    const files = Array.from(e.target.files);
    setDocFiles(files);
  };

  const uploadToSupabase = async () => {
    for (const file of docFiles) {
      const filePath = `${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (error) {
        console.error('Upload failed:', error.message);
        continue;
      }

      const { error: insertError } = await supabase
        .from('uploaded_documents')
        .insert([
          {
            file_path: filePath,
            file_name: file.name,
          }
        ]);

      if (insertError) {
        console.error('DB insert failed:', insertError.message);
      }
    }

    alert('📁 All files uploaded successfully!');
    setDocFiles([]);
  };

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: '18px',
      padding: '20px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      minWidth: '320px',
      position: 'relative',
      overflow: 'hidden',
      height: '220px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
        📂 Upload Docs / Folders
      </h3>
      <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px', lineHeight: '18px' }}>
        Drag & drop PDFs, Word docs, zip folders,<br />or select from file browser.
      </p>

      <button
        onClick={uploadToSupabase}
        disabled={docFiles.length === 0}
        style={{
          background: 'linear-gradient(to right, #7e30e1, #4a00e0)',
          color: '#fff',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '13px',
          cursor: 'pointer',
        }}
      >
        Upload
      </button>

      <div
        onClick={() => document.getElementById('docInput').click()}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: '#7e30e1',
          color: '#fff',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          textAlign: 'center',
          lineHeight: '28px',
          fontWeight: 'bold',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        +
      </div>

      <input
        type="file"
        id="docInput"
        accept=".pdf,.doc,.docx,.zip"
        multiple
        style={{ display: 'none' }}
        onChange={handleDocChange}
      />

      {docFiles.length > 0 && (
        <div style={{ marginTop: '12px', maxHeight: '48px', overflowY: 'auto' }}>
          <ul style={{ fontSize: '13px', color: '#444', paddingLeft: '16px', marginBottom: 0 }}>
            {docFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
