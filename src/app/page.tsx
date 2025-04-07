import { Metadata } from "next";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import MainLayout from "@/components/layouts/main-layout";

export const metadata: Metadata = {
  title: "Aka Portfolio - Home",
  description: "The professional portfolio of Aka, a web developer from West Sumatra, Indonesia.",
};

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </MainLayout>
  );
}