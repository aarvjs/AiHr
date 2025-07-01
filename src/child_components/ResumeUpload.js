import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.entry";
import Lottie from "lottie-react";
import aiAnimation from "../assets/ai.json";
import aiAvatar from "../assets/teacher.jpg";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const ResumeUpload = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");


  const resumeKeywords = [
  "education", "experience", "skills", "projects",
  "certifications", "objective", "languages",
  "summary", "contact", "achievements"
];
const isValidResume = (text) => {
  const lower = text.toLowerCase();
  let count = 0;

  resumeKeywords.forEach((word) => {
    if (lower.includes(word)) count++;
  });

  return count >= 3; 
};



  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ");
        }

        resolve(text);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setLoading(true);
  setStatus("Extracting and validating resume...");

  // Step 1: Extract text first
  const extractedText = await extractTextFromPDF(file);

  // Step 2: Validate
  if (!isValidResume(extractedText)) {
    alert("🚫 This file doesn't seem like a proper resume. Please upload a valid resume.");
    setLoading(false);
    setStatus("");
    return;
  }

  // Step 3: If valid, continue uploading
  setStatus("Uploading resume to server...");

  const { data: user } = await supabase.auth.getUser();
  const fileName = `resume-${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(fileName, file);

  if (uploadError) {
    alert(" Upload failed.");
    setLoading(false);
    return;
  }

  const fileUrl = supabase.storage
    .from("resumes")
    .getPublicUrl(fileName).data.publicUrl;

  // Step 4: Store in database
  const { data: resume, error: insertError } = await supabase
    .from("resumes")
    .insert([
      {
        user_id: user.user?.id,
        file_url: fileUrl,
        resume_text: extractedText,
      },
    ])
    .select()
    .single();

  if (insertError || !resume) {
    alert("Failed to store resume in database.");
    setLoading(false);
    return;
  }

  // Step 5: Done
  setStatus(" Resume uploaded successfully!");
  onUploadComplete(extractedText, resume.id);
  setLoading(false);
};


  const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning 🌅";
  if (hour < 18) return "Good Afternoon ☀️";
  return "Good Evening 🌙";
};

  return (
    // <div style={{
    //   padding: "20px",
    //   border: "1px solid #ccc",
    //   borderRadius: "10px",
    //   maxWidth: "400px",
    //   margin: "auto",
    //   textAlign: "center"
    // }}>
    //   <h2>Upload Your Resume</h2>
    //   <input
    //     type="file"
    //     accept=".pdf"
    //     onChange={handleUpload}
    //     style={{
    //       padding: "10px",
    //       marginTop: "10px",
    //       marginBottom: "10px",
    //       cursor: "pointer",
    //     }}
    //   />
    //   {loading && <p>Processing...</p>}
    //   {status && <p>{status}</p>}
    // </div>
     <div style={{
      background: "linear-gradient(to right, #1e3c72, #2a5298)",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      // alignItems: "center"
    }}>
      {/* Greeting */}
        <div style={{ marginBottom: "15px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "600", marginBottom: "10px" }}>{getGreeting()}, Candidate!</h1>
          <p style={{ fontSize: "18px", color: "#eee" }}>Welcome to your personalized AI HR Interview setup.</p>
        </div>

      {/* Top Card: Connect Info + Avatar */}
      <div style={{
        display: "flex",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        width: "90%",
        maxWidth: "1000px",
        padding: "30px",
        marginBottom: "30px",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
      }}>
        {/* Left Text */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "28px", color: "#2a5298", marginBottom: "10px" }}>🤖 Connect with AI HR</h2>
          <p style={{ fontSize: "16px", color: "#444" }}>
            Start your smart interview with our virtual HR assistant. Upload your resume and begin your interactive journey.
          </p>
        </div>

        {/* Right Image */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src={aiAvatar}
            alt="AI HR"
            style={{
              width: "100%",
              maxWidth: "250px",
              borderRadius: "20px"
            }}
          />
        </div>
      </div>

      {/* Bottom Section: Resume Upload + Lottie */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        width: "90%",
        maxWidth: "1000px",
        flexWrap: "wrap",
        gap: "30px"
      }}>
        {/* Left Upload Card */}
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          flex: "1 1 300px",
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: "24px", color: "#2a5298", marginBottom: "10px" }}>📄 Upload Your Resume</h2>
          <p style={{ fontSize: "14px", color: "#444", marginBottom: "20px" }}>
            Upload your resume to begin the interview.
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            style={{
              padding: "12px",
              border: "2px dashed #2a5298",
              borderRadius: "10px",
              width: "100%",
              background: "#f9f9f9",
              cursor: "pointer"
            }}
          />
          {loading && <p style={{ color: "#888", marginTop: "15px" }}>Processing...</p>}
          {status && <p style={{ color: "#2a5298", marginTop: "15px" }}>{status}</p>}
        </div>

        {/* Right AI Animation Card */}
        <div style={{
          flex: "1 1 300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.3)"
          }}>
            <Lottie animationData={aiAnimation} loop={true} style={{ width: "150px", height: "150px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
