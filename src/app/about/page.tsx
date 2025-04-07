import { Metadata } from "next";
import MainLayout from "@/components/layouts/main-layout";

export const metadata: Metadata = {
  title: "Aka Portfolio - About",
  description: "Learn more about Aka, a web developer from West Sumatra, Indonesia.",
};

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">About Page</h1>
        <p className="text-lg">
          This page will contain detailed information about Aka's background, experience, and personal journey.
        </p>
      </div>
    </MainLayout>
  );
}