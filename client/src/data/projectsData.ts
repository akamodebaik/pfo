export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  codeUrl: string;
  tag: string;
  tagColor: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio",
    description: "A responsive portfolio website built with modern web technologies.",
    image: "https://nauval.mycdn.biz.id/download/1742031297812.jpeg",
    technologies: ["HTML", "CSS", "TypeScript"],
    liveUrl: "sonkanz.my.id",
    codeUrl: "#",
    tag: "Portfolio",
    tagColor: "bg-gold"
  },
  {
    id: 2,
    title: "Bot WhatsApp",
    description: "an advanced wa bot technology ",
    image: "https://nauval.mycdn.biz.id/download/1742031640154.jpeg",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://wa.me/628884220184",
    codeUrl: "#",
    tag: "Bot",
    tagColor: "bg-green-500"
  },
  {
    id: 3,
    title: "to url/cdn",
    description: "coming soon",
    image: "https://nauval.mycdn.biz.id/download/1742031815177.jpeg",
    technologies: ["JavaScript", "API", "CSS"],
    liveUrl: "#",
    codeUrl: "#",
    tag: "Coming Soon",
    tagColor: "bg-blue-500"
  }
];
