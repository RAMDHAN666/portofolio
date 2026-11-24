import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Navbar from './Navbar'; // Import Navbar yang udah ada

const Contact = () => {
  const [particles, setParticles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
  }, []);

  const handleWhatsApp = () => {
    const phoneNumber = '6287840046010';
    const message = 'Halo, saya ingin menghubungi Anda untuk diskusi project!';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const contactItems = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'ramdhanisaputra666@gmail.com',
      link: 'mailto:ramdhanisaputra666@gmail.com',
      color: '#8B5CF6'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Lokasi',
      value: 'Cimahi, Jawa Barat',
      link: '#',
      color: '#EC4899'
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, label: 'LinkedIn', link: 'https://www.linkedin.com/in/ramdhani-dwi-saputra-b166b1390', color: '#0A66C2' },
    { icon: FaTwitter, label: 'Twitter', link: 'https://x.com/1999Ramdha71358', color: '#1DA1F2' },
    { icon: FaInstagram, label: 'Instagram', link: 'https://www.instagram.com/rmdhn1ds', color: '#E1306C' },
    { icon: FaWhatsapp, label: 'WhatsApp', link: `https://wa.me/6287840046010`, color: '#25D366' }
  ];

  return (
    <>
      {/* Navbar yang sama persis kayak di halaman lain */}
      <Navbar />
      
      <main style={styles.contactSection}>
        <div style={styles.background}>
          <div style={styles.gradientOrb1}></div>
          <div style={styles.gradientOrb2}></div>
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
                background: 'rgba(139, 92, 246, 0.3)',
                borderRadius: '50%',
                pointerEvents: 'none',
                animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
              }}
            />
          ))}
        </div>

        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.mainTitle}>
              Mari <span style={styles.titleHighlight}>Berkolaborasi</span>
            </h1>
            <div style={styles.titleUnderline}></div>
            <p style={styles.subtitle}>
              Hubungi saya melalui berbagai channel yang tersedia
            </p>
          </div>

          <div style={styles.infoGrid}>
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.link}
                  style={{
                    ...styles.infoCard,
                    transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredCard === index 
                      ? `0 20px 40px rgba(${parseInt(item.color.slice(1,3),16)}, ${parseInt(item.color.slice(3,5),16)}, ${parseInt(item.color.slice(5,7),16)}, 0.3)`
                      : '0 10px 30px rgba(0,0,0,0.2)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ ...styles.iconWrapper, borderColor: item.color }}>
                    <Icon size={28} color={item.color} />
                  </div>
                  <h3 style={styles.infoLabel}>{item.label}</h3>
                  <p style={styles.infoValue}>{item.value}</p>
                </a>
              );
            })}
          </div>

          <section style={styles.socialSection}>
            <h2 style={styles.sectionTitle}>Ikuti Saya</h2>
            <p style={styles.socialSubtitle}>Terhubung dengan saya di berbagai platform</p>
            <div style={styles.socialLinks}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      ...styles.socialLink,
                      backgroundColor: social.color
                    }}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </section>

          <div style={styles.ctaSection}>
            <button
              onClick={handleWhatsApp}
              style={styles.ctaButton}
            >
              <FaWhatsapp size={20} style={{ marginRight: '10px' }} />
              Hubungi Saya Sekarang via WhatsApp
            </button>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-30px) translateX(15px); }
          }
          @keyframes orbMove1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(50px, 50px) scale(1.2); }
          }
          @keyframes orbMove2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-40px, 60px) scale(1.15); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* RESPONSIVE CONTACT */
          @media (max-width: 768px) {
            main {
              padding: 8rem 1.5rem 3rem !important;
            }

            h1 {
              font-size: 2.75rem !important;
            }

            main > div:nth-child(3) > div:first-child > p {
              font-size: 1rem !important;
              padding: 0 1rem !important;
            }

            main > div:nth-child(3) > div:nth-child(2) {
              gap: 1.5rem !important;
              margin-bottom: 3.5rem !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a {
              padding: 1.5rem !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a > div {
              width: 55px !important;
              height: 55px !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a > div svg {
              width: 24px !important;
              height: 24px !important;
            }

            main > div:nth-child(3) > section {
              padding: 2.5rem !important;
              margin-bottom: 2.5rem !important;
            }

            main > div:nth-child(3) > section > h2 {
              font-size: 1.6rem !important;
            }

            main > div:nth-child(3) > section > div {
              gap: 1.25rem !important;
            }

            main > div:nth-child(3) > section > div > a {
              width: 55px !important;
              height: 55px !important;
            }

            main > div:nth-child(3) > section > div > a svg {
              width: 22px !important;
              height: 22px !important;
            }

            main > div:nth-child(3) > div:last-child > button {
              padding: 1rem 2.25rem !important;
              font-size: 1rem !important;
            }
          }

          @media (max-width: 640px) {
            main {
              padding: 7rem 1rem 2rem !important;
            }

            h1 {
              font-size: 2.25rem !important;
            }

            main > div:nth-child(3) > div:first-child {
              margin-bottom: 3rem !important;
            }

            main > div:nth-child(3) > div:first-child > div {
              width: 70px !important;
              margin: 1rem auto 1.5rem !important;
            }

            main > div:nth-child(3) > div:first-child > p {
              font-size: 0.95rem !important;
            }

            main > div:nth-child(3) > div:nth-child(2) {
              grid-template-columns: 1fr !important;
              gap: 1.25rem !important;
              margin-bottom: 3rem !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a {
              padding: 1.25rem !important;
              border-radius: 16px !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a > div {
              width: 50px !important;
              height: 50px !important;
              border-radius: 10px !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a > div svg {
              width: 22px !important;
              height: 22px !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a > h3 {
              font-size: 1.1rem !important;
            }

            main > div:nth-child(3) > div:nth-child(2) > a > p {
              font-size: 0.9rem !important;
            }

            main > div:nth-child(3) > section {
              padding: 2rem !important;
              border-radius: 20px !important;
              margin-bottom: 2rem !important;
            }

            main > div:nth-child(3) > section > h2 {
              font-size: 1.4rem !important;
              margin-bottom: 0.75rem !important;
            }

            main > div:nth-child(3) > section > p {
              font-size: 0.9rem !important;
              margin-bottom: 1.5rem !important;
            }

            main > div:nth-child(3) > section > div {
              gap: 1rem !important;
            }

            main > div:nth-child(3) > section > div > a {
              width: 50px !important;
              height: 50px !important;
            }

            main > div:nth-child(3) > section > div > a svg {
              width: 20px !important;
              height: 20px !important;
            }

            main > div:nth-child(3) > div:last-child > button {
              padding: 0.9rem 2rem !important;
              font-size: 0.95rem !important;
              border-radius: 40px !important;
              width: 100% !important;
              justify-content: center !important;
            }

            main > div:nth-child(3) > div:last-child > button svg {
              width: 18px !important;
              height: 18px !important;
              margin-right: 8px !important;
            }
          }

          @media (max-width: 480px) {
            h1 {
              font-size: 1.9rem !important;
              line-height: 1.2 !important;
            }

            main > div:nth-child(3) > div:first-child > p {
              font-size: 0.9rem !important;
            }

            main > div:nth-child(3) > section > h2 {
              font-size: 1.25rem !important;
            }

            main > div:nth-child(3) > section > p {
              font-size: 0.85rem !important;
            }

            main > div:nth-child(3) > div:last-child > button {
              padding: 0.85rem 1.5rem !important;
              font-size: 0.9rem !important;
            }
          }
        `}</style>
      </main>
    </>
  );
};

const styles = {
  contactSection: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f1729 100%)',
    padding: '6rem 2rem 4rem',
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
    left: '5%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: 'orbMove1 25s ease-in-out infinite'
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: 'orbMove2 22s ease-in-out infinite'
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
    marginBottom: '5rem',
    animation: 'slideUp 0.8s ease-out'
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
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
    margin: '1rem auto 2rem',
    borderRadius: '2px'
  },
  subtitle: {
    fontSize: '1.15rem',
    color: 'rgba(255, 255, 255, 0.7)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '5rem'
  },
  infoCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    animation: 'slideUp 0.8s ease-out both'
  },
  iconWrapper: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    background: 'rgba(139, 92, 246, 0.1)'
  },
  infoLabel: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '0.5rem',
    margin: 0
  },
  infoValue: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0
  },
  socialSection: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(15px)',
    borderRadius: '24px',
    padding: '3rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'slideUp 0.8s ease-out 0.1s both'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem'
  },
  socialSubtitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '2rem'
  },
  socialLinks: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  socialLink: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  ctaSection: {
    textAlign: 'center',
    animation: 'slideUp 0.8s ease-out 0.2s both'
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '1.2rem 3rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)',
    marginTop: '2rem'
  }
};

export default Contact;