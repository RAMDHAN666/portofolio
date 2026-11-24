import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaClock, FaUser, FaTag } from 'react-icons/fa';
import Navbar from './Navbar';
import SEO from './SEO';

export default function ModernBlog({ blogData }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [particles, setParticles] = useState([]);

  const defaultBlogs = [
    {
      id: '1',
      title: "Cara Deploy React App ke Production: Panduan Lengkap 2025",
      excerpt: "Pelajari langkah-langkah deploy aplikasi React ke production dengan Vercel, Netlify, dan GitHub Pages. Termasuk tips optimasi performa dan best practices.",
      author: "Ramdhani Dwi Saputra",
      date: "2025-01-15"
    },
    {
      id: '2',
      title: "5 Tips Optimasi Performa Laravel untuk Website Lebih Cepat",
      excerpt: "Tingkatkan kecepatan website Laravel kamu dengan caching, database indexing, query optimization, dan lazy loading. Proven methods yang langsung bisa diterapkan!",
      author: "Ramdhani Dwi Saputra",
      date: "2025-01-10"
    },
    {
      id: '3',
      title: "Membangun REST API dengan Laravel: Best Practices 2025",
      excerpt: "Tutorial lengkap membuat RESTful API dengan Laravel 10. Dari setup project, authentication, validation, hingga documentation dengan Swagger.",
      author: "Ramdhani Dwi Saputra",
      date: "2025-01-05"
    },
    {
      id: '4',
      title: "PHP vs JavaScript: Kapan Harus Pakai Yang Mana?",
      excerpt: "Perbandingan mendalam antara PHP dan JavaScript untuk web development. Pelajari kelebihan, kekurangan, dan use case terbaik untuk masing-masing bahasa.",
      author: "Ramdhani Dwi Saputra",
      date: "2024-12-28"
    },
    {
      id: '5',
      title: "From Zero to Hero: Perjalanan Saya Belajar Web Development",
      excerpt: "Cerita personal tentang perjalanan belajar web development dari nol. Mulai dari HTML/CSS pertama kali, hingga mahir Laravel dan React. Termasuk tips untuk pemula!",
      author: "Ramdhani Dwi Saputra",
      date: "2024-12-20"
    },
    {
      id: '6',
      title: "10 Error Umum di Laravel dan Cara Mengatasinya",
      excerpt: "Daftar error yang sering ditemui developer Laravel pemula beserta solusinya. Dari migration error, routing issues, hingga authentication problems.",
      author: "Ramdhani Dwi Saputra",
      date: "2024-12-15"
    }
  ];

  const blogs = blogData && blogData.length > 0 ? blogData : defaultBlogs;

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 25; i++) {
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

  return (
    <>
      <SEO
        title="Blog | Ramdhani Dwi Saputra"
        description="Artikel dan tulisan tentang teknologi, web development, tips coding, dan pengalaman di dunia programming."
        url="/blog"
        keywords="blog teknologi, artikel web development, tips coding, Laravel, React, PHP"
      />
      <Navbar />

      <main style={styles.blogSection}>
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
                background: 'rgba(139, 92, 246, 0.4)',
                borderRadius: '50%',
                pointerEvents: 'none',
                animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`
              }}
            />
          ))}
        </div>

        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.mainTitle}>
              My <span style={styles.titleHighlight}>Blog</span>
            </h1>
            <div style={styles.titleUnderline}></div>
            <p style={styles.subtitle}>
              Berbagi pengetahuan, pengalaman, dan insight tentang teknologi & programming
            </p>
          </div>

          <section style={styles.blogGrid}>
            {blogs.map((blog, index) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                style={{
                  ...styles.blogCard,
                  animationDelay: `${index * 0.15}s`,
                  transform: hoveredIndex === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  textDecoration: 'none'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  style={{
                    ...styles.cardGlow,
                    opacity: hoveredIndex === index ? 0.3 : 0
                  }}
                ></div>

                <div style={styles.categoryBadge}>
                  <FaTag size={12} />
                  <span>Tech Article</span>
                </div>

                <article style={styles.cardContent}>
                  <h2 style={styles.blogTitle}>{blog.title}</h2>
                  <p style={styles.blogExcerpt}>{blog.excerpt}</p>

                  <div style={styles.blogMeta}>
                    <div style={styles.metaItem}>
                      <FaClock size={14} style={styles.metaIcon} />
                      <time dateTime={blog.date}>{blog.date}</time>
                    </div>
                    <div style={styles.metaItem}>
                      <FaUser size={14} style={styles.metaIcon} />
                      <span>{blog.author || 'Ramdhani Dwi Saputra'}</span>
                    </div>
                  </div>

                  <div style={styles.readMoreContainer}>
                    <span style={styles.readMoreText}>Baca Selengkapnya</span>
                    <FaArrowRight 
                      style={{
                        ...styles.readMoreIcon,
                        transform: hoveredIndex === index ? 'translateX(5px)' : 'translateX(0)'
                      }} 
                    />
                  </div>
                </article>
              </Link>
            ))}
          </section>

          {blogs.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📝</div>
              <h3 style={styles.emptyTitle}>Belum Ada Artikel</h3>
              <p style={styles.emptyText}>Artikel blog akan segera hadir!</p>
            </div>
          )}
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

          /* RESPONSIVE BLOG */
          @media (max-width: 1024px) {
            main > div:nth-child(3) > section {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 2rem !important;
            }
          }

          @media (max-width: 768px) {
            main {
              padding: 4rem 1.5rem !important;
            }

            h1 {
              font-size: 2.75rem !important;
            }

            main > div:nth-child(3) > div:first-child > p {
              font-size: 1.05rem !important;
              padding: 0 1rem !important;
            }

            main > div:nth-child(3) > section > a {
              padding: 1.5rem !important;
            }

            main > div:nth-child(3) > section > a > article > h2 {
              font-size: 1.35rem !important;
            }

            main > div:nth-child(3) > section > a > article > p {
              font-size: 0.95rem !important;
            }
          }

          @media (max-width: 640px) {
            main {
              padding: 3rem 1rem !important;
            }

            h1 {
              font-size: 2.25rem !important;
            }

            main > div:nth-child(3) > div:first-child {
              margin-bottom: 3rem !important;
            }

            main > div:nth-child(3) > div:first-child > div {
              width: 80px !important;
            }

            main > div:nth-child(3) > div:first-child > p {
              font-size: 1rem !important;
            }

            main > div:nth-child(3) > section {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }

            main > div:nth-child(3) > section > a {
              padding: 1.25rem !important;
              border-radius: 20px !important;
            }

            main > div:nth-child(3) > section > a > div:first-child {
              padding: 0.4rem 0.85rem !important;
              font-size: 0.8rem !important;
              margin-bottom: 1.25rem !important;
            }

            main > div:nth-child(3) > section > a > div:first-child svg {
              width: 10px !important;
              height: 10px !important;
            }

            main > div:nth-child(3) > section > a > article > h2 {
              font-size: 1.2rem !important;
              line-height: 1.4 !important;
              margin-bottom: 0.75rem !important;
            }

            main > div:nth-child(3) > section > a > article > p {
              font-size: 0.9rem !important;
              line-height: 1.6 !important;
              margin-bottom: 1.25rem !important;
              -webkit-line-clamp: 2 !important;
            }

            main > div:nth-child(3) > section > a > article > div:nth-child(3) {
              gap: 1rem !important;
              margin-bottom: 1.25rem !important;
              padding-top: 0.75rem !important;
            }

            main > div:nth-child(3) > section > a > article > div:nth-child(3) > div {
              font-size: 0.8rem !important;
              gap: 0.4rem !important;
            }

            main > div:nth-child(3) > section > a > article > div:nth-child(3) > div svg {
              width: 12px !important;
              height: 12px !important;
            }

            main > div:nth-child(3) > section > a > article > div:last-child {
              font-size: 0.9rem !important;
            }

            main > div:nth-child(3) > section > a > article > div:last-child svg {
              width: 14px !important;
              height: 14px !important;
            }
          }

          @media (max-width: 480px) {
            h1 {
              font-size: 1.9rem !important;
              line-height: 1.2 !important;
            }

            main > div:nth-child(3) > div:first-child > p {
              font-size: 0.95rem !important;
            }

            main > div:nth-child(3) > section > a > article > h2 {
              font-size: 1.1rem !important;
            }

            main > div:nth-child(3) > section > a > article > p {
              font-size: 0.85rem !important;
            }

            main > div:nth-child(3) > section > a > article > div:nth-child(3) > div {
              font-size: 0.75rem !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}

const styles = {
  blogSection: {
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
    maxWidth: '1400px',
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
    fontWeight: '400',
    maxWidth: '600px',
    margin: '0 auto'
  },
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2.5rem'
  },
  blogCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    animation: 'fadeInUp 0.7s ease-out both',
    display: 'block'
  },
  cardGlow: {
    position: 'absolute',
    inset: '-3px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    borderRadius: '24px',
    filter: 'blur(25px)',
    transition: 'opacity 0.4s ease',
    zIndex: -1
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(139, 92, 246, 0.2)',
    color: '#8b5cf6',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    marginBottom: '1.5rem'
  },
  cardContent: {
    position: 'relative'
  },
  blogTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem',
    lineHeight: '1.3'
  },
  blogExcerpt: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '1.5rem',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  blogMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },
  metaIcon: {
    color: '#8b5cf6'
  },
  readMoreContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: '1rem'
  },
  readMoreText: {
    fontSize: '1rem'
  },
  readMoreIcon: {
    transition: 'transform 0.3s ease'
  },
  emptyState: {
    textAlign: 'center',
    padding: '5rem 2rem'
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