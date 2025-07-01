import React, { useState } from "react";
import ResumeUpload from "../child_components/ResumeUpload";
import Persona from "../api/generateQuestions";

function PersonaMain() {
  const [resumeText, setResumeText] = useState("");
  const [resumeId, setResumeId] = useState(null);

  return (
    <div>
      {!resumeText ? (
        <ResumeUpload
          onUploadComplete={(text, id) => {
            setResumeText(text);
            setResumeId(id);
          }}
        />
      ) : (
        <Persona resumeText={resumeText} resumeId={resumeId} />
      )}
    </div>
  );
}

export default PersonaMain;
