import React, { useEffect, useRef, useState } from 'react';
import CurveGlow from '../components/CurveGlow';
import PdpFeatureCards from '../components/PdpFeatureCards';
import Footer from '../components/Footer';

export default function HeroSection() {
    const [animate, setAnimate] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const observerRef = useRef();

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setTextVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowCards(true);
                }
            },
            { threshold: 0.2 }
        );

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
        <div>
            <div style={{ background: '#0a0815', width: '100%', overflowX: 'hidden' }}>
                {/* === HERO SECTION === */}
                <section
                    style={{
                        height: '100vh',
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '4vh 1rem 0',
                        textAlign: 'center',
                        fontFamily: `'Inter', sans-serif`,
                        color: '#cfcfd4',
                        overflow: 'hidden',
                    }}
                >
                    {/* ✨ Stars Background (GLOBAL) */}
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                            pointerEvents: 'none',
                        }}
                    >
                        {Array.from({ length: 60 }).map((_, i) => {
                            const size = Math.random() * 2 + 1;
                            const left = Math.random() * 100;
                            const top = Math.random() * 100;
                            const opacity = Math.random() * 0.5 + 0.3;

                            return (
                                <div
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        top: `${top}%`,
                                        left: `${left}%`,
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        background: 'white',
                                        borderRadius: '50%',
                                        opacity,
                                        filter: 'blur(0.5px)',
                                        animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                                    }}
                                />
                            );
                        })}
                    </div>


                    {/* 🧠 Text */}
                    <div
                        style={{
                            maxWidth: 800,
                            opacity: textVisible ? 1 : 0,
                            transition: 'opacity 1.5s ease-in',
                            zIndex: 2,
                        }}
                    >
                        <p style={{ color: '#A0A0C0', textTransform: 'uppercase', marginTop: '20px', fontSize: '0.85rem', letterSpacing: '1px' }}>
                            Our Story
                        </p>
                        <h1 style={{ fontSize: '2.6rem', fontWeight: 600, color: '#fff', marginTop: '60px' }}>
                            Meet <span style={{ color: '#d3d3d3' }}>Persona</span> – your AI-powered PDP Mentor
                        </h1>
                        <p
                            style={{
                                marginTop: '20px',
                                color: '#999',
                                fontSize: '1rem',
                                lineHeight: '1.7',
                                maxWidth: '680px',
                                margin: 'auto',
                            }}
                        >
                            Persona is designed to guide you through regular mock sessions, improve your communication
                            skills, and track your speaking performance — instantly.
                        </p>
                    </div>

                    {/* 🌈 Curve at Bottom */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: '700px', // increased to allow text
                            zIndex: 1,
                        }}
                    >
                        <CurveGlow animate={animate} />
                    </div>
                    <style>{`
                    @keyframes twinkle {
                        0%, 100% { opacity: 0.3; transform: scale(1); }
                        50% { opacity: 0.8; transform: scale(1.2); }
                    }
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                </section>

                {/* === PDP FEATURES SECTION === */}
                <section
                    ref={observerRef}
                    style={{
                        minHeight: '100vh',
                        width: '100%',
                        background: '#0a0815',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4rem 1rem',
                    }}
                >
                    {showCards && <PdpFeatureCards />}
                </section>
            </div>
        </div>
       <Footer/>
       </>
    );
}
