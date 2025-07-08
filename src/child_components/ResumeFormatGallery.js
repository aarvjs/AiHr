// src/components/ResumeFormatGallery.js
import React from 'react';

const ResumeFormatGallery = ({ resumeFormats, selectedFormat, setSelectedFormat, openFormatUrl, setOpenFormatUrl }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.05)', minHeight: '600px' }}>
      <h4 style={{ marginBottom: '12px', color: '#0f172a' }}>📁 Resume Formats Uploaded by Teacher</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {resumeFormats.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>⏳ Loading formats...</p>
        ) : (
          resumeFormats.map((item, index) => (
            <div
              key={item.id}
              style={{
                cursor: 'pointer',
                width: '150px',
                height: '200px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
                background: selectedFormat === item.file_url ? '#e0f2fe' : '#f9fafb'
              }}
              onClick={() => setOpenFormatUrl(item.file_url)}
            >
              <iframe
                src={`https://docs.google.com/gview?url=${item.file_url}&embedded=true`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={`Resume Format ${index + 1}`}
              />
            </div>
          ))
        )}
      </div>

      {openFormatUrl && (
        <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <iframe
            src={`https://docs.google.com/gview?url=${openFormatUrl}&embedded=true`}
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="Selected Resume Format"
          />
        </div>
      )}
    </div>
  );
};

export default ResumeFormatGallery;
