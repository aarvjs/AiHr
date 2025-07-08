import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import html2pdf from 'html2pdf.js';
import { supabase } from '../supabaseClient';
import ResumeFormatGallery from '../child_components/ResumeFormatGallery';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGithub, FaCode, FaLightbulb,
  FaProjectDiagram, FaGraduationCap, FaBriefcase
} from 'react-icons/fa';

const genAI = new GoogleGenerativeAI("AIzaSyC5ohX7MWiWeDluJv1xBXTG3SPltgP_fek");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const ResumeGenerator = () => {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', state: '',
    Github: '', Technicalskills: '', SoftSkill: '',
    Projects: '', education: '', experience: ''
  });

  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumeFormats, setResumeFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [openFormatUrl, setOpenFormatUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchResumeFormats = async () => {
      const { data, error } = await supabase
        .from('resume_format')
        .select('file_url, id')
        .order('uploaded_at', { ascending: false });

      if (!error && data) {
        setResumeFormats(data);
      }
    };
    fetchResumeFormats();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const generateResume = async () => {
  setLoading(true);
  setResumeText('');

  const prompt = `
You're an expert resume builder. Generate a clean, ATS-friendly resume without using asterisks. Use clear headings and simple formatting.

Full Name: ${form.name}
Email: ${form.email}
Phone: ${form.mobile}
State: ${form.state}
GitHub: ${form.Github}
Technical Skills: ${form.Technicalskills}
Soft Skills: ${form.SoftSkill}
Projects: ${form.Projects}
Education: ${form.education}
Experience: ${form.experience}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    setResumeText(text);
    setModalOpen(true);
  } catch (error) {
    console.warn("⚠️ Gemini API failed, using fallback resume.");
    const fallback = fallbackResumeBuilder(form);
   setResumeText(<div dangerouslySetInnerHTML={{ __html: fallback }} />);
    setModalOpen(true);
  } finally {
    setLoading(false);
  }
};

const fallbackResumeBuilder = (form) => {
  const generateProjectSummary = () => {
    const projectText = form.Projects.toLowerCase();
    let summary = "";

    if (projectText.includes("dating")) {
      summary = "Built a user-friendly dating app focused on smooth user experience and real-time chat functionality.";
    } else if (projectText.includes("chatbot")) {
      summary = "Developed an intelligent chatbot capable of understanding and responding to user queries effectively.";
    } else if (projectText.includes("resume")) {
      summary = "Created an AI-powered resume builder that generates ATS-friendly professional resumes.";
    } else if (projectText.includes("weather")) {
      summary = "Built a weather app using API integration to fetch live weather updates for any city.";
    } else if (projectText.trim() !== "") {
      summary = "Worked on practical real-world projects demonstrating strong development and problem-solving skills.";
    }

    return summary
      ? `<p style="margin: 4px 0; font-size: 13px; font-style: italic; color: #666;">👉 ${summary}</p>`
      : "";
  };

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px 25px; max-width: 750px; margin: auto; background: #fff; color: #222; border: 1px solid #ddd;">
      <h1 style="text-align: center; font-size: 26px; margin-bottom: 5px;">${form.name}</h1>
      <p style="text-align: center; font-size: 14px; margin: 2px 0;">
        📧 ${form.email} | 📱 ${form.mobile} | 📍 ${form.state}
      </p>
      <p style="text-align: center; font-size: 14px; margin: 2px 0;">
        💻 <a href="${form.Github}" target="_blank" style="color: #0366d6;">${form.Github}</a>
      </p>

      <hr style="margin: 16px 0;"/>

      <h2 style="font-size: 16px; margin-bottom: 4px;">Technical Skills</h2>
      <p style="margin: 2px 0 10px;">${form.Technicalskills}</p>

      <h2 style="font-size: 16px; margin-bottom: 4px;">Soft Skills</h2>
      <p style="margin: 2px 0 10px;">${form.SoftSkill}</p>

      <h2 style="font-size: 16px; margin-bottom: 4px;">Projects</h2>
      <p style="margin: 2px 0 6px;">${form.Projects}</p>
      ${generateProjectSummary()}

      <h2 style="font-size: 16px; margin: 12px 0 4px;">Education</h2>
      <p style="margin: 2px 0 10px;">${form.education}</p>

      <h2 style="font-size: 16px; margin-bottom: 4px;">Experience</h2>
      <p style="margin: 2px 0;">${form.experience}</p>

      <hr style="margin-top: 20px;" />
      <p style="text-align: center; font-size: 12px; color: #999;">Resume generated in fallback mode (Gemini API failed)</p>
    </div>
  `;
};



  const downloadPDF = () => {
    const element = document.getElementById('generated-resume');
    html2pdf().from(element).save(`${form.name || 'resume'}.pdf`);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#0f172a' }}>📄 Resume Generator</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '30px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>👤 Fill Details</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input icon={<FaUser />} name="name" label="Full Name" value={form.name} onChange={handleChange} />
              <Input icon={<FaEnvelope />} name="email" label="Email" value={form.email} onChange={handleChange} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input icon={<FaPhone />} name="mobile" label="Mobile" value={form.mobile} onChange={handleChange} />
              <Input icon={<FaMapMarkerAlt />} name="state" label="State" value={form.state} onChange={handleChange} />
            </div>
            <Input icon={<FaGithub />} name="Github" label="GitHub" value={form.Github} onChange={handleChange} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input icon={<FaCode />} name="Technicalskills" label="Technical Skills" value={form.Technicalskills} onChange={handleChange} />
              <Input icon={<FaLightbulb />} name="SoftSkill" label="Soft Skills" value={form.SoftSkill} onChange={handleChange} />
            </div>
            <Textarea icon={<FaProjectDiagram />} name="Projects" label="Projects" value={form.Projects} onChange={handleChange} />
            <Textarea icon={<FaGraduationCap />} name="education" label="Education" value={form.education} onChange={handleChange} />
            <Textarea icon={<FaBriefcase />} name="experience" label="Experience" value={form.experience} onChange={handleChange} />
          </div>

          <button
            onClick={generateResume}
            disabled={loading}
            style={{ marginTop: '20px', padding: '12px 24px', background: 'linear-gradient(90deg, #f97316, #fb923c)', color: '#fff', fontWeight: 600, fontSize: '15px', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%' }}
          >
            {loading ? 'Generating...' : '✨ Generate Resume'}
          </button>
        </div>

        <ResumeFormatGallery
          resumeFormats={resumeFormats}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          openFormatUrl={openFormatUrl}
          setOpenFormatUrl={setOpenFormatUrl}
        />

      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '60%', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer' }}>✖</button>
            <h3 style={{ marginBottom: '16px', fontWeight: '600' }}>📝 Your Generated Resume</h3>
           <div
  id="generated-resume"
  style={{
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    padding: '25px',
    maxWidth: '750px',
    margin: 'auto',
    background: '#fff',
    color: '#222',
    lineHeight: '1.6',
    border: '1px solid #ddd',
    borderRadius: '8px',
    whiteSpace: 'pre-line', // 👈 better formatting
  }}
>
  {resumeText}
</div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <button onClick={() => setModalOpen(true)} style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>👁 Preview</button>
              <button onClick={() => setTimeout(downloadPDF, 200)} style={{ padding: '10px 20px', background: '#22c55e', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>⬇ Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ icon, label, ...rest }) => (
  <div>
    <label style={{ fontWeight: 600 }}>{label}</label>
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f9fafb', padding: '8px' }}>
      <div style={{ marginRight: '10px', color: '#94a3b8' }}>{icon}</div>
      <input {...rest} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px' }} />
    </div>
  </div>
);

const Textarea = ({ icon, label, ...rest }) => (
  <div>
    <label style={{ fontWeight: 600 }}>{label}</label>
    <div style={{ display: 'flex', alignItems: 'flex-start', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f9fafb', padding: '8px' }}>
      <div style={{ marginRight: '10px', color: '#94a3b8', paddingTop: '6px' }}>{icon}</div>
      <textarea {...rest} rows={3} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px' }} />
    </div>
  </div>
);

export default ResumeGenerator;
