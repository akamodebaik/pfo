"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import Link from "next/link"
import { Book, Code, Coffee, User } from "lucide-react"

export default function About() {
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
            About Me
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Get to Know Me Better
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a dedicated web developer with a passion for creating beautiful, functional websites
            that deliver exceptional user experiences.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative rounded-lg overflow-hidden group"
          >
            <div className="relative aspect-square md:aspect-auto md:h-[500px] bg-gradient-to-tr from-primary/20 to-primary/5 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl md:text-9xl font-bold text-primary/20">Aka</div>
              </div>
              <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-primary/20 rounded-lg" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold">
              A Passionate Web Developer from West Sumatra
            </motion.h3>
            
            <motion.p variants={itemVariants} className="text-muted-foreground">
              I'm Aka, a web developer based in Indonesia with a strong focus on creating 
              modern and performant web applications. I love to combine design aesthetics 
              with technical functionality to build websites that not only look great but 
              also provide an excellent user experience.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-muted-foreground">
              With expertise in both frontend and backend development, I approach each project 
              with creativity and technical precision. I'm constantly learning new technologies 
              and methodologies to enhance my skills and deliver better solutions.
            </motion.p>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 py-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">3+</span>
                <span className="text-sm text-muted-foreground">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">20+</span>
                <span className="text-sm text-muted-foreground">Projects Completed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">10+</span>
                <span className="text-sm text-muted-foreground">Happy Clients</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">5+</span>
                <span className="text-sm text-muted-foreground">Awards Received</span>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Clean Code</h4>
                  <p className="text-sm text-muted-foreground">Maintainable, readable solutions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Creative Approach</h4>
                  <p className="text-sm text-muted-foreground">Unique solutions to problems</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">User Focused</h4>
                  <p className="text-sm text-muted-foreground">Intuitive and accessible designs</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Continuous Learning</h4>
                  <p className="text-sm text-muted-foreground">Always improving skills</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Link 
                href="/about"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Learn more about me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}