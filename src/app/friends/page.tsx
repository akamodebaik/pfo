import { Metadata } from "next";
import MainLayout from "@/components/layouts/main-layout";

export const metadata: Metadata = {
  title: "Aka Portfolio - Friends",
  description: "Meet Aka's friends and collaborators from West Sumatra, Indonesia.",
};

export default function FriendsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Friends Page</h1>
        <p className="text-lg">
          This page will feature Aka's friends, collaborators, and professional network.
        </p>
      </div>
    </MainLayout>
  );
}