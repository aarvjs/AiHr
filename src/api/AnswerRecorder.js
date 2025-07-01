import React, { useEffect, useState } from "react";
import { createAnswer } from "../api/storeAnswer";

const fillerWords = ["um", "uh", "hmm", "like", "you know", "so", "actually", "basically", "am", "ok"];

const AnswerRecorder = ({ question, questionIndex, resumeId, onAnswerComplete }) => {
  const [transcript, setTranscript] = useState("");
  const [timer, setTimer] = useState(10);
  const [recognition, setRecognition] = useState(null);

 useEffect(() => {
  let interval;
  let timeLeft = 10;
  let answerSubmitted = false;

  const newRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  newRecognition.lang = "en-IN";
  newRecognition.interimResults = false;
  newRecognition.maxAlternatives = 1;

  newRecognition.onresult = async (event) => {
    const speechText = event.results[0][0].transcript;
    setTranscript(speechText);

    const fillerCount = countFillerWords(speechText);

    await createAnswer({
      resume_id: resumeId,
      question_index: questionIndex,
      question_text: question,
      answer_text: speechText,
      filler_word_count: fillerCount,
    });

    answerSubmitted = true;
  };

  newRecognition.onerror = async () => {
    if (!answerSubmitted) {
      await createAnswer({
        resume_id: resumeId,
        question_index: questionIndex,
        question_text: question,
        answer_text: "Could not recognize speech.",
        filler_word_count: 0,
      });
    }

    answerSubmitted = true;
  };

  setTranscript("");
  setRecognition(newRecognition);
  newRecognition.start();

  setTimer(timeLeft);
  interval = setInterval(() => {
    timeLeft -= 1;
    setTimer(timeLeft);
    if (timeLeft === 0) {
      clearInterval(interval);
      newRecognition.stop();

      // ✅ Move to next question AFTER 10 sec complete
      if (onAnswerComplete) onAnswerComplete();
    }
  }, 1000);

  return () => {
    clearInterval(interval);
    newRecognition.stop();
  };
}, [question]);


  const countFillerWords = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    return words.filter((word) => fillerWords.includes(word)).length;
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <p style={{ fontSize: "14px", color: "#888" }}>
        🎙️ Listening... Time Left: <strong>{timer}s</strong>
      </p>
      <p style={{ fontSize: "14px", marginTop: "10px" }}>
        <strong>Your Answer:</strong> {transcript || "Waiting for your response..."}
      </p>
    </div>
  );
};

export default AnswerRecorder;
