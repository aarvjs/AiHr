import React from 'react';
import Lottie from "lottie-react";
import myLottieAnimation from "../assets/boy.json";

const pdpFeatures = [
    { title: '🗣 Daily Mock Sessions', desc: 'Practice interviews and GDs daily with Persona.' },
    { title: '📚 New English Words', desc: 'Learn fresh vocabulary daily and use it contextually.' },
    { title: '📄 Resume ATS Score', desc: 'Upload your resume and get instant ATS compatibility results.' },
    { title: '🎧 Speaking Score', desc: 'Real-time feedback on clarity, fluency, and pronunciation.' },
    { title: '🧠 Instant Feedback', desc: 'AI-generated personalized suggestions to improve every session.' },
    { title: '🪄 Smart Suggestions', desc: 'Get intelligent tips based on your performance and goals.' },
];

export default function PdpFeatureCards() {
    return (
        <div
            style={{
                position: 'relative',
                marginTop: '20px',
                marginBottom: '40px',
                zIndex: 4,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h2 style={{
                color: '#ffffff',
                fontSize: '2.8rem',
                fontWeight: 700,
                marginBottom: '3rem',
                textAlign: 'center',
                background: 'linear-gradient(90deg, #9b5de5, #f15bb5)',
                justifyContent:'flex-start',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
            }}>
                PDP Features That Empower You
            </h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4rem',
                    padding: '1rem 2rem',
                    maxWidth: '95vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Left Side Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {pdpFeatures.slice(0, 3).map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    padding: '1.2rem',
                                    borderRadius: '16px',
                                    minWidth: '260px',
                                    maxWidth: '260px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(4px)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s ease',
                                    zIndex: 4,
                                }}
                            >
                                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.6rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: '#bbb', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        {pdpFeatures.slice(3).map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    padding: '1.2rem',
                                    borderRadius: '16px',
                                    minWidth: '260px',
                                    maxWidth: '260px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(4px)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s ease',
                                    zIndex: 4,
                                }}
                            >
                                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.6rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: '#bbb', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side Lottie Animation */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            width: '500px',
                            height: '500px',
                        }}
                    >
                        <Lottie
                            animationData={myLottieAnimation}
                            loop
                            autoplay
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
