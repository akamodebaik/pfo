"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

type SkillCategory = {
  name: string;
  skills: {
    name: string;
    level: number;
  }[];
};

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 80 },
      { name: "PostgreSQL", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "API Development", level: 80 },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", level: 85 },
      { name: "Figma", level: 70 },
      { name: "DevOps", level: 60 },
      { name: "Testing", level: 65 },
      { name: "Performance Optimization", level: 75 },
    ],
  },
];

export default function Skills() {
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
        staggerChildren: 0.1
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
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            My Skills
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Technical Expertise
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I've spent years honing my skills across various technologies to deliver 
            exceptional web experiences. Here's what I bring to the table.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-6 relative">
                {category.name}
                <span className="absolute bottom-0 left-0 h-1 w-10 bg-primary rounded-full" />
              </h3>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 1.5,
                          delay: 0.2 + (skillIndex * 0.1),
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto text-center mt-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
            My Learning Philosophy
          </motion.h3>
          <motion.p variants={itemVariants} className="text-muted-foreground">
            I believe in continuous learning and staying up-to-date with the latest technologies
            and best practices. The tech world evolves rapidly, and I'm committed to growing my
            skills to deliver the best solutions possible.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}