const blog1 = {
  id: '1',
  title: 'Cara Deploy React App ke Production: Panduan Lengkap 2025',
  author: 'Ramdhani Dwi Saputra',
  email: 'ramdhani@gmail.com',
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
};

export default blog1;