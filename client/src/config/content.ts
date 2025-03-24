/**
 * Content Configuration
 * Semua konten dinamis website disimpan di sini untuk memudahkan penggantian
 */

export const aboutContent = {
  title: "About Me",
  subtitle: "Know Me Better",
  description: `
    I'm a passionate junior developer from Indonesia with a focus on creating
    beautiful, responsive web experiences. My journey in programming started 
    when I was 16, and I've been on a learning adventure ever since.
    
    I specialize in frontend development with React, but I'm also familiar with
    backend technologies like Node.js and Express. I believe in writing clean, 
    maintainable code and creating intuitive user experiences.
    
    When I'm not coding, you can find me exploring new technologies, contributing
    to open source projects, or enjoying a good cup of coffee while reading about
    the latest tech trends.
  `,
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "15+", label: "Projects Completed" },
    { value: "5+", label: "Happy Clients" }
  ]
};

export const skillsContent = [
  {
    name: "JavaScript",
    description: "Modern ES6+, React, Node.js",
    percentage: 85,
    barColor: "#F0DB4F",
    iconColor: "#F0DB4F",
    bgLight: "#FFFDF0",
    bgDark: "#2A2A1F"
  },
  {
    name: "HTML & CSS",
    description: "Semantic HTML5, CSS3, Sass, Tailwind",
    percentage: 90,
    barColor: "#E44D26",
    iconColor: "#E44D26",
    bgLight: "#FDF2F0",
    bgDark: "#2A211F"
  },
  {
    name: "React",
    description: "Hooks, Context, Redux, Next.js",
    percentage: 80,
    barColor: "#61DAFB",
    iconColor: "#61DAFB",
    bgLight: "#F0FBFF",
    bgDark: "#1F2A2A"
  },
  {
    name: "UI/UX Design",
    description: "Figma, Responsiveness, Accessibility",
    percentage: 75,
    barColor: "#FF7262",
    iconColor: "#FF7262",
    bgLight: "#FFF0F0",
    bgDark: "#2A1F1F"
  },
  {
    name: "Node.js",
    description: "Express, API Development, MongoDB",
    percentage: 70,
    barColor: "#8CC84B",
    iconColor: "#8CC84B",
    bgLight: "#F6FFF0",
    bgDark: "#212A1F"
  },
  {
    name: "Git & GitHub",
    description: "Version Control, Collaboration",
    percentage: 85,
    barColor: "#F05032",
    iconColor: "#F05032",
    bgLight: "#FDF2F0",
    bgDark: "#2A211F"
  }
];

export const projectsContent = [
  {
    id: 1,
    title: "Modern Portfolio Website",
    description: "A responsive portfolio website with smooth animations and modern design.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    technologies: ["React", "TailwindCSS", "Framer Motion"],
    liveUrl: "https://example.com/portfolio",
    codeUrl: "https://github.com/aka/portfolio",
    tag: "Frontend",
    tagColor: "bg-blue-500"
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "Admin dashboard for e-commerce with analytics and inventory management.",
    image: "https://images.unsplash.com/photo-1553064821-0fcc1658d725?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://example.com/dashboard",
    codeUrl: "https://github.com/aka/dashboard",
    tag: "Fullstack",
    tagColor: "bg-purple-500"
  },
  {
    id: 3,
    title: "Weather App",
    description: "Real-time weather app with location detection and 5-day forecast.",
    image: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    technologies: ["JavaScript", "Weather API", "CSS"],
    liveUrl: "https://example.com/weather",
    codeUrl: "https://github.com/aka/weather",
    tag: "API",
    tagColor: "bg-green-500"
  },
  {
    id: 4,
    title: "Task Manager",
    description: "Productivity app for managing tasks with drag-and-drop functionality.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    technologies: ["React", "Redux", "Firebase"],
    liveUrl: "https://example.com/tasks",
    codeUrl: "https://github.com/aka/tasks",
    tag: "Frontend",
    tagColor: "bg-blue-500"
  },
  {
    id: 5,
    title: "Recipe Finder",
    description: "Search for recipes based on ingredients you have at home.",
    image: "https://images.unsplash.com/photo-1505253716415-361ecfef3344?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    technologies: ["React", "Food API", "TailwindCSS"],
    liveUrl: "https://example.com/recipes",
    codeUrl: "https://github.com/aka/recipes",
    tag: "API",
    tagColor: "bg-green-500"
  }
];

export const friendsContent = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    description: "Collaborator on multiple projects. Amazing eye for design.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    social: {
      github: "https://github.com/sarahj",
      tiktok: "https://tiktok.com/@sarahj"
    }
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Backend Developer",
    description: "MongoDB wizard. We built an e-commerce platform together.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    social: {
      github: "https://github.com/alexc"
    }
  },
  {
    id: 3,
    name: "Mia Rodriguez",
    role: "Mobile Developer",
    description: "Helped me understand React Native. Great teacher.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    social: {
      github: "https://github.com/miar",
      tiktok: "https://tiktok.com/@miar"
    }
  },
  {
    id: 4,
    name: "Daniel Kim",
    role: "Frontend Developer",
    description: "Animation specialist. Taught me a lot about Framer Motion.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    social: {
      github: "https://github.com/danielk"
    }
  }
];

// Social Media Links
export const socialLinks = {
  github: "https://github.com/aka",
  linkedin: "https://linkedin.com/in/aka",
  twitter: "https://twitter.com/aka",
  instagram: "https://instagram.com/aka",
  tiktok: "https://tiktok.com/@aka"
};