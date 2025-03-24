/**
 * Site Configuration
 * Semua pengaturan utama website ada di sini, mudah untuk diubah
 */

export const siteConfig = {
  // Informasi Dasar
  name: "Aka",
  title: "Junior Developer Portfolio",
  description: "A showcase of projects and skills from a young developer based in Indonesia.",
  
  // Pengaturan Warna
  colors: {
    primary: "#D4AF37", // Gold
    secondary: "#121212", // Dark
    accent: "#F5DEB3", // Light Gold
    text: {
      light: "#333333",
      dark: "#EFEFEF"
    }
  },
  
  // Informasi Kontak
  contact: {
    email: "aka@example.com",
    phone: "+62 123 4567 890",
    location: "Jakarta, Indonesia",
    github: "https://github.com/aka",
    linkedin: "https://linkedin.com/in/aka",
    twitter: "https://twitter.com/aka",
  },
  
  // Menu Navigasi
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Friends", href: "#friends" },
    { label: "Contact", href: "#contact" }
  ],
  
  // Credential Admin (aman di sini karena ini client-side auth sederhana)
  admin: {
    username: "admin",
    password: "AkaAdminPass123"
  },
  
  // Pengaturan Musik
  backgroundMusic: {
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0fd54c13d.mp3?filename=lofi-study-112191.mp3",
    autoplay: false,
    volume: 0.3
  },
  
  // Meta Tag Sosial
  metaTags: {
    ogImage: "/og-image.jpg",
    twitterHandle: "@aka",
  },
  
  // Default Theme
  defaultTheme: "dark", // 'light' atau 'dark'
  
  // Default Language
  defaultLanguage: "en", // 'en' atau 'id'
};

// Teks untuk i18n (Internasionalisasi)
export const translations = {
  en: {
    heroTitle: "Hi, I'm Aka",
    heroSubtitle: "Junior Developer",
    heroDescription: "Passionate about creating beautiful and functional web experiences",
    aboutTitle: "About Me",
    aboutDescription: "Junior developer with a passion for creating innovative digital solutions. I specialize in front-end development and enjoy bringing designs to life with clean, efficient code.",
    skillsTitle: "My Skills",
    projectsTitle: "Projects",
    friendsTitle: "Friends",
    contactTitle: "Get In Touch",
    contactFormName: "Your Name",
    contactFormEmail: "Your Email",
    contactFormMessage: "Your Message",
    contactFormSubmit: "Send Message",
    footerCopyright: "© 2025 Aka. All rights reserved.",
  },
  id: {
    heroTitle: "Halo, Saya Aka",
    heroSubtitle: "Junior Developer",
    heroDescription: "Bersemangat dalam menciptakan pengalaman web yang indah dan fungsional",
    aboutTitle: "Tentang Saya",
    aboutDescription: "Developer junior dengan hasrat untuk menciptakan solusi digital yang inovatif. Saya mengkhususkan diri dalam pengembangan front-end dan senang menghidupkan desain dengan kode yang bersih dan efisien.",
    skillsTitle: "Keahlian Saya",
    projectsTitle: "Proyek",
    friendsTitle: "Teman",
    contactTitle: "Hubungi Saya",
    contactFormName: "Nama Anda",
    contactFormEmail: "Email Anda",
    contactFormMessage: "Pesan Anda",
    contactFormSubmit: "Kirim Pesan",
    footerCopyright: "© 2025 Aka. Semua hak dilindungi.",
  }
};