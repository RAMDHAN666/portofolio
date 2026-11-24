import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import SEO from './SEO';
import blogList from '../data/blogList';
import '../styles/DetailBlog.css';

export default function DetailBlog() {
  const { id } = useParams();
  const currentBlog = blogList.find(blog => blog.id === id);

  if (!currentBlog) {
    return (
      <>
        <Navbar />
        <div className="blog-container">
          <h1>Blog tidak ditemukan</h1>
          <Link to="/blog">Kembali ke Blog</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={currentBlog.title}
        description={currentBlog.excerpt || currentBlog.title}
        url={`/blog/${id}`}
        image={currentBlog.image || '/og-image.jpg'}
      />
      <Navbar />
      <div className="blog-container">
        <article className="blog-article">
          <header>
            <h1>{currentBlog.title}</h1>
            <div className="blog-meta">
              <p>Penulis: {currentBlog.author}</p>
              <p>Tanggal: {currentBlog.date}</p>
            </div>
          </header>
          <section
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: currentBlog.content }}
          />
          <footer>
            <Link to="/blog" className="back-link">← Lihat Blog Lainnya</Link>
          </footer>
        </article>
      </div>
    </>
  );
}