import React from 'react';
import { FaHeart, FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FaGithub, link: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: FaLinkedin, link: 'https://www.linkedin.com/in/ramdhani-dwi-saputra-b166b1390', label: 'LinkedIn' },
    { icon: FaInstagram, link: 'https://www.instagram.com/rmdhn1ds', label: 'Instagram' },
    { icon: FaTwitter, link: 'https://x.com/1999Ramdha71358', label: 'Twitter' }
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Top Section - Social Links */}
        <div style={styles.socialSection}>
          <div style={styles.socialLinks}>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={styles.socialLink}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider}></div>

        {/* Bottom Section - Copyright */}
        <div style={styles.bottomSection}>
          <p style={styles.copyright}>
            &copy; {currentYear} <span style={styles.name}>Ramdhani Dwi Saputra</span>. All rights reserved.
          </p>
          <p style={styles.madeWith}>
            Made with <FaHeart style={styles.heartIcon} /> using React & Laravel
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* RESPONSIVE FOOTER */
        @media (max-width: 768px) {
          footer > div > div:first-child {
            margin-bottom: 1.5rem !important;
          }

          footer > div > div:first-child > div {
            gap: 1rem !important;
          }

          footer > div > div:first-child > div > a {
            width: 40px !important;
            height: 40px !important;
          }

          footer > div > div:first-child > div > a svg {
            width: 18px !important;
            height: 18px !important;
          }

          footer > div > div:last-child {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }

          footer > div > div:last-child > p {
            font-size: 0.875rem !important;
            text-align: center !important;
          }
        }

        @media (max-width: 480px) {
          footer {
            padding: 2rem 1rem !important;
          }

          footer > div > div:first-child > div {
            gap: 0.75rem !important;
          }

          footer > div > div:first-child > div > a {
            width: 36px !important;
            height: 36px !important;
          }

          footer > div > div:first-child > div > a svg {
            width: 16px !important;
            height: 16px !important;
          }

          footer > div > div:last-child > p {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0f1729 100%)',
    borderTop: '1px solid rgba(139, 92, 246, 0.2)',
    padding: '3rem 2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  socialSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  socialLinks: {
    display: 'flex',
    gap: '1.25rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  socialLink: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8b5cf6',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)',
    marginBottom: '2rem'
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
    margin: 0
  },
  name: {
    color: '#8b5cf6',
    fontWeight: '600'
  },
  madeWith: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  heartIcon: {
    color: '#ec4899',
    animation: 'pulse 1.5s ease-in-out infinite'
  }
};

export default Footer;