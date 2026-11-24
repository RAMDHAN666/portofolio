import React, { useState } from 'react';
import SectionLabel from './SectionLabel';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

const ModernPortfolio = ({ projectData }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projects = projectData && projectData.length > 0 ? projectData : [
    {
      id: 'survey-kepuasan',
      title: 'Survey Kepuasan Masyarakat',
      description: 'Aplikasi web untuk mengukur tingkat kepuasan masyarakat terhadap pelayanan publik dengan fitur survey online, analisis data real-time, dan dashboard reporting.',
      mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      url: 'https://surveysentraabiyoso.fwh.is',
      tech: ['PHP', 'CSS', 'Desktop'],
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
    }
  ];

  const handleMouseMove = (e, index) => {
    if (hoveredIndex === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
      setMousePosition({ x, y });
    }
  };

  const getGridColumns = () => {
    if (projects.length === 1) return '1fr';
    if (projects.length === 2) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  return (
    <section style={styles.portfolioSection}>
      <div style={styles.background}>
        <div style={styles.gradientOrb1}></div>
        <div style={styles.gradientOrb2}></div>
        <div style={styles.grid}></div>
      </div>

      <div style={styles.container}>
        <div style={styles.header}>
          <SectionLabel number="03" text="Karya" />
          <h1 style={styles.mainTitle}>
            My <span style={styles.titleHighlight}>Portfolio</span>
          </h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>
            Showcasing my work and projects
          </p>
        </div>

        <div style={{
          ...styles.projectsGrid,
          gridTemplateColumns: getGridColumns(),
          justifyContent: projects.length === 1 ? 'center' : 'start'
        }}>
          {projects.map((project, index) => {
            const projectColor = project.color || '#8b5cf6';
            const projectGradient = project.gradient || 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)';
            const projectTech = project.tech || ['Laravel', 'PHP', 'MySQL'];

            return (
              <article
                key={project.id}
                style={{
                  ...styles.projectCard,
                  animationDelay: `${index * 0.15}s`,
                  maxWidth: projects.length === 1 ? '600px' : '100%',
                  transform: hoveredIndex === index 
                    ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateY(-10px) scale(1.02)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setMousePosition({ x: 0, y: 0 });
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                <div 
                  style={{
                    ...styles.cardGlow,
                    background: projectGradient,
                    opacity: hoveredIndex === index ? 0.4 : 0
                  }}
                ></div>

                <div style={styles.imageContainer}>
                  <img 
                    src={project.mainImage} 
                    alt={`Tampilan proyek ${project.title}`}
                    style={{
                      ...styles.projectImage,
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <div 
                    style={{
                      ...styles.imageOverlay,
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                  >
                    <div style={styles.overlayButtons}>
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{...styles.iconButton, background: projectGradient}}
                      >
                        <FaExternalLinkAlt size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div style={styles.cardContent}>
                  <h2 style={styles.projectTitle}>{project.title}</h2>
                  <p style={styles.projectDescription}>{project.description}</p>

                  {projectTech && projectTech.length > 0 && (
                    <div style={styles.techStack}>
                      {projectTech.map((tech, i) => (
                        <span 
                          key={i} 
                          style={{
                            ...styles.techBadge,
                            borderColor: projectColor,
                            color: projectColor
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...styles.viewButton,
                        background: hoveredIndex === index ? projectGradient : 'transparent',
                        borderColor: projectColor,
                        color: hoveredIndex === index ? 'white' : projectColor,
                        textDecoration: 'none',
                        display: 'flex'
                      }}
                    >
                      <span>Kunjungi Website</span>
                      <FaArrowRight 
                        style={{
                          transform: hoveredIndex === index ? 'translateX(5px)' : 'translateX(0)',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </a>
                  ) : (
                    <Link
                      to={`/portfolio/${project.id}`}
                      style={{
                        ...styles.viewButton,
                        background: hoveredIndex === index ? projectGradient : 'transparent',
                        borderColor: projectColor,
                        color: hoveredIndex === index ? 'white' : projectColor,
                        textDecoration: 'none',
                        display: 'flex'
                      }}
                    >
                      <span>Detail Projek</span>
                      <FaArrowRight 
                        style={{
                          transform: hoveredIndex === index ? 'translateX(5px)' : 'translateX(0)',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </Link>
                  )}
                </div>

                <div style={styles.cardNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </article>
            );
          })}
        </div>

        {(!projects || projects.length === 0) && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📁</div>
            <h3 style={styles.emptyTitle}>Belum Ada Project</h3>
            <p style={styles.emptyText}>Project portfolio akan ditampilkan di sini</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes orbMove1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 50px) scale(1.2); }
        }

        @keyframes orbMove2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.15); }
        }

        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }

        /* RESPONSIVE PORTFOLIO */
        @media (max-width: 1200px) {
          section > div:nth-child(2) > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 4rem 1.5rem !important;
          }

          h1 {
            font-size: 2.75rem !important;
          }

          section > div:nth-child(2) > div:first-child > p {
            font-size: 1.05rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) {
            gap: 2rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(2) {
            height: 250px !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) {
            padding: 1.5rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > h2 {
            font-size: 1.5rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > p {
            font-size: 0.95rem !important;
          }
        }

        @media (max-width: 640px) {
          section {
            padding: 3rem 1rem !important;
          }

          h1 {
            font-size: 2.25rem !important;
          }

          section > div:nth-child(2) > div:first-child {
            margin-bottom: 3rem !important;
          }

          section > div:nth-child(2) > div:first-child > div {
            width: 80px !important;
          }

          section > div:nth-child(2) > div:first-child > p {
            font-size: 1rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article {
            border-radius: 20px !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(2) {
            height: 220px !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) {
            padding: 1.25rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > h2 {
            font-size: 1.35rem !important;
            margin-bottom: 0.75rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > p {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > div:first-of-type {
            gap: 0.4rem !important;
            margin-bottom: 1rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > div:first-of-type > span {
            padding: 0.35rem 0.75rem !important;
            font-size: 0.75rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > a,
          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > div:last-child > a {
            padding: 0.75rem 1.25rem !important;
            font-size: 0.9rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:last-child {
            font-size: 3rem !important;
            top: 1rem !important;
            right: 1rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(2) > div:nth-child(2) > div > a {
            width: 50px !important;
            height: 50px !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(2) > div:nth-child(2) > div > a svg {
            width: 18px !important;
            height: 18px !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.9rem !important;
            line-height: 1.2 !important;
          }

          section > div:nth-child(2) > div:first-child > p {
            font-size: 0.95rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(2) {
            height: 200px !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > h2 {
            font-size: 1.2rem !important;
          }

          section > div:nth-child(2) > div:nth-child(2) > article > div:nth-child(3) > p {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  portfolioSection: {
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
    top: '10%',
    right: '15%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: 'orbMove1 25s ease-in-out infinite'
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '15%',
    left: '10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    animation: 'orbMove2 22s ease-in-out infinite'
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    animation: 'gridMove 20s linear infinite',
    opacity: 0.3
  },
  container: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
    zIndex: 10
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  mainTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
  },
  titleHighlight: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  titleUnderline: {
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
    margin: '0 auto 2rem',
    borderRadius: '2px'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400'
  },
  projectsGrid: {
    display: 'grid',
    gap: '2.5rem',
    marginBottom: '5rem'
  },
  projectCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    animation: 'fadeInUp 0.7s ease-out both',
    transformStyle: 'preserve-3d'
  },
  cardGlow: {
    position: 'absolute',
    inset: '-3px',
    borderRadius: '24px',
    filter: 'blur(30px)',
    transition: 'opacity 0.4s ease',
    zIndex: -1
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '300px',
    overflow: 'hidden'
  },
  projectImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease'
  },
  overlayButtons: {
    display: 'flex',
    gap: '1rem'
  },
  iconButton: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    textDecoration: 'none'
  },
  cardContent: {
    padding: '2rem'
  },
  projectTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem'
  },
  projectDescription: {
    fontSize: '1.05rem',
    lineHeight: '1.7',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '1.5rem'
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  },
  techBadge: {
    padding: '0.4rem 0.9rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    border: '1px solid',
    transition: 'all 0.3s ease'
  },
  viewButton: {
    width: '100%',
    padding: '0.875rem 1.5rem',
    borderRadius: '12px',
    border: '2px solid',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  cardNumber: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    fontSize: '4rem',
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.03)',
    lineHeight: 1,
    pointerEvents: 'none'
  },
  emptyState: {
    textAlign: 'center',
    padding: '5rem 2rem',
    marginBottom: '3rem'
  },
  emptyIcon: {
    fontSize: '5rem',
    marginBottom: '1rem'
  },
  emptyTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.5rem'
  },
  emptyText: {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.6)'
  }
};

export default ModernPortfolio;
