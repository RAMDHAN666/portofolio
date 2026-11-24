const blog2 = {
  id: '2',
  title: '5 Tips Optimasi Performa Laravel untuk Website Lebih Cepat',
  author: 'Ramdhani Dwi Saputra',
  email: 'ramdhani@gmail.com',
  date: '2025-01-10',
  content: `
    <h2>Pendahuluan</h2>
    <p>Performa website adalah faktor krusial untuk user experience dan SEO. Website yang lambat akan membuat user frustrated dan meninggalkan situs kamu.</p>
    
    <h2>1. Implement Caching Strategy</h2>
    <p>Caching adalah cara terbaik untuk meningkatkan performa. Laravel mendukung berbagai cache driver.</p>
    <ul>
      <li>Use Redis untuk cache yang lebih cepat</li>
      <li>Cache query results yang heavy</li>
      <li>Implement HTTP caching headers</li>
      <li>Use eager loading untuk relations</li>
    </ul>
    
    <h2>2. Database Indexing</h2>
    <p>Pastikan kolom yang sering di-query sudah di-index dengan benar. Indexing bisa meningkatkan query performance hingga 10x lebih cepat.</p>
    
    <h2>3. Query Optimization</h2>
    <p>Hindari N+1 query problem dengan menggunakan eager loading atau select spesifik columns. Use explain() untuk analyze query performance.</p>
    
    <h2>4. Lazy Loading Assets</h2>
    <p>Load images dan assets hanya saat dibutuhkan untuk mengurangi initial load time. Ini bisa mengurangi bandwidth usage hingga 50%.</p>
    
    <h2>5. CDN Integration</h2>
    <p>Gunakan CDN seperti Cloudflare untuk serve static assets lebih cepat dari berbagai lokasi geografis.</p>
    
    <h2>Kesimpulan</h2>
    <p>Dengan menerapkan tips di atas, performa website Laravel kamu akan meningkat signifikan dan user akan merasakan pengalaman yang jauh lebih baik.</p>
  `
};

export default blog2;