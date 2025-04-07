import { Metadata } from "next";
import MainLayout from "@/components/layouts/main-layout";

export const metadata: Metadata = {
  title: "Aka Portfolio - Updates",
  description: "Stay updated with the latest news and updates from Aka, a web developer from West Sumatra, Indonesia.",
};

export default function UpdatesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Updates Page</h1>
        <p className="text-lg">
          This page will contain the latest news, blog posts, and updates from Aka.
        </p>
      </div>
    </MainLayout>
  );
}