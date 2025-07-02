// src/components/QuestionFlow.jsx
import React, { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import VideoDisplay from "../components/VideoDisplay";
import AnswerRecorder from "../api/AnswerRecorder";
import questionBank from "../api/backup_questions.json";
import { generateFeedback } from "../api/generateFeedback";
import { getTotalFillerWords } from "../api/getTotalFillerWords";

const genAI = new GoogleGenerativeAI("AIzaSyC5ohX7MWiWeDluJv1xBXTG3SPltgP_fek");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const QuestionFlow = ({ resumeText, resumeId }) => {
  const [questions, setQuestions] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();
  const [totalFiller, setTotalFiller] = useState(0);


  const [currentIndex, setCurrentIndex] = useState(0);
// const [showQuestion, setShowQuestion] = useState(false);
const [showFeedback, setShowFeedback] = useState(false);

useEffect(() => {
  if (showFeedback && resumeId) {
    getTotalFillerWords(resumeId).then((total) => {
      console.log("Total Filler Words:", total);
      setTotalFiller(total);
    });
  }
}, [showFeedback, resumeId]);


  useEffect(() => {
    if (interviewStarted) generateQuestions();
  }, [interviewStarted]);

  // feedback hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 

  const handleFeedback = async () => {
    setLoading(true);
    const result = await generateFeedback(resumeId);
    setFeedback(result);
    setLoading(false);
  };


  const nextQuestion = () => {
  const next = currentIndex + 1;
  if (next < questions.length) {
    setCurrentIndex(next);
  } else {
    speak("Thanks for completing the interview. Generating feedback now...");
    setShowQuestion(false);
    setShowFeedback(true);
  }
};

// extraket keyqword form resume =========================================================
//   const extractKeywords = (text) => {
//   const keys = Object.keys(questionBank);
//   const found = [];

//   keys.forEach((k) => {
//     if (text.toLowerCase().includes(k)) {
//       found.push(k);
//     }
//   });

//   return found;
// };
const extractKeywords = (text) => {
  const found = new Set();
  const lowerText = text.toLowerCase();

  Object.entries(questionBank).forEach(([topic, { synonyms = [] }]) => {
    const allWords = [topic, ...synonyms];

    for (const word of allWords) {
      // Allow matching for whole word or partial match with space around
      const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, "i");

      if (regex.test(lowerText)) {
        found.add(topic);
        break; // No need to check more synonyms once matched
      }
    }
  });

  return [...found];
};


  // const generateQuestions = async () => {
  //   const prompt = `You are an Indian female HR. Greet the candidate and ask exactly 5 short and simple HR interview questions based on this resume:\n\n${resumeText}`;
  //   const result = await model.generateContent(prompt);
  //   const response = await result.response;
  //   const text = await response.text();

  //   const allLines = text.split("\n").filter((line) => line.trim() !== "");
  //   const greetingLine = allLines.find((line) =>
  //     line.toLowerCase().includes("hello") ||
  //     line.toLowerCase().includes("pleasure") ||
  //     line.toLowerCase().includes("welcome")
  //   );

  //   const questionsOnly = allLines.filter((line) => line !== greetingLine).slice(0, 5);

  //   const fullScript = greetingLine ? [greetingLine, ...questionsOnly] : questionsOnly;

  //   setQuestions(fullScript);
  //   speakAllQuestions(fullScript);
  // };

// gnereate qetion hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 
const generateQuestions = async () => {
  try {
    const prompt = `You are an Indian female HR. Greet the candidate and ask exactly 5 short and simple HR interview questions based on this resume:\n\n${resumeText}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const allLines = text.split("\n").filter((line) => line.trim() !== "");

    const greetingLine = allLines.find((line) =>
      line.toLowerCase().includes("hello") ||
      line.toLowerCase().includes("pleasure") ||
      line.toLowerCase().includes("welcome")
    );

    const questionsOnly = allLines.filter((line) => line !== greetingLine).slice(0, 5);
    const fullScript = greetingLine ? [greetingLine, ...questionsOnly] : questionsOnly;

    setQuestions(fullScript);
    speakAllQuestions(fullScript);

  } catch (error) {
    console.warn("❌ Gemini failed. Switching to backup questions...");

    const keywords = extractKeywords(resumeText);
    let localQuestions = [];

    keywords.forEach((key) => {
      const matched = questionBank[key];
      if (matched && matched.questions) {
        // Pick 1–2 random questions per matched keyword
        const shuffled = [...matched.questions].sort(() => 0.5 - Math.random());
        localQuestions.push(...shuffled.slice(0, 2));
      }
    });

    // Default fallback if no keywords match
    if (localQuestions.length === 0) {
      localQuestions = [
        "Tell me about yourself.",
        "What are your strengths?",
        "What are your hobbies?",
        "Why should we hire you?",
        "What are your career goals?"
      ];
    }

    // Final shuffle to make it varied
    const finalShuffled = [...localQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = finalShuffled.slice(0, 5);

    const greeting = "Hello, it's a pleasure to meet you. Let's begin your interview!";
    const finalList = [greeting, ...selectedQuestions];

    setQuestions(finalList);
    speakAllQuestions(finalList);
  } 
};


// question end hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 
const speakAllQuestions = (list, index = 0) => {
  const synth = window.speechSynthesis;

  const speakNow = () => {
    if (index >= list.length) {
      speak("Thank you for completing the interview. Your answers are being reviewed.");
      setShowFeedback(true);
      return;
    }

    const voices = synth.getVoices();
    const femaleIndian =
      voices.find((v) => v.lang === "en-IN" && v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.lang === "en-IN");

    const utter = new SpeechSynthesisUtterance(list[index]);
    utter.voice = femaleIndian;
    utter.lang = "en-IN";

    utter.onend = () => {
      if (index === 0 && list[index].toLowerCase().includes("hello")) {
        speakAllQuestions(list, index + 1); // greet done, next
      } else {
        setCurrentIndex(index);
        setShowQuestion(true);
      }
    };

    synth.speak(utter);
  };

  // ✅ wait for voices if not loaded
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => speakNow();
  } else {
    speakNow();
  }
};




  const speak = (text) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const femaleIndian =
      voices.find((v) => v.lang === "en-IN" && v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.lang === "en-IN");

      
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = femaleIndian;
    utter.lang = "en-IN";
    synth.speak(utter);
  };

  const handleStart = () => {
    const confirmStart = window.confirm("Would you like to start the interview?");
    if (!confirmStart) return;
    setInterviewStarted(true);
    // speakAllQuestions(questions, 0);
  };

  return (
 <div>
  <h2 style={{ textAlign: "center" }}>Analyze Your Resume</h2>

  <VideoDisplay showVideo={true} playing={true} videoRef={videoRef} height={"280px"} />

  {!interviewStarted ? (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={handleStart}
        style={{ padding: "12px 24px", fontSize: "16px", marginTop: "20px" }}
      >
        🎬 Start Interview
      </button>
    </div>
  ) : showFeedback ? (
   <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", marginTop: "30px" }}>
  <button
    onClick={handleFeedback}
    style={{
      padding: "12px 28px",
      fontSize: "16px",
      backgroundColor: "#4a90e2",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "background 0.3s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#3a78c2")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
  >
    🧠 Get Feedback
  </button>

  {loading && (
    <p style={{ marginTop: "15px", fontStyle: "italic", color: "#555" }}>
      ⏳ Analyzing your answers...
    </p>
  )}

  {feedback && (
    <div
      style={{
        marginTop: "25px",
        padding: "25px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
      }}
    >
      <h3 style={{ color: "#333", marginBottom: "15px" }}>📋 AI HR Feedback</h3>
      
      <p style={{ fontSize: "15px", fontWeight: "500", color: "#888" }}>
        🧾 Total Filler Words Used: <strong>{totalFiller}</strong>
      </p>

      <pre style={{ whiteSpace: "pre-wrap", fontSize: "16px", lineHeight: "1.6", color: "#444", marginTop: "15px" }}>
        {feedback}
      </pre>
    </div>
  )}
</div>


  ) : showQuestion && questions[currentIndex] ? (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Question {currentIndex + 1}:</h3>
      <p style={{ fontSize: "18px", fontWeight: "500" }}>{questions[currentIndex]}</p>

      <AnswerRecorder
        question={questions[currentIndex]}
        resumeId={resumeId}
        questionIndex={currentIndex}
         onAnswerComplete={() => {
    setShowQuestion(false); // hide current AnswerRecorder
    speakAllQuestions(questions, currentIndex + 1); // 👈 next question bol do
  }}
      />
    </div>
  ) : (
    <p style={{ textAlign: "center" }}>🤖 Generating questions...</p>
  )}
</div>

  );
};

export default QuestionFlow;
