export interface Skill {
  name: string;
  description: string;
  iconKey: string;
  percentage: number;
  barColor: string;
  iconColor: string;
  bgLight: string;
  bgDark: string;
}

export const skillsData: Skill[] = [
  {
    name: "HTML",
    description: "Crafting the structure of web pages with semantic HTML5.",
    iconKey: "html",
    percentage: 90,
    barColor: "bg-orange-500",
    iconColor: "text-orange-500",
    bgLight: "bg-orange-100",
    bgDark: "bg-orange-900/20"
  },
  {
    name: "CSS",
    description: "Styling web applications with modern CSS techniques.",
    iconKey: "css",
    percentage: 85,
    barColor: "bg-blue-500",
    iconColor: "text-blue-500",
    bgLight: "bg-blue-100",
    bgDark: "bg-blue-900/20"
  },
  {
    name: "JavaScript",
    description: "Creating interactive and dynamic experiences on the web.",
    iconKey: "javascript",
    percentage: 75,
    barColor: "bg-yellow-400",
    iconColor: "text-yellow-400",
    bgLight: "bg-yellow-100",
    bgDark: "bg-yellow-900/20"
  },
  {
    name: "Node.js",
    description: "Building server-side applications and APIs with JavaScript.",
    iconKey: "nodejs",
    percentage: 70,
    barColor: "bg-green-500",
    iconColor: "text-green-500",
    bgLight: "bg-green-100",
    bgDark: "bg-green-900/20"
  },
  {
    name: "Python",
    description: "Developing scripts and automation tools with Python.",
    iconKey: "python",
    percentage: 65,
    barColor: "bg-blue-600",
    iconColor: "text-blue-600",
    bgLight: "bg-blue-100",
    bgDark: "bg-blue-900/20"
  },
  {
    name: "MongoDB",
    description: "Working with NoSQL database for modern applications.",
    iconKey: "mongodb",
    percentage: 60,
    barColor: "bg-green-600",
    iconColor: "text-green-600",
    bgLight: "bg-green-100",
    bgDark: "bg-green-900/20"
  },
  {
    name: "TypeScript",
    description: "Adding static types to JavaScript for more robust applications.",
    iconKey: "typescript",
    percentage: 55,
    barColor: "bg-blue-700",
    iconColor: "text-blue-700",
    bgLight: "bg-blue-100",
    bgDark: "bg-blue-900/20"
  }
];
