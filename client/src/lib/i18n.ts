import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  navigation: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    friends: 'Friends',
    contact: 'Contact'
  },
  hero: {
    welcome: 'Welcome to my portfolio',
    greeting: 'Hey there!',
    role1: "I'm Aka",
    role2: "I'm a junior developer",
    intro: "I am a junior developer and a junior high school student from Indonesia. I'm passionate about creating digital experiences that make a difference.",
    discover: 'Discover More',
    contact: 'Get In Touch',
    visitors: 'visitors',
  },
  about: {
    title: 'About Me',
    subtitle: 'Get to know me',
    intro: "Hi, I'm",
    content1: "I am a junior developer and a junior high school student from West Sumatra, Indonesia. At just 15 years old, I'm already exploring the fascinating world of programming.",
    content2: "I really enjoy experimenting with code and creating new things. My journey in programming is just beginning, but I'm determined to learn and grow every day.",
    content3: "My ultimate goal? To become a successful person and make my parents proud.",
    experience: 'Experience',
    experienceTime: '1+ Year',
    name: 'Name:',
    from: 'From:',
    age: 'Age:',
    status: 'Status:',
    quote: "\"Live a good life, and never forget to obey and worship Allah SWT.\""
  },
  skills: {
    title: 'My Skills',
    subtitle: 'What I Know'
  },
  projects: {
    title: 'Recent Projects',
    subtitle: 'My Work',
    liveDemo: 'Live Demo',
    sourceCode: 'Source Code',
    comingSoon: 'Coming Soon'
  },
  friends: {
    title: 'Friends & Colleagues',
    subtitle: 'My Network'
  },
  contact: {
    title: 'Contact Me',
    subtitle: 'Get In Touch',
    formTitle: 'Send Me A Message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    infoTitle: 'Contact Information',
    infoContent: "Feel free to reach out to me! I'm always open to discussing new projects, creative ideas or opportunities to contribute to your vision.",
    location: 'Location',
    phone: 'Phone',
    followTitle: 'Follow Me'
  },
  footer: {
    rights: 'All rights reserved.',
    createdWith: 'Created with ❤️ and code'
  },
  system: {
    loading: 'Loading'
  }
};

// Indonesian translations
const idTranslations = {
  navigation: {
    home: 'Beranda',
    about: 'Tentang',
    skills: 'Keahlian',
    projects: 'Proyek',
    friends: 'Teman',
    contact: 'Kontak'
  },
  hero: {
    welcome: 'Selamat datang di portofolio saya',
    greeting: 'Hai!',
    role1: "Saya Aka",
    role2: "Saya junior developer",
    intro: "Saya adalah junior developer dan siswa SMP dari Indonesia. Saya bersemangat dalam menciptakan pengalaman digital yang membuat perbedaan.",
    discover: 'Pelajari Lebih',
    contact: 'Hubungi Saya',
    visitors: 'pengunjung',
  },
  about: {
    title: 'Tentang Saya',
    subtitle: 'Kenali saya',
    intro: "Hai, Saya",
    content1: "Saya adalah junior developer dan siswa SMP dari Sumatera Barat, Indonesia. Di usia 15 tahun, saya sudah menjelajahi dunia pemrograman yang menarik.",
    content2: "Saya sangat menikmati bereksperimen dengan kode dan menciptakan hal-hal baru. Perjalanan saya dalam pemrograman baru dimulai, tapi saya bertekad untuk belajar dan berkembang setiap hari.",
    content3: "Tujuan akhir saya? Menjadi orang sukses dan membuat orang tua saya bangga.",
    experience: 'Pengalaman',
    experienceTime: '1+ Tahun',
    name: 'Nama:',
    from: 'Dari:',
    age: 'Usia:',
    status: 'Status:',
    quote: "\"Jalani hidup dengan baik, dan jangan lupa untuk taat dan beribadah kepada Allah SWT.\""
  },
  skills: {
    title: 'Keahlian Saya',
    subtitle: 'Yang Saya Kuasai'
  },
  projects: {
    title: 'Proyek Terbaru',
    subtitle: 'Karya Saya',
    liveDemo: 'Demo Langsung',
    sourceCode: 'Kode Sumber',
    comingSoon: 'Segera Hadir'
  },
  friends: {
    title: 'Teman & Kolega',
    subtitle: 'Jaringan Saya'
  },
  contact: {
    title: 'Hubungi Saya',
    subtitle: 'Tetap Terhubung',
    formTitle: 'Kirim Pesan',
    name: 'Nama',
    email: 'Email',
    subject: 'Subjek',
    message: 'Pesan',
    send: 'Kirim Pesan',
    infoTitle: 'Informasi Kontak',
    infoContent: "Jangan ragu untuk menghubungi saya! Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif atau kesempatan untuk berkontribusi pada visi Anda.",
    location: 'Lokasi',
    phone: 'Telepon',
    followTitle: 'Ikuti Saya'
  },
  footer: {
    rights: 'Hak cipta dilindungi.',
    createdWith: 'Dibuat dengan ❤️ dan kode'
  },
  system: {
    loading: 'Memuat'
  }
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    id: { translation: idTranslations }
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // React already safes from XSS
  }
});

export default i18n;
