import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaCode, FaDatabase, FaChartLine, FaTachometerAlt, FaHospital, FaFileAlt, FaFolderOpen, FaUserShield } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';

const ModernExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 3
      });
    }
    setParticles(newParticles);
  }, []);

  const experiences = [
    {
      year: '2025',
      title: 'Internship - Web Development',
      company: 'Sentra Abiyoso',
      type: 'Internship',
      icon: <FaBriefcase size={24} />,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
      responsibilities: [
        {
          icon: <FaCode />,
          text: 'Mengembangkan sistem aplikasi web survey kepuasan masyarakat'
        },
        {
          icon: <FaDatabase />,
          text: 'Mendesain database dan arsitektur aplikasi'
        },
        {
          icon: <FaChartLine />,
          text: 'Mengimplementasikan fitur frontend dan backend'
        },
        {
          icon: <FaTachometerAlt />,
          text: 'Melakukan testing dan debugging aplikasi'
        }
      ]
    },
    {
      year: '2018-2019',
      title: 'Rekam Medis',
      company: 'Puskesmas Cibereum',
      type: 'Internship',
      icon: <FaHospital size={24} />,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      responsibilities: [
        {
          icon: <FaFileAlt />,
          text: 'Mengelola dan menyimpan rekam medis pasien dengan sistem dan prosedur yang benar'
        },
        {
          icon: <FaFolderOpen />,
          text: 'Mengarsipkan dokumen medis secara efisien dan terorganisir'
        },
        {
          icon: <FaBriefcase />,
          text: 'Membantu proses administrasi pasien di puskesmas'
        },
        {
          icon: <FaUserShield />,
          text: 'Menjaga kerahasiaan dan keamanan data pasien'
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Experience | Ramdhani Dwi Saputra"
        description="Pengalaman kerja Ramdhani Dwi Saputra sebagai Web Developer dan staff administrasi di berbagai institusi."
        url="/experience"
      />
      <Navbar />
      <section style={styles.experienceSection}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={styles.gradientOrb1}></div>
        <div style={styles.gradientOrb2}></div>
      </div>

      {/* Particles */}
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
              background: 'rgba(139, 92, 246, 0.4)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>
            Work <span style={styles.titleHighlight}>Experience</span>
          </h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>
            My professional journey and achievements
          </p>
        </div>

        {/* Experience Timeline */}
        <div style={styles.experienceContainer}>
          {/* Timeline Line */}
          <div style={styles.timelineLine}></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                ...styles.experienceCard,
                animationDelay: `${index * 0.2}s`,
                transform: activeIndex === index ? 'scale(1.02)' : 'scale(1)'
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {/* Glow Effect */}
              <div 
                style={{
                  ...styles.cardGlow,
                  background: exp.gradient,
                  opacity: activeIndex === index ? 0.3 : 0
                }}
              ></div>

              {/* Timeline Dot */}
              <div style={styles.timelineDot}>
                <div style={{...styles.dotInner, background: exp.gradient}}></div>
              </div>

              {/* Content */}
              <div style={styles.cardContent}>
                {/* Year Badge */}
                <div style={{...styles.yearBadge, borderColor: exp.color, color: exp.color}}>
                  {exp.year}
                </div>

                {/* Header */}
                <div style={styles.cardHeader}>
                  <div style={{...styles.iconContainer, background: exp.gradient}}>
                    {exp.icon}
                  </div>
                  <div>
                    <h2 style={styles.jobTitle}>{exp.title}</h2>
                    <div style={styles.companyInfo}>
                      <span style={styles.companyName}>{exp.company}</span>
                      <span style={{...styles.jobType, borderColor: exp.color, color: exp.color}}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div style={styles.responsibilities}>
                  {exp.responsibilities.map((resp, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.responsibilityItem,
                        animationDelay: `${0.3 + i * 0.1}s`
                      }}
                    >
                      <div style={{...styles.respIcon, color: exp.color}}>
                        {resp.icon}
                      </div>
                      <p style={styles.respText}>{resp.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }

        @keyframes orbMove1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.15); }
        }

        @keyframes orbMove2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 45px) scale(1.2); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .experience-container-responsive {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
    </>
  );
};

const styles = {
  experienceSection: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f1729 100%)',
    padding: '6rem 2rem',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  background: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  },
  gradientOrb1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    animation: 'orbMove1 22s ease-in-out infinite'
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    animation: 'orbMove2 20s ease-in-out infinite'
  },
  particlesContainer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none'
  },
  container: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    zIndex: 10
  },
  header: {
    textAlign: 'center',
    marginBottom: '5rem'
  },
  mainTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
  },
  titleHighlight: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  titleUnderline: {
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
    margin: '0 auto 2rem',
    borderRadius: '2px'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400'
  },
  experienceContainer: {
    position: 'relative',
    paddingLeft: '3rem',
    className: 'experience-container-responsive'
  },
  timelineLine: {
    position: 'absolute',
    left: '22px',
    top: '50px',
    bottom: '50px',
    width: '2px',
    background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.5) 0%, rgba(16, 185, 129, 0.5) 100%)',
    borderRadius: '2px'
  },
  experienceCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '2rem',
    animation: 'fadeInUp 0.8s ease-out both',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer'
  },
  cardGlow: {
    position: 'absolute',
    inset: '-3px',
    borderRadius: '24px',
    filter: 'blur(25px)',
    transition: 'opacity 0.4s ease',
    zIndex: -1
  },
  timelineDot: {
    position: 'absolute',
    left: '-3rem',
    top: '2.5rem',
    width: '50px',
    height: '50px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255, 255, 255, 0.1)'
  },
  dotInner: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    boxShadow: '0 0 20px currentColor'
  },
  cardContent: {
    position: 'relative'
  },
  yearBadge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '700',
    border: '2px solid',
    marginBottom: '1.5rem',
    animation: 'slideInLeft 0.6s ease-out 0.2s both'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    marginBottom: '2rem',
    animation: 'slideInLeft 0.6s ease-out 0.3s both'
  },
  iconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
  },
  jobTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.75rem',
    lineHeight: '1.2'
  },
  companyInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  companyName: {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500'
  },
  jobType: {
    padding: '0.25rem 0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    border: '1px solid'
  },
  responsibilities: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  responsibilityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    animation: 'slideInLeft 0.6s ease-out both',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease'
  },
  respIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
    marginTop: '0.25rem'
  },
  respText: {
    fontSize: '1.05rem',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0
  }
};

export default ModernExperience;