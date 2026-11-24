import React, { useState, useEffect } from 'react';
import Lanyard from './Lanyard';

const ModernHero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  const titles = ["Zero", "Zero", "To", "Heroes"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section style={styles.heroContainer}>
      {/* Ultra 3D Animated Background */}
      <div style={styles.background}>
        <div style={{
          ...styles.gradientOrb1,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1)`
        }}></div>
        <div style={{
          ...styles.gradientOrb2,
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px) scale(1)`
        }}></div>
        <div style={{
          ...styles.gradientOrb3,
          transform: `translate(${mousePosition.y}px, ${mousePosition.x}px) scale(1)`
        }}></div>
        <div style={{
          ...styles.gradientOrb4,
          transform: `translate(${-mousePosition.y}px, ${-mousePosition.x}px) scale(1)`
        }}></div>
        
        {/* Digital Grid */}
        <div style={styles.gridLines}></div>
        <div style={styles.gridLinesVertical}></div>
        
        {/* Scan Effect */}
        <div style={styles.scanLine}></div>
      </div>

      {/* Enhanced Particles */}
      <div style={styles.particlesContainer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)`,
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(139, 92, 246, 0.6)`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        ...styles.contentWrapper,
        transform: `translateY(${scrollY * 0.3}px)`,
        opacity: Math.max(0, 1 - scrollY / 500)
      }}>
        <div style={styles.textSection}>
          {/* Hello Badge */}
          <div style={styles.helloBadge}>
            <span style={styles.waveEmoji}>👋</span>
            <span>Hello, I'm</span>
          </div>
          
          {/* Main Name - Ultra 3D */}
          <h1 style={styles.nameTitle}>
            <span style={styles.nameHighlight}>Ramdhani</span>
            <br />
            <span style={styles.nameHighlight}>Dwi Saputra</span>
          </h1>

          {/* Animated Title with Code Brackets */}
          <div style={styles.titleContainer}>
            <span style={styles.codeBracket}>&lt;</span>
            <span style={styles.animatedTitle} key={titleIndex}>
              {titles[titleIndex]}
            </span>
            <span style={styles.codeBracket}>/&gt;</span>
          </div>

          {/* Short Tagline */}
          <p style={styles.tagline}>
            If you can imagine it, you can make it happen
          </p>

          {/* Scroll Indicator */}
          <div style={styles.scrollIndicator} onClick={scrollToNext}>
            <div style={styles.mouse}>
              <div style={styles.mouseWheel}></div>
            </div>
            <span style={styles.scrollText}>Scroll to explore</span>
          </div>
        </div>

        {/* 3D Lanyard */}<div style={styles.imageSection}><Lanyard /></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.5; 
          }
          50% { 
            transform: translateY(-30px) translateX(20px) scale(1.4); 
            opacity: 1; 
          }
        }

        @keyframes orbMove1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(60px, 50px) scale(1.2) rotate(120deg); }
          66% { transform: translate(-40px, 70px) scale(0.9) rotate(240deg); }
        }

        @keyframes orbMove2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-70px, 60px) scale(1.15) rotate(-120deg); }
          66% { transform: translate(50px, -60px) scale(1.1) rotate(-240deg); }
        }

        @keyframes orbMove3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(40px, -70px) scale(1.3) rotate(180deg); }
        }

        @keyframes orbMove4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -40px) scale(1.25); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 60px rgba(139, 92, 246, 0.6), 0 0 120px rgba(59, 130, 246, 0.4); }
        }

        @keyframes float3D {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(5deg) rotateY(-5deg); 
          }
          50% { 
            transform: translateY(-25px) translateZ(30px) rotateX(-5deg) rotateY(5deg); 
          }
        }

        @keyframes floatElement {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-15px, -25px) rotate(-8deg) scale(1.1); }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(14deg); }
          20%, 40%, 60%, 80% { transform: rotate(-8deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes holographic {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }

        @keyframes scanMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }

        @keyframes gridScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }

        @keyframes mouseScroll {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 968px) {
          section > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding: 6rem 1.5rem 3rem !important;
            text-align: center;
          }
          
          h1 {
            font-size: 3rem !important;
          }

          section > div:nth-child(3) > div:nth-child(2) {
            order: -1;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          section {
            padding: 1rem !important;
          }

          h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
          
          section > div:nth-child(3) {
            gap: 2rem !important;
            padding: 5rem 1rem 2rem !important;
          }

          section > div:nth-child(3) > div:first-child > div:first-child {
            font-size: 0.95rem !important;
            padding: 0.6rem 1.2rem !important;
          }

          section > div:nth-child(3) > div:first-child > div:nth-child(3) {
            font-size: 1.5rem !important;
          }

          section > div:nth-child(3) > div:first-child > div:nth-child(3) span:first-child,
          section > div:nth-child(3) > div:first-child > div:nth-child(3) span:last-child {
            font-size: 1.8rem !important;
          }

          section > div:nth-child(3) > div:first-child > p {
            font-size: 1.1rem !important;
            margin-bottom: 2.5rem !important;
          }

          section > div:nth-child(3) > div:nth-child(2) > div {
            transform: scale(0.75) !important;
          }

          section > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(4) {
            width: 280px !important;
            height: 280px !important;
          }

          section > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(5),
          section > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(6),
          section > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(7) {
            display: none !important;
          }

          section > div:nth-child(3) > div:first-child > div:last-child {
            margin-top: 2rem !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem !important;
          }

          section > div:nth-child(3) > div:first-child > div:nth-child(3) {
            font-size: 1.2rem !important;
            flex-wrap: wrap;
            justify-content: center;
          }

          section > div:nth-child(3) > div:first-child > p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  heroContainer: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 30%, #0f1729 70%, #0a0a1f 100%)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    perspective: '2000px'
  },
  background: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  },
  gradientOrb1: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '700px',
    height: '700px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(90px)',
    animation: 'orbMove1 28s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(100px)',
    animation: 'orbMove2 32s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gradientOrb3: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.05) 40%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: 'orbMove3 24s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gradientOrb4: {
    position: 'absolute',
    top: '20%',
    right: '20%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    animation: 'orbMove4 26s ease-in-out infinite'
  },
  gridLines: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(139, 92, 246, 0.04) 49px, rgba(139, 92, 246, 0.04) 50px)',
    animation: 'gridScroll 25s linear infinite',
    opacity: 0.5
  },
  gridLinesVertical: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(139, 92, 246, 0.04) 49px, rgba(139, 92, 246, 0.04) 50px)',
    opacity: 0.5
  },
  scanLine: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)',
    animation: 'scanMove 5s linear infinite',
    pointerEvents: 'none',
    opacity: 0.4
  },
  particlesContainer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none'
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1400px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '6rem',
    alignItems: 'center',
    animation: 'fadeInUp 1s ease-out',
    transition: 'transform 0.1s ease-out, opacity 0.3s ease-out'
  },
  textSection: {
    color: 'white',
    position: 'relative'
  },
  helloBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '50px',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#a78bfa',
    marginBottom: '2rem',
    animation: 'fadeInUp 1s ease-out 0.2s both',
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
  },
  waveEmoji: {
    display: 'inline-block',
    animation: 'wave 2s ease-in-out infinite',
    fontSize: '1.5rem'
  },
  nameTitle: {
    fontSize: '5rem',
    fontWeight: '900',
    lineHeight: '1.1',
    marginBottom: '2rem',
    animation: 'fadeInUp 1s ease-out 0.4s both',
    letterSpacing: '-0.03em'
  },
  nameHighlight: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    textShadow: '0 0 60px rgba(139, 92, 246, 0.5)',
    animation: 'pulse 4s ease-in-out infinite'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '2.25rem',
    marginBottom: '2.5rem',
    animation: 'fadeInUp 1s ease-out 0.6s both',
    minHeight: '3rem'
  },
  codeBracket: {
    color: '#8b5cf6',
    fontWeight: '700',
    fontFamily: 'monospace',
    fontSize: '2.5rem'
  },
  animatedTitle: {
    color: '#3b82f6',
    fontWeight: '700',
    animation: 'fadeInUp 0.5s ease-out'
  },
  tagline: {
    fontSize: '1.35rem',
    lineHeight: '1.8',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '4rem',
    animation: 'fadeInUp 1s ease-out 0.8s both',
    maxWidth: '600px'
  },
  scrollIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    animation: 'fadeInUp 1s ease-out 1s both, bounce 2s ease-in-out 2s infinite',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  mouse: {
    width: '30px',
    height: '50px',
    border: '2px solid rgba(139, 92, 246, 0.6)',
    borderRadius: '15px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10px'
  },
  mouseWheel: {
    width: '4px',
    height: '10px',
    background: '#8b5cf6',
    borderRadius: '2px',
    animation: 'mouseScroll 1.5s ease-in-out infinite'
  },
  scrollText: {
    fontSize: '0.875rem',
    color: 'rgba(139, 92, 246, 0.8)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  },
  imageSection: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeInUp 1s ease-out 0.6s both',
    perspective: '1500px'
  },
  imageWrapper: {
    position: 'relative',
    animation: 'float3D 8s ease-in-out infinite',
    transformStyle: 'preserve-3d'
  },
  imageGlow1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    animation: 'glow 4s ease-in-out infinite',
    zIndex: -1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  imageGlow2: {
    position: 'absolute',
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(50px)',
    animation: 'glow 4s ease-in-out infinite 0.5s',
    zIndex: -1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  imageGlow3: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(40px)',
    animation: 'glow 4s ease-in-out infinite 1s',
    zIndex: -1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  imageContainer: {
    position: 'relative',
    width: '420px',
    height: '420px',
    borderRadius: '35% 65% 70% 30% / 35% 35% 65% 65%',
    overflow: 'hidden',
    border: '4px solid rgba(139, 92, 246, 0.5)',
    boxShadow: '0 30px 100px rgba(139, 92, 246, 0.5), inset 0 0 60px rgba(59, 130, 246, 0.2)',
    animation: 'glow 4s ease-in-out infinite',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
    transform: 'translateZ(50px)'
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  holographicOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    animation: 'holographic 3s ease-in-out infinite',
    pointerEvents: 'none'
  },
  floatingElement1: {
    position: 'absolute',
    top: '-8%',
    right: '-15%',
    animation: 'floatElement 5s ease-in-out infinite',
    transform: 'translateZ(100px)'
  },
  codeIcon: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#8b5cf6',
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(20px)',
    padding: '1.5rem',
    borderRadius: '20px',
    border: '2px solid rgba(139, 92, 246, 0.4)',
    boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)',
    fontFamily: 'monospace'
  },
  floatingElement2: {
    position: 'absolute',
    bottom: '10%',
    left: '-18%',
    animation: 'floatElement 6s ease-in-out infinite 1s',
    transform: 'translateZ(80px)'
  },
  techIcon: {
    fontSize: '3rem',
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(20px)',
    padding: '1.5rem',
    borderRadius: '20px',
    border: '2px solid rgba(59, 130, 246, 0.4)',
    boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)'
  },
  floatingElement3: {
    position: 'absolute',
    top: '45%',
    right: '-22%',
    animation: 'floatElement 5.5s ease-in-out infinite 0.5s',
    transform: 'translateZ(120px)'
  },
  rocketIcon: {
    fontSize: '3rem',
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(20px)',
    padding: '1.5rem',
    borderRadius: '20px',
    border: '2px solid rgba(236, 72, 153, 0.4)',
    boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.3)'
  }
};

export default ModernHero;