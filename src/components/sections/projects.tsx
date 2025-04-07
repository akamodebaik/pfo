"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product management, and payment processing integration.",
    image: "/images/projects/ecommerce.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description: "A weather application that provides real-time weather data and forecasts for locations worldwide.",
    image: "/images/projects/weather.jpg",
    tags: ["JavaScript", "API Integration", "CSS3"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Task Management System",
    description: "A collaborative task management application with real-time updates, task assignments, and deadline tracking.",
    image: "/images/projects/task-manager.jpg",
    tags: ["React", "Firebase", "Tailwind CSS"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
  },
];

export default function Projects() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <section className="py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            My Projects
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Featured Work
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise
            in web development.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-background border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-primary/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary/30">{project.title}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Actions */}
                <div className="flex items-center space-x-3 pt-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                    >
                      Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                  
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Code <Github className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-12"
        >
          <motion.div variants={itemVariants}>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}