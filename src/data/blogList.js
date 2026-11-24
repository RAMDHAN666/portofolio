const blogList = [
  {
    id: '1',
    title: 'Cara Deploy React App ke Production: Panduan Lengkap 2025',
    excerpt: 'Pelajari langkah-langkah deploy aplikasi React ke production dengan Vercel, Netlify, dan GitHub Pages. Termasuk tips optimasi performa dan best practices.',
    author: 'Ramdhani Dwi Saputra',
    date: '2025-01-15',
    content: `
      <h2>Pendahuluan</h2>
      <p>Deploy aplikasi React ke production adalah langkah penting dalam development lifecycle. Ada beberapa pilihan platform yang bisa kamu gunakan, masing-masing dengan kelebihan dan kekurangan tersendiri.</p>
      
      <h2>1. Deploy dengan Vercel</h2>
      <p>Vercel adalah platform yang dibuat oleh kreator Next.js dan sangat optimal untuk React apps. Proses deploynya sangat mudah dan cepat.</p>
      <ul>
        <li>Koneksi langsung dengan GitHub</li>
        <li>Automatic CI/CD</li>
        <li>Preview deployment sebelum go live</li>
        <li>Unlimited static sites di free tier</li>
      </ul>
      
      <h2>2. Deploy dengan Netlify</h2>
      <p>Netlify juga merupakan pilihan populer untuk deploy React apps. Interface-nya user-friendly dan proses deploy sangat straightforward.</p>
      <ul>
        <li>Drag and drop deployment</li>
        <li>Build plugins untuk optimization</li>
        <li>Netlify Functions untuk serverless</li>
        <li>Form handling built-in</li>
      </ul>
      
      <h2>3. Deploy dengan GitHub Pages</h2>
      <p>Jika kamu ingin solusi gratis dan sederhana, GitHub Pages adalah pilihan yang baik untuk static sites.</p>
      
      <h2>Tips Optimasi Performa</h2>
      <p>Sebelum deploy, pastikan kamu sudah melakukan optimasi performa:</p>
      <ul>
        <li>Code splitting dengan React.lazy()</li>
        <li>Minify dan compress bundle</li>
        <li>Optimize images</li>
        <li>Remove unused dependencies</li>
        <li>Enable gzip compression</li>
      </ul>
      
      <h2>Kesimpulan</h2>
      <p>Pilih platform deploy yang sesuai dengan kebutuhan kamu. Untuk kebanyakan kasus, Vercel atau Netlify adalah pilihan terbaik karena kemudahan dan fitur yang lengkap.</p>
    `
  },
  {
    id: '2',
    title: '5 Tips Optimasi Performa Laravel untuk Website Lebih Cepat',
    excerpt: 'Tingkatkan kecepatan website Laravel kamu dengan caching, database indexing, query optimization, dan lazy loading. Proven methods yang langsung bisa diterapkan!',
    author: 'Ramdhani Dwi Saputra',
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
      <p>Pastikan kolom yang sering di-query sudah di-index dengan benar.</p>
      
      <h2>3. Query Optimization</h2>
      <p>Hindari N+1 query problem dengan menggunakan eager loading atau select spesifik columns.</p>
      
      <h2>4. Lazy Loading Assets</h2>
      <p>Load images dan assets hanya saat dibutuhkan untuk mengurangi initial load time.</p>
      
      <h2>5. CDN Integration</h2>
      <p>Gunakan CDN seperti Cloudflare untuk serve static assets lebih cepat dari berbagai lokasi.</p>
      
      <h2>Kesimpulan</h2>
      <p>Dengan menerapkan tips di atas, performa website Laravel kamu akan meningkat signifikan.</p>
    `
  },
  {
    id: '3',
    title: 'Membangun REST API dengan Laravel: Best Practices 2025',
    excerpt: 'Tutorial lengkap membuat RESTful API dengan Laravel 10. Dari setup project, authentication, validation, hingga documentation dengan Swagger.',
    author: 'Ramdhani Dwi Saputra',
    date: '2025-01-05',
    content: `
      <h2>Pendahuluan</h2>
      <p>REST API adalah fondasi dari modern web development. Tutorial ini akan memandu kamu membuat REST API yang production-ready dengan Laravel 10.</p>
      
      <h2>Setup Project</h2>
      <p>Mulai dengan membuat project Laravel baru dan setup database.</p>
      
      <h2>Authentication</h2>
      <p>Implementasikan authentication menggunakan Sanctum atau Passport untuk API.</p>
      <ul>
        <li>Use JWT tokens untuk stateless authentication</li>
        <li>Implement refresh token mechanism</li>
        <li>Secure your endpoints dengan middleware</li>
      </ul>
      
      <h2>Validation</h2>
      <p>Validasi semua input dari client untuk mencegah bugs dan security issues.</p>
      
      <h2>Documentation dengan Swagger</h2>
      <p>Generate API documentation secara otomatis dengan Swagger/OpenAPI untuk memudahkan frontend team.</p>
      
      <h2>Error Handling</h2>
      <p>Implementasikan error handling yang proper untuk memberikan response yang meaningful ke client.</p>
      
      <h2>Kesimpulan</h2>
      <p>Dengan mengikuti best practices, kamu bisa membuat API yang robust dan maintainable.</p>
    `
  },
  {
    id: '4',
    title: 'PHP vs JavaScript: Kapan Harus Pakai Yang Mana?',
    excerpt: 'Perbandingan mendalam antara PHP dan JavaScript untuk web development. Pelajari kelebihan, kekurangan, dan use case terbaik untuk masing-masing bahasa.',
    author: 'Ramdhani Dwi Saputra',
    date: '2024-12-28',
    content: `
      <h2>Pendahuluan</h2>
      <p>PHP dan JavaScript adalah dua bahasa programming yang paling populer untuk web development. Masing-masing memiliki use case dan keunggulannya sendiri.</p>
      
      <h2>PHP - Server Side Language</h2>
      <p>PHP adalah bahasa backend yang powerful dan telah terbukti.</p>
      <ul>
        <li>Server-side rendering</li>
        <li>Database integration yang mudah</li>
        <li>Banyak framework (Laravel, Symfony, CodeIgniter)</li>
        <li>Learning curve yang gentle</li>
      </ul>
      
      <h2>JavaScript - Client & Server Side</h2>
      <p>JavaScript bisa digunakan di client maupun server (Node.js).</p>
      <ul>
        <li>Real-time interactivity</li>
        <li>Single language untuk fullstack</li>
        <li>Rich ecosystem dengan npm</li>
        <li>Great frameworks (React, Vue, Express)</li>
      </ul>
      
      <h2>Kapan Pakai PHP?</h2>
      <ul>
        <li>Traditional web applications</li>
        <li>Content management systems</li>
        <li>Server-side rendering yang heavy</li>
        <li>Team yang already familiar dengan PHP</li>
      </ul>
      
      <h2>Kapan Pakai JavaScript?</h2>
      <ul>
        <li>Modern SPAs (Single Page Applications)</li>
        <li>Real-time applications</li>
        <li>Fullstack dengan Node.js</li>
        <li>Progressive Web Apps</li>
      </ul>
      
      <h2>Kesimpulan</h2>
      <p>Tidak ada yang "lebih baik" secara absolut. Pilih sesuai dengan kebutuhan project dan expertise team kamu.</p>
    `
  },
  {
    id: '5',
    title: 'From Zero to Hero: Perjalanan Saya Belajar Web Development',
    excerpt: 'Cerita personal tentang perjalanan belajar web development dari nol. Mulai dari HTML/CSS pertama kali, hingga mahir Laravel dan React. Termasuk tips untuk pemula!',
    author: 'Ramdhani Dwi Saputra',
    date: '2024-12-20',
    content: `
      <h2>Awal Mula</h2>
      <p>Perjalanan saya belajar web development dimulai dari ketertarikan yang sederhana terhadap teknologi. Saya memulai dengan mempelajari HTML dan CSS melalui tutorial online.</p>
      
      <h2>Fase 1: Frontend Dasar (HTML, CSS, JavaScript)</h2>
      <p>Saya menghabiskan beberapa bulan untuk memahami fundamentals frontend development. Membuat berbagai project sederhana seperti landing page dan to-do app.</p>
      
      <h2>Fase 2: Backend dengan PHP & Laravel</h2>
      <p>Setelah cukup mahir frontend, saya beralih ke backend. Laravel menjadi pilihan karena documentasinya yang bagus dan community yang supportive.</p>
      
      <h2>Fase 3: Modern Frontend dengan React</h2>
      <p>Menyadari bahwa frontend development berkembang pesat, saya mulai mempelajari React. Awalnya membingungkan, tapi dengan konsisten akhirnya paham.</p>
      
      <h2>Tips untuk Pemula</h2>
      <ul>
        <li>Fokus pada fundamentals terlebih dahulu</li>
        <li>Build projects, jangan hanya menonton tutorial</li>
        <li>Join komunitas dan berbagi knowledge</li>
        <li>Konsisten dan jangan menyerah</li>
        <li>Learn by doing, bukan hanya reading</li>
      </ul>
      
      <h2>Kesimpulan</h2>
      <p>Perjalanan dari zero ke hero memang membutuhkan waktu dan dedikasi. Tapi dengan konsisten dan passionate, semua bisa dicapai.</p>
    `
  },
  {
    id: '6',
    title: '10 Error Umum di Laravel dan Cara Mengatasinya',
    excerpt: 'Daftar error yang sering ditemui developer Laravel pemula beserta solusinya. Dari migration error, routing issues, hingga authentication problems.',
    author: 'Ramdhani Dwi Saputra',
    date: '2024-12-15',
    content: `
      <h2>Pendahuluan</h2>
      <p>Saat belajar Laravel, kamu akan menghadapi berbagai error. Mengerti dan tahu cara mengatasinya adalah skill penting untuk developer.</p>
      
      <h2>1. Migration Errors</h2>
      <p>Error saat jalankan migration biasanya karena syntax salah atau constraints yang conflict.</p>
      <ul>
        <li>Check foreign keys</li>
        <li>Pastikan table sudah exist sebelum reference</li>
        <li>Use proper data types</li>
      </ul>
      
      <h2>2. Routing Not Found (404)</h2>
      <p>Error 404 biasanya karena route belum di-define atau method HTTP salah.</p>
      
      <h2>3. Authentication Issues</h2>
      <p>Problem dengan login biasanya karena configuration salah atau password hashing tidak match.</p>
      
      <h2>4. CSRF Token Mismatch</h2>
      <p>Error ini muncul saat CSRF token tidak di-include di form atau expired.</p>
      
      <h2>5. Class Not Found</h2>
      <p>Pastikan namespace benar dan sudah di-import dengan proper.</p>
      
      <h2>6. Method Not Allowed</h2>
      <p>Biasanya karena HTTP method tidak sesuai atau middleware issue.</p>
      
      <h2>7. Database Connection Error</h2>
      <p>Check konfigurasi database di .env file.</p>
      
      <h2>8. View File Not Found</h2>
      <p>Pastikan nama file sesuai dan path benar di function view().</p>
      
      <h2>9. Validation Errors</h2>
      <p>Implement proper error handling untuk display validation messages ke user.</p>
      
      <h2>10. Dependency Injection Issues</h2>
      <p>Pastikan type hint benar dan service provider sudah di-register.</p>
      
      <h2>Kesimpulan</h2>
      <p>Error adalah bagian natural dari development. Dengan pengalaman, kamu akan lebih cepat identify dan fix masalahnya.</p>
    `
  }
];

export default blogList;