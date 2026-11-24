import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Ramdhani Dwi Saputra | Web Developer',
  description = 'Ramdhani Dwi Saputra adalah Web Developer yang berfokus pada pengembangan website dengan Laravel, PHP, React, dan framework modern.',
  keywords = 'Ramdhani Dwi Saputra, web developer, Laravel, PHP, React, portfolio, fullstack developer, frontend',
  image = '/foto-kartu.jpg',
  url = '/',
  robots = 'index, follow'
}) => {
  const baseUrl = 'https://www.ramdhanidwisaputra.my.id'; // Ganti dengan domain kamu
  const fullUrl = `${baseUrl}${url}`;
  const fullImage = `${baseUrl}${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Ramdhani Dwi Saputra",
        "url": baseUrl,
        "image": `${baseUrl}/profil.jpeg`,
        "sameAs": [
          "https://www.instagram.com/rmdhn1ds",
          "https://www.facebook.com/share/1BhUxMuBez/",
          "https://wa.me/6287840046010"
        ],
        "jobTitle": "Web Developer",
        "description": "Ramdhani Dwi Saputra adalah Web Developer yang berfokus pada pengembangan website dengan Laravel, PHP, React, dan framework modern.",
        "knowsAbout": ["Laravel", "PHP", "React", "JavaScript", "Kotlin", "Dart", "C++", "MySQL"],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "STMIK Mardira Indonesia"
        }
      },
      {
        "@type": "WebSite",
        "name": "Ramdhani Dwi Saputra | Web Developer",
        "url": baseUrl,
        "inLanguage": "id",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "name": title,
        "url": fullUrl,
        "description": description,
        "inLanguage": "id"
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Ramdhani Dwi Saputra" />
      <meta name="robots" content={robots} />
      <meta httpEquiv="Content-Language" content="id" />
      <meta name="theme-color" content="#1a1a2e" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Ramdhani Dwi Saputra" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@rmdhn1ds" />
      <meta name="twitter:creator" content="@rmdhn1ds" />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;