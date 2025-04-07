import { Metadata } from "next";
import MainLayout from "@/components/layouts/main-layout";

export const metadata: Metadata = {
  title: "Aka Portfolio - Projects",
  description: "Explore the projects created by Aka, a web developer from West Sumatra, Indonesia.",
};

export default function ProjectsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Projects Page</h1>
        <p className="text-lg">
          This page will showcase Aka's portfolio of projects with detailed descriptions and links.
        </p>
      </div>
    </MainLayout>
  );
}