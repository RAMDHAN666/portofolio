import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  // Check if current page is a blog post detail page
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state untuk background blur effect
      setScrolled(currentScrollY > 20);
      
      // Auto-hide logic - hanya di blog post
      if (isBlogPost) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & lewat 100px -> hide
          setHidden(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up -> show
          setHidden(false);
        }
      } else {
        // Di halaman lain, navbar selalu tampil
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isBlogPost]);

  const handleScrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav style={{
        ...styles.navbar,
        ...(scrolled ? styles.navbarScrolled : {}),
        ...(hidden ? styles.navbarHidden : {})
      }}>
        <div style={styles.navbarContainer}>
          {/* Logo */}
         <div style={styles.logoContainer}>
  <div style={styles.logoWrapper}>
    <span style={styles.logoText}>بسم الله الرحمن الرحيم</span>
    <div style={styles.logoGlow}></div>
  </div>
</div>

          {/* Desktop Menu */}
          <div style={styles.desktopMenu}>
            <button 
              style={{
                ...styles.navLink,
                ...(isActive('/') ? styles.navLinkActive : {})
              }}
              onClick={() => handleScrollTo('home')}
            >
              <span style={styles.navLinkText}>Home</span>
              {isActive('/') && <div style={styles.activeIndicator}></div>}
            </button>

            <Link 
              to="/experience" 
              style={{
                ...styles.navLink,
                ...(isActive('/experience') ? styles.navLinkActive : {})
              }}
            >
              <span style={styles.navLinkText}>Experience</span>
              {isActive('/experience') && <div style={styles.activeIndicator}></div>}
            </Link>

            <Link 
              to="/blog" 
              style={{
                ...styles.navLink,
                ...(isActive('/blog') ? styles.navLinkActive : {})
              }}
            >
              <span style={styles.navLinkText}>Blog</span>
              {isActive('/blog') && <div style={styles.activeIndicator}></div>}
            </Link>

            <Link 
              to="/contact" 
              style={{
                ...styles.navLink,
                ...(isActive('/contact') ? styles.navLinkActive : {})
              }}
            >
              <span style={styles.navLinkText}>Contact</span>
              {isActive('/contact') && <div style={styles.activeIndicator}></div>}
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            style={{
              ...styles.hamburger,
              ...(menuOpen ? styles.hamburgerActive : {})
            }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span style={{...styles.hamburgerLine, ...(menuOpen ? styles.hamburgerLine1Active : {})}}></span>
            <span style={{...styles.hamburgerLine, ...(menuOpen ? styles.hamburgerLine2Active : {})}}></span>
            <span style={{...styles.hamburgerLine, ...(menuOpen ? styles.hamburgerLine3Active : {})}}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          <div style={styles.overlay} onClick={() => setMenuOpen(false)}></div>
          <div style={styles.mobileMenu}>
            <div style={styles.mobileMenuContent}>
              <button 
                style={styles.mobileNavLink}
                onClick={() => handleScrollTo('home')}
              >
                <span style={styles.mobileNavIcon}>🏠</span>
                <span style={styles.mobileNavText}>Home</span>
              </button>

              <Link 
                to="/experience" 
                style={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                <span style={styles.mobileNavIcon}>💼</span>
                <span style={styles.mobileNavText}>Experience</span>
              </Link>

              <Link 
                to="/blog" 
                style={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                <span style={styles.mobileNavIcon}>📝</span>
                <span style={styles.mobileNavText}>Blog</span>
              </Link>

              <Link 
                to="/contact" 
                style={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                <span style={styles.mobileNavIcon}>📧</span>
                <span style={styles.mobileNavText}>Contact</span>
              </Link>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '1.5rem 2rem',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(10, 10, 31, 0.7)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
    transform: 'translateY(0)'
  },
  navbarScrolled: {
    padding: '1rem 2rem',
    background: 'rgba(10, 10, 31, 0.85)',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
  },
  navbarHidden: {
    transform: 'translateY(-100%)',
    boxShadow: 'none'
  },
  navbarContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoContainer: {
  position: 'relative',
  zIndex: 1001,
  cursor: 'default'  
},
  logoWrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  logoText: {
    fontSize: '1.75rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
    position: 'relative',
    zIndex: 1
  },
  logoGlow: {
    position: 'absolute',
    inset: '-10px',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
    filter: 'blur(20px)',
    animation: 'glow-pulse 3s ease-in-out infinite',
    zIndex: 0
  },
  desktopMenu: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  navLink: {
    position: 'relative',
    padding: '0.75rem 1.5rem',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  navLinkActive: {
    color: '#8b5cf6',
    background: 'rgba(139, 92, 246, 0.1)'
  },
  navLinkText: {
    position: 'relative',
    zIndex: 1
  },
  activeIndicator: {
    position: 'absolute',
    bottom: '0.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    zIndex: 1001,
    position: 'relative'
  },
  hamburgerLine: {
    width: '28px',
    height: '3px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    borderRadius: '3px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
  },
  hamburgerLine1Active: {
    transform: 'rotate(45deg) translateY(9px)'
  },
  hamburgerLine2Active: {
    opacity: 0,
    transform: 'translateX(20px)'
  },
  hamburgerLine3Active: {
    transform: 'rotate(-45deg) translateY(-9px)'
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    zIndex: 999,
    animation: 'fade-in 0.3s ease'
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '280px',
    background: 'linear-gradient(135deg, rgba(10, 10, 31, 0.95) 0%, rgba(26, 26, 62, 0.95) 100%)',
    backdropFilter: 'blur(30px)',
    borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
    boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    animation: 'slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'none'
  },
  mobileMenuContent: {
    padding: '6rem 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  mobileNavLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    background: 'rgba(139, 92, 246, 0.05)',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid rgba(139, 92, 246, 0.1)'
  },
  mobileNavIcon: {
    fontSize: '1.5rem'
  },
  mobileNavText: {
    flex: 1
  }
};

// Media Query dengan CSS-in-JS
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 768px) {
      nav div[style*="display: flex"] > a,
      nav div[style*="display: flex"] > button {
        display: none !important;
      }
      nav button[aria-label="Toggle menu"] {
        display: flex !important;
      }
      div[style*="position: fixed"][style*="right: 0"][style*="width: 280px"] {
        display: block !important;
      }
    }
    
    nav div[style*="display: flex"] > a:hover,
    nav div[style*="display: flex"] > button:hover {
      background: rgba(139, 92, 246, 0.15) !important;
      color: #8b5cf6 !important;
      transform: translateY(-2px);
    }
    
    div[style*="mobileNavLink"]:hover {
      background: rgba(139, 92, 246, 0.15) !important;
      transform: translateX(5px);
      border-color: rgba(139, 92, 246, 0.3) !important;
    }
  `;
  document.head.appendChild(style);
}

export default Navbar;