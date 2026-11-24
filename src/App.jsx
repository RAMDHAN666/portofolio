import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import Home from './pages/Home';
import Experience from './components/Experience';
import Blog from './components/Blog';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import DetailBlog from './components/DetailBlog';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import Preloader from './components/Preloader';
import CursorSwarm from './components/CursorSwarm';

function App() {
  // Preloader hanya tampil sekali per sesi browser
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem('preloaded')
  );

  const handleComplete = () => {
    sessionStorage.setItem('preloaded', '1');
    setLoading(false);
  };

  return (
    <Router>
      {loading && <Preloader onComplete={handleComplete} />}
      <CursorSwarm ready={!loading} />
      <Helmet>
        <title>Ramdhani Dwi Saputra | Web Developer</title>
        <meta
          name="description"
          content="Ramdhani Dwi Saputra adalah Web Developer yang berfokus pada pengembangan website dengan JavaScript dan framework modern."
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<DetailBlog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;


