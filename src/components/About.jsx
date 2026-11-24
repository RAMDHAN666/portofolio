import React, { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import PortraitReveal from './PortraitReveal';
import SectionLabel from './SectionLabel';

const ModernAbout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const education = [
    { school: 'SDN Leuwigajah 02 Cimahi', year: '2010-2016', icon: '🎓' },
    { school: 'MTS Nurul Falah Cimahi', year: '2016-2019', icon: '🎓' },
    { school: 'SMK Wiraswasta Cimahi - RPL', year: '2019-2022', icon: '🎓' },
    { school: 'STMIK Mardira Indonesia - SI', year: '2022-Present', icon: '🎓' }
  ];

  return (
    <section style={styles.aboutSection}>
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

        <div style={styles.gridOverlay}></div>
        <div style={styles.gridOverlayVertical}></div>
        <div style={styles.scanLines}></div>
      </div>

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

      <div style={styles.container}>
        <div style={{...styles.header, opacity: isVisible ? 1 : 0}}>
          <SectionLabel number="01" text="Perkenalan" />
          <h1 style={styles.mainTitle}>
            Tentang <span style={styles.titleHighlight}>Saya</span>
          </h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.headerSubtitle}>
            Web Developer • Tech Enthusiast • Creative Problem Solver
          </p>
        </div>

        <div style={styles.contentGrid}>
          <div style={styles.storySection}>
            <div style={{...styles.storyCard, animationDelay: '0.2s'}}>
              <div style={styles.cardGlow}></div>
              <div style={styles.holographicBorder}></div>
              
              <h2 style={styles.cardTitle}>
                <span style={styles.emojiIcon}>👋</span> Halo!
              </h2>
              <p style={styles.paragraph}>
                Saya <strong style={styles.nameHighlight}>Ramdhani Dwi Saputra</strong>, 
                seorang mahasiswa <strong>Sistem Informasi</strong> di STMIK Mardira Indonesia 
                sekaligus <strong style={styles.roleHighlight}>Web Developer</strong> yang antusias 
                dalam membangun aplikasi web dan mobile modern.
              </p>
              <p style={styles.paragraph}>
                Saya memiliki ketertarikan mendalam terhadap dunia teknologi dan fokus pada 
                pengembangan solusi digital yang inovatif dan user-friendly.
              </p>
            </div>

            <div style={{...styles.storyCard, animationDelay: '0.4s'}}>
              <div style={styles.cardGlow}></div>
              <div style={styles.holographicBorder}></div>
              
              <h3 style={styles.cardSubtitle}>
                <span style={styles.emojiIcon}>💻</span> Teknologi & Skills
              </h3>
              <p style={styles.paragraph}>
                Saya terbiasa bekerja dengan teknologi dan bahasa pemrograman seperti{' '}
                <span style={styles.techBadge}>Kotlin</span>,{' '}
                <span style={styles.techBadge}>Dart</span>,{' '}
                <span style={styles.techBadge}>Flutter</span>,{' '}
                <span style={styles.techBadge}>Firebase</span>,{' '}
                <span style={styles.techBadge}>PHP</span>, dan{' '}
                <span style={styles.techBadge}>C++</span>.
              </p>
              <p style={styles.paragraph}>
                Dari sini saya terus belajar membangun proyek website yang kompleks, 
                mendesain arsitektur aplikasi yang scalable, dan mengoptimalkan performa sistem.
              </p>
            </div>

            <div style={{...styles.storyCard, animationDelay: '0.6s'}}>
              <div style={styles.cardGlow}></div>
              <div style={styles.holographicBorder}></div>
              
              <h3 style={styles.cardSubtitle}>
                <span style={styles.emojiIcon}>📜</span> Filosofi & Passion
              </h3>
              <p style={styles.paragraph}>
                Di waktu luang, saya senang mengeksplorasi teknologi terbaru dalam dunia 
                web development dan terus belajar hal-hal baru untuk meningkatkan skill.
              </p>
              <div style={styles.quoteBox}>
                <div style={styles.quoteIcon}>"</div>
                <p style={styles.quote}>
                  Pembelajaran terbaik datang dari praktik langsung dan pengalaman nyata 
                  dalam menghadapi tantangan teknis yang sesungguhnya.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.sideSection}>
            <PortraitReveal />
            <div style={{...styles.educationCard, animationDelay: '0.3s'}}>
              <div style={styles.cardGlow}></div>
              <div style={styles.holographicBorder}></div>
              
              <div style={styles.cardHeader}>
                <FaGraduationCap style={styles.headerIcon} />
                <h3 style={styles.cardTitle}>Pendidikan</h3>
              </div>
              
              <div style={styles.timeline}>
                {education.map((edu, index) => (
                  <div key={index} style={styles.timelineItem}>
                    <div style={styles.timelineDot}>
                      <span style={styles.timelineDotIcon}>{edu.icon}</span>
                    </div>
                    <div style={styles.timelineContent}>
                      <div style={styles.timelineYear}>{edu.year}</div>
                      <div style={styles.timelineSchool}>{edu.school}</div>
                    </div>
                    {index < education.length - 1 && (
                      <div style={styles.timelineLine}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.5; 
          }
          50% { 
            transform: translateY(-30px) translateX(20px) scale(1.3); 
            opacity: 1; 
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px) rotateX(-15deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(40px, 30px) scale(1.15) rotate(120deg); }
          66% { transform: translate(-30px, 40px) scale(0.95) rotate(240deg); }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes holographicScan {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }

        @keyframes scanMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes gridScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        /* RESPONSIVE TABLET & MOBILE */
        @media (max-width: 1024px) {
          section > div:nth-child(4) > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 4rem 1.5rem !important;
          }

          h1 {
            font-size: 3rem !important;
          }

          section > div:nth-child(4) > div:first-child > p {
            font-size: 1rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div h2 {
            font-size: 1.75rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div h3 {
            font-size: 1.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div p,
          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > div p {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 640px) {
          section {
            padding: 3rem 1rem !important;
          }

          h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }

          section > div:nth-child(4) > div:first-child {
            margin-bottom: 2.5rem !important;
          }

          section > div:nth-child(4) > div:first-child > div {
            width: 100px !important;
          }

          section > div:nth-child(4) > div:first-child > p {
            font-size: 0.95rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) {
            gap: 1.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div > div {
            padding: 1.75rem !important;
            border-radius: 20px !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div h2 {
            font-size: 1.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div h3 {
            font-size: 1.35rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div p {
            font-size: 0.95rem !important;
            line-height: 1.7 !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div:last-child > div:nth-child(4) {
            padding: 1.25rem 1.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div:last-child > div:nth-child(4) p {
            font-size: 0.9rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child h3 {
            font-size: 1.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:first-child {
            gap: 0.75rem !important;
            margin-bottom: 1.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:first-child > svg {
            font-size: 2rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:nth-child(3) > div {
            padding-left: 2.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:nth-child(3) > div > div:first-child {
            width: 35px !important;
            height: 35px !important;
            left: 0 !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:nth-child(3) > div > div:first-child span {
            font-size: 1rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:nth-child(3) > div > div:nth-child(3) {
            left: 16px !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:nth-child(3) > div > div:nth-child(2) > div:first-child {
            font-size: 0.85rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:first-child > div:nth-child(3) > div > div:nth-child(2) > div:last-child {
            font-size: 0.95rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div {
            padding: 1.5rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:first-child {
            width: 60px !important;
            height: 60px !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:first-child > div {
            font-size: 1.75rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) h4 {
            font-size: 1.1rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) p {
            font-size: 0.85rem !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem !important;
          }

          section > div:nth-child(4) > div:first-child > p {
            font-size: 0.85rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div h2 {
            font-size: 1.35rem !important;
          }

          section > div:nth-child(4) > div:nth-child(2) > div:first-child > div h3 {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  aboutSection: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 50%, #0f1729 100%)',
    padding: '6rem 2rem',
    overflow: 'hidden',
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
    top: '15%',
    left: '5%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: 'orbFloat 25s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    width: '700px',
    height: '700px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(90px)',
    animation: 'orbFloat 30s ease-in-out infinite reverse',
    transition: 'transform 0.3s ease-out'
  },
  gradientOrb3: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    animation: 'orbFloat 20s ease-in-out infinite',
    transition: 'transform 0.3s ease-out'
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(139, 92, 246, 0.05) 49px, rgba(139, 92, 246, 0.05) 50px)',
    animation: 'gridScroll 20s linear infinite',
    opacity: 0.4
  },
  gridOverlayVertical: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(139, 92, 246, 0.05) 49px, rgba(139, 92, 246, 0.05) 50px)',
    opacity: 0.4
  },
  scanLines: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
    animation: 'scanMove 4s linear infinite',
    pointerEvents: 'none',
    opacity: 0.3
  },
  particlesContainer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none'
  },
  container: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
    zIndex: 10,
    transformStyle: 'preserve-3d'
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
    transition: 'opacity 1s ease'
  },
  mainTitle: {
    fontSize: '4.5rem',
    fontWeight: '900',
    color: 'white',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
    textShadow: '0 0 40px rgba(139, 92, 246, 0.5)'
  },
  titleHighlight: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'pulse 3s ease-in-out infinite'
  },
  titleUnderline: {
    width: '150px',
    height: '5px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)',
    margin: '0 auto 1.5rem',
    borderRadius: '3px',
    boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)'
  },
  headerSubtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '3rem',
    alignItems: 'start'
  },
  storySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  storyCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    borderRadius: '28px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'fadeInUp 0.8s ease-out both',
    transition: 'all 0.5s ease',
    transformStyle: 'preserve-3d',
    overflow: 'hidden'
  },
  cardGlow: {
    position: 'absolute',
    inset: '-3px',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))',
    borderRadius: '28px',
    filter: 'blur(25px)',
    opacity: 0,
    transition: 'opacity 0.5s ease',
    zIndex: -1
  },
  holographicBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: '28px',
    background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
    animation: 'holographicScan 3s ease-in-out infinite',
    opacity: 0.3,
    pointerEvents: 'none'
  },
  emojiIcon: {
    marginRight: '0.5rem',
    display: 'inline-block',
    animation: 'pulse 2s ease-in-out infinite'
  },
  cardTitle: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1.5rem',
    textShadow: '0 2px 20px rgba(139, 92, 246, 0.3)'
  },
  cardSubtitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem',
    textShadow: '0 2px 20px rgba(139, 92, 246, 0.3)'
  },
  paragraph: {
    fontSize: '1.125rem',
    lineHeight: '1.9',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: '1rem'
  },
  nameHighlight: {
    color: '#8b5cf6',
    fontWeight: '700',
    textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
  },
  roleHighlight: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700'
  },
  techBadge: {
    display: 'inline-block',
    padding: '0.4rem 1rem',
    background: 'rgba(139, 92, 246, 0.15)',
    color: '#8b5cf6',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '700',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
    margin: '0 0.25rem'
  },
  quoteBox: {
    position: 'relative',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '2px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '16px',
    padding: '1.5rem 2rem',
    marginTop: '1.5rem'
  },
  quoteIcon: {
    position: 'absolute',
    top: '-10px',
    left: '20px',
    fontSize: '3rem',
    color: '#8b5cf6',
    fontWeight: '900',
    opacity: 0.3
  },
  quote: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.05rem',
    lineHeight: '1.8',
    fontStyle: 'italic',
    margin: 0
  },
  sideSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  educationCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    borderRadius: '28px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'fadeInUp 0.8s ease-out both',
    overflow: 'hidden'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  headerIcon: {
    fontSize: '2.5rem',
    color: '#8b5cf6',
    filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.6))'
  },
  timeline: {
    position: 'relative'
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: '3rem',
    paddingBottom: '2rem'
  },
  timelineDot: {
    position: 'absolute',
    left: '0',
    top: '0.5rem',
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 25px rgba(139, 92, 246, 0.7)',
    animation: 'pulse 2s ease-in-out infinite'
  },
  timelineDotIcon: {
    fontSize: '1.25rem'
  },
  timelineLine: {
    position: 'absolute',
    left: '19px',
    top: '3rem',
    bottom: '0',
    width: '3px',
    background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.6) 0%, transparent 100%)',
    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
  },
  timelineContent: {
    marginBottom: '0.5rem'
  },
  timelineYear: {
    fontSize: '0.95rem',
    color: '#8b5cf6',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
  },
  timelineSchool: {
    fontSize: '1.05rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    lineHeight: '1.5'
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  },
  skillCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '1.75rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'fadeInUp 0.8s ease-out both',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    transformStyle: 'preserve-3d'
  },
  skillIconWrapper: {
    width: '70px',
    height: '70px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s ease',
    flexShrink: 0
  },
  skillIcon: {
    fontSize: '2.25rem',
    transition: 'all 0.4s ease'
  },
  skillContent: {
    flex: 1
  },
  skillTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.5rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  skillDesc: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500'
  },
  skillGlow: {
    position: 'absolute',
    inset: '-2px',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
    borderRadius: '20px',
    filter: 'blur(20px)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    zIndex: -1
  }
};

export default ModernAbout;


