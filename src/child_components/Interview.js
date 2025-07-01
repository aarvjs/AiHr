// src/components/Interview.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const fillerList = ["umm", "ok", "hmm", "am", "ya", "like"];

const Interview = ({ greeting, questions }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [speakPrompt, setSpeakPrompt] = useState(false);

  useEffect(() => {
    if (currentQ < questions.length) {
      setTranscript("");
      setCountdown(10);
      setListening(false);
      setSpeakPrompt(true);
    }
  }, [currentQ]);

  useEffect(() => {
    if (speakPrompt && questions[currentQ]) {
      const synth = window.speechSynthesis;
      synth.cancel(); // Cancel any ongoing speech
      const utter = new SpeechSynthesisUtterance(questions[currentQ].question_text);
      utter.onend = () => {
        setSpeakPrompt(false);
        setListening(true);
        startListening();
      };
      synth.speak(utter);
    }
  }, [speakPrompt]);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript.toLowerCase();
      setTranscript(speechText);
      setListening(false);
      saveAnswer(speechText);
      setTimeout(() => setCurrentQ((q) => q + 1), 1000);
    };

    recognition.onerror = (err) => {
      console.error("Speech error:", err);
      const errorResponse = "Could not recognize.";
      setTranscript(errorResponse);
      setListening(false);
      saveAnswer(errorResponse);
      setTimeout(() => setCurrentQ((q) => q + 1), 1000);
    };

    recognition.start();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          recognition.stop();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const saveAnswer = async (text) => {
    const fillerCounts = {};
    const words = text.split(" ");

    for (let filler of fillerList) {
      const count = words.filter((w) => w === filler).length;
      if (count > 0) fillerCounts[filler] = count;
    }

    const { data: user } = await supabase.auth.getUser();
    const questionId = questions[currentQ]?.id;

    if (questionId && user?.user?.id) {
      await supabase.from("answers").insert([
        {
          question_id: questionId,
          user_id: user.user.id,
          user_response: text,
          filler_words: JSON.stringify(fillerCounts),
        },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{greeting}</h2>

      {currentQ < questions.length ? (
        <>
          <h3>Question {currentQ + 1} of {questions.length}</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {questions[currentQ].question_text}
          </p>
          <p style={{ fontSize: "24px", color: "red" }}>⏳ {countdown}s</p>
          <p><strong>Your Answer:</strong> {transcript}</p>
          {listening && <p style={{ color: "green" }}>🎙️ Listening...</p>}
        </>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <h2>✅ Interview Completed!</h2>
          <p>Thank you for your responses.</p>
        </div>
      )}
    </div>
  );
};

export default Interview;
