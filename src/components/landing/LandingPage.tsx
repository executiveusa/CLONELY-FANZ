import React from "react";
import { Hero } from "@/components/ui/animated-hero";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { generateAvatars } from "@/lib/avatar-generator";
import { FooterSection } from "@/components/ui/footer-section";

const LandingPage = () => {
  const avatars = generateAvatars(6);

  return (
    <div className="min-h-screen bg-background">
      <Hero className="flex" />
      <div className="container mx-auto px-4">
        <ThreeDPhotoCarousel avatars={avatars} />
      </div>
      <FooterSection />
    </div>
  );
};

export default LandingPage;
