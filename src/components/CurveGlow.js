import React from 'react';

export default function CurveGlow({ animate }) {
    return (
        <div style={{ position: 'relative', width: '100%', height: '650px' }}>
            {/* === CURVE SECTION === */}
            <div
                style={{
                    position: 'absolute',
                    bottom: animate ? '20px' : '-600px', // ⬆ Lifted a bit
                    width: '100%',
                    height: '600px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    transition: 'bottom 2s ease-in-out',
                }}
            >
                {/* Glowing Curve Rim */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-50px',
                        width: '920px',
                        height: '480px',
                        borderTopLeftRadius: '1000px',
                        borderTopRightRadius: '1000px',
                        background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.9), transparent)',
                        zIndex: 1,
                        opacity: 0.4,
                        filter: 'blur(4px)',
                    }}
                />

                {/* Main Curve */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        width: '900px',
                        height: '460px',
                        borderTopLeftRadius: '1000px',
                        borderTopRightRadius: '1000px',
                        background: 'radial-gradient(ellipse at center, #191152 0%, #08041f 60%, #000 100%)',
                        boxShadow: '0 -60px 140px rgba(120, 100, 255, 0.15)',
                        filter: 'blur(2px)',
                        zIndex: 2,
                    }}
                />
            </div>

            {/* === Text Below Curve === */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '0px',
                    width: '100%',
                    textAlign: 'center',
                    paddingBottom: '2rem',
                    fontFamily: `'Inter', sans-serif`,
                    zIndex: 3,
                }}
            >
                <p style={{ fontSize: '1rem', color: '#aaa', marginBottom: '1.5rem', letterSpacing: '1.2px' }}>
                    Empower. Perform. Transform.
                </p>
                <h2
                    style={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        marginBottom:'-1rem',
                        color: '#ffffff',
                        margin: 0,
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.05)',
                    }}
                >
                    Let your confidence speak before you do.
                </h2>
            </div>
        </div>
    );
}