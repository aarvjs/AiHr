import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const UploadVideos = () => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles(files);
  };

  const handleUploadClick = async () => {
    if (videoFiles.length === 0) return alert('No video selected!');
    setUploading(true);
    for (const file of videoFiles) {
      await uploadVideo(file);
    }
    setUploading(false);
    alert('Video(s) uploaded successfully!');
    setVideoFiles([]);
  };

  const uploadVideo = async (file) => {
    const filePath = `${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      return;
    }

    const { publicUrl } = supabase.storage.from('videos').getPublicUrl(filePath).data;
    const { error: insertError } = await supabase
      .from('uploaded_videos')
      .insert([{ file_name: file.name, file_url: publicUrl }]);

    if (insertError) {
      console.error('DB Insert error:', insertError.message);
    } else {
      console.log('Uploaded:', file.name);
    }
  };

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: '20px',
      padding: '20px 20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      minWidth: '320px',
      position: 'relative',
      overflow: 'hidden',
      height:'220px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
        🎥 Upload Videos
      </h3>
      <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px', lineHeight: '18px' }}>
        Upload MP4, MOV, AVI formats<br />for lectures/tutorials.
      </p>

      <button
        onClick={handleUploadClick}
        disabled={uploading}
        style={{
          background: 'linear-gradient(to right, #ff6a00, #ee0979)',
          color: '#fff',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '13px',
          cursor: 'pointer',
        }}
      >
        {uploading ? 'Uploading...' : 'Upload Vedio'}
      </button>

      <div
        onClick={() => document.getElementById('videoInput').click()}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: '#ff6a00',
          color: '#fff',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          textAlign: 'center',
          lineHeight: '28px',
          fontWeight: 'bold',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        +
      </div>

      <input
        type="file"
        id="videoInput"
        accept="video/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleVideoChange}
      />

      {videoFiles.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#444' }}>🎦 Selected:</p>
          <ul style={{ paddingLeft: '18px', color: '#666', fontSize: '13px' }}>
            {videoFiles.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadVideos;