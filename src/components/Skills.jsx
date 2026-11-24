import React, { useEffect, useState } from 'react';
import SectionLabel from './SectionLabel';
import { FaHtml5, FaReact, FaPhp, FaJava } from 'react-icons/fa';
import {
  SiKotlin, SiDart, SiCplusplus, SiMysql, SiPostgresql, SiFirebase
} from 'react-icons/si';

const skills = [
  { name: 'HTML', icon: <FaHtml5 size={48} />, color: '#e34c26', gradient: 'linear-gradient(135deg, #e34c26 0%, #f06529 100%)', level: 50 },
  { name: 'PostgreSQL', icon: <SiPostgresql size={48} />, color: '#4f8fc0', gradient: 'linear-gradient(135deg, #336791 0%, #4f8fc0 100%)', level: 50 },
  { name: 'Java', icon: <FaJava size={48} />, color: '#ed8b00', gradient: 'linear-gradient(135deg, #ed8b00 0%, #5382a1 100%)', level: 50 },
  { name: 'Firebase', icon: <SiFirebase size={48} />, color: '#ffca28', gradient: 'linear-gradient(135deg, #ffca28 0%, #ff8f00 100%)', level: 60 },
  { name: 'PHP', icon: <FaPhp size={48} />, color: '#777BB4', gradient: 'linear-gradient(135deg, #777BB4 0%, #8892BF 100%)', level: 50 },
  { name: 'React', icon: <FaReact size={48} />, color: '#61dafb', gradient: 'linear-gradient(135deg, #61dafb 0%, #4fa8c5 100%)', level: 50 },
  { name: 'Kotlin', icon: <SiKotlin size={48} />, color: '#7F52FF', gradient: 'linear-gradient(135deg, #7F52FF 0%, #9B6EFF 100%)', level: 60 },
  { name: 'Dart', icon: <SiDart size={48} />, color: '#0175C2', gradient: 'linear-gradient(135deg, #0175C2 0%, #13B9FD 100%)', level: 60 },
  { name: 'C++', icon: <SiCplusplus size={48} />, color: '#00599C', gradient: 'linear-gradient(135deg, #00599C 0%, #004482 100%)', level: 50 },
  { name: 'MySQL', icon: <SiMysql size={48} />, color: '#00758f', gradient: 'linear-gradient(135deg, #00758f 0%, #00a6c7 100%)', level: 50 }
];

const REST = { rx: 0, ry: 0, gx: 50, gy: 50 };

const SkillCard = ({ skill, index }) => {
  const [hover, setHover] = useState(false);
  const [t, setT] = useState(REST);

  // event dipasang di wrapper (yang tidak ikut miring) supaya tilt tidak "bergetar"
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * 28,
      ry: (px - 0.5) * 32,
      gx: px * 100,
      gy: py * 100
    });
  };

  const handleLeave = () => {
    setHover(false);
    setT(REST);
  };

  return (
    <div
      style={{
        perspective: '900px',
        animation: 'fadeInUp 0.8s ease-out both',
        animationDelay: `${index * 0.08}s`,
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="sk-card"
        style={{
          position: 'relative',
          minHeight: '280px',
          padding: '2.5rem 1.5rem',
          borderRadius: '28px',
          background: 'rgba(22, 22, 52, 0.55)',
          border: `1px solid ${hover ? skill.color + '88' : 'rgba(255, 255, 255, 0.1)'}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: hover
            ? `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(40px) scale(1.04)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
          transition: hover
            ? 'transform 0.08s linear, box-shadow 0.4s ease, border-color 0.4s ease'
            : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease, border-color 0.5s ease',
          boxShadow: hover
            ? `0 40px 70px rgba(0, 0, 0, 0.5), 0 0 50px ${skill.color}55`
            : '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* glow di belakang kartu (lebih dalam di sumbu Z) */}
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '28px',
            background: skill.gradient,
            filter: 'blur(30px)',
            opacity: hover ? 0.45 : 0,
            transform: 'translateZ(-50px)',
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none'
          }}
        />

        {/* lapisan kaca + kilau (di-clip supaya rapi, terpisah dari konten 3D) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '28px',
            overflow: 'hidden',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255, 255, 255, 0.28), transparent 55%)`,
              opacity: hover ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        </div>

        {/* konten: tiap lapis punya kedalaman sendiri */}
        <div
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: hover ? skill.gradient : 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: hover ? `0 25px 40px ${skill.color}55` : '0 10px 30px rgba(0, 0, 0, 0.2)',
            transform: hover ? 'translateZ(75px) scale(1.08)' : 'translateZ(0px) scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.4s ease, box-shadow 0.4s ease'
          }}
          className="sk-icon"
        >
          <div style={{ color: hover ? 'white' : skill.color, transition: 'color 0.3s ease' }}>
            {skill.icon}
          </div>
        </div>

        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: '700',
            color: 'white',
            textAlign: 'center',
            margin: 0,
            textShadow: hover ? `0 0 20px ${skill.color}` : 'none',
            transform: hover ? 'translateZ(50px)' : 'translateZ(0px)',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), text-shadow 0.3s ease'
          }}
        >
          {skill.name}
        </h3>

        <div
          style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '0.5rem',
            transform: hover ? 'translateZ(30px)' : 'translateZ(0px)',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <div
            style={{
              height: '100%',
              background: skill.gradient,
              borderRadius: '10px',
              width: hover ? `${skill.level}%` : '0%',
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>

        <div
          style={{
            marginTop: '0.5rem',
            transform: hover ? 'translateZ(40px)' : 'translateZ(0px)',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <span
            style={{
              color: 'white',
              fontWeight: '700',
              fontSize: '1.25rem',
              textShadow: hover ? `0 0 15px ${skill.color}` : '0 2px 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            {hover ? skill.level : 0}%
          </span>
        </div>
      </div>
    </div>
  );
};

const ModernSkills = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section id="skills" className="sk-section" style={styles.skillsSection}>
      <div style={styles.background}>
        <div style={{ ...styles.gradientOrb1, transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1)` }}></div>
        <div style={{ ...styles.gradientOrb2, transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px) scale(1)` }}></div>
        <div style={{ ...styles.gradientOrb3, transform: `translate(${mousePosition.y}px, ${mousePosition.x}px) scale(1)` }}></div>
        <div style={styles.gridLines}></div>
        <div style={styles.gridLinesVertical}></div>
      </div>

      <div style={styles.particlesContainer}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(139, 92, 246, 0.5)`
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        <div style={styles.header}>
          <SectionLabel number="02" text="Keahlian" />
          <h2 className="sk-title" style={{ ...styles.mainTitle, ...(glitchActive ? styles.glitchText : {}) }}>
            My <span style={styles.titleHighlight}>Skills</span>
          </h2>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>Technologies and tools I use to bring ideas to life</p>
        </div>

        <div className="sk-grid" style={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-30px) translateX(20px) scale(1.3); opacity: 1; }
        }
        @keyframes orbMove1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(50px, 40px) scale(1.2) rotate(120deg); }
          66% { transform: translate(-30px, 60px) scale(0.9) rotate(240deg); }
        }
        @keyframes orbMove2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-60px, 50px) scale(1.15) rotate(-120deg); }
          66% { transform: translate(40px, -50px) scale(1.1) rotate(-240deg); }
        }
        @keyframes orbMove3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(50px, -60px) scale(1.25) rotate(180deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px) rotateX(-20deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(3px, -1px); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }

        @media (max-width: 1024px) {
          .sk-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 2rem !important; }
        }
        @media (max-width: 768px) {
          .sk-section { padding: 4rem 1.5rem !important; }
          .sk-title { font-size: 3rem !important; }
          .sk-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.5rem !important; }
          .sk-card { padding: 2rem 1.25rem !important; min-height: 240px !important; }
          .sk-icon { width: 90px !important; height: 90px !important; }
          .sk-icon svg { width: 40px !important; height: 40px !important; }
        }
        @media (max-width: 480px) {
          .sk-section { padding: 3rem 1rem !important; }
          .sk-title { font-size: 2.2rem !important; }
          .sk-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .sk-card { min-height: 200px !important; }
          .sk-icon { width: 70px !important; height: 70px !important; }
          .sk-icon svg { width: 32px !important; height: 32px !important; }
        }
      `}</style>
    </section>
  );
};

const styles = {
  skillsSection: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 50%, #0f1729 100%)',
    padding: '6rem 2rem',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  background: { position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' },
  gradientOrb1: {
    position: 'absolute', top: '10%', right: '10%', width: '600px', height: '600px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
    borderRadius: '50%', filter: 'blur(80px)', animation: 'orbMove1 25s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gradientOrb2: {
    position: 'absolute', bottom: '15%', left: '5%', width: '550px', height: '550px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)',
    borderRadius: '50%', filter: 'blur(80px)', animation: 'orbMove2 28s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gradientOrb3: {
    position: 'absolute', top: '45%', left: '45%', width: '500px', height: '500px',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
    borderRadius: '50%', filter: 'blur(70px)', animation: 'orbMove3 22s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gridLines: {
    position: 'absolute', inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(139, 92, 246, 0.03) 49px, rgba(139, 92, 246, 0.03) 50px)',
    animation: 'gridMove 20s linear infinite', opacity: 0.5
  },
  gridLinesVertical: {
    position: 'absolute', inset: 0,
    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(139, 92, 246, 0.03) 49px, rgba(139, 92, 246, 0.03) 50px)',
    opacity: 0.5
  },
  particlesContainer: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  container: { position: 'relative', maxWidth: '1400px', margin: '0 auto', zIndex: 10 },
  header: { textAlign: 'center', marginBottom: '5rem' },
  mainTitle: { fontSize: '4rem', fontWeight: '900', color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' },
  glitchText: { animation: 'glitch 0.3s ease-in-out' },
  titleHighlight: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
  },
  titleUnderline: {
    width: '120px', height: '5px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)',
    margin: '0 auto 2rem', borderRadius: '3px', boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
  },
  subtitle: { fontSize: '1.3rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '400' },
  skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2.5rem' }
};

export default ModernSkills;

