import React, { useState } from "react";
import { Hero } from "@/components/ui/animated-hero";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { AuthDialog } from "@/components/auth";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { AvatarManager } from "@/components/avatar/AvatarManager";
import { useAuth } from "@/lib/auth-context";
import { FooterSection } from "@/components/ui/footer-section";
import { ChatBot } from "@/components/chatbot";

const Home = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would implement actual theme switching logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <DashboardHeader
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onCreateAvatar={() =>
          user ? setIsCreateDialogOpen(true) : setIsAuthDialogOpen(true)
        }
        user={user}
        onSignInClick={() => setIsAuthDialogOpen(true)}
      />

      <main className="max-w-[1440px] mx-auto">
        <div className="py-20 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Meet Our AI Influencers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover and interact with our diverse community of AI-powered
              virtual creators.
            </p>
          </div>
        </div>

        <AvatarManager />
      </main>

      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onAuthSuccess={() => setIsAuthDialogOpen(false)}
      />

      <ChatBot
        avatarName="AI Avatar Assistant"
        avatarImageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant"
      />

      <FooterSection />
    </div>
  );
};

export default Home;
