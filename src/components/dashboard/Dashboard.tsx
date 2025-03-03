import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard";
import { AvatarGrid, CreateAvatarDialog } from "@/components/avatar";
import { AuthDialog } from "@/components/auth";
import { PricingSection } from "@/components/pricing";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { generateAvatars } from "@/lib/avatar-generator";
import { motion } from "framer-motion";
import { ButtonShiny } from "@/components/ui/button-shiny";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [avatars, setAvatars] = useState(() => generateAvatars(6));
  const [user, setUser] = useState(null);

  const handleCreateAvatar = (data: any) => {
    const newAvatar = {
      ...generateAvatars(1)[0],
      name: data.name,
      description: data.description,
      niche: data.niche,
      isNsfw: data.isNsfw,
    };
    setAvatars([newAvatar, ...avatars]);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onCreateAvatar={() =>
          user ? setIsCreateDialogOpen(true) : setIsAuthDialogOpen(true)
        }
        user={user}
        onSignInClick={() => setIsAuthDialogOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">AI Avatar Marketplace</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Create and monetize your AI avatars
          </p>
          <ButtonShiny
            onClick={() => setIsCreateDialogOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" /> Create Avatar
          </ButtonShiny>
        </motion.div>

        <ThreeDPhotoCarousel avatars={avatars} />

        <AvatarGrid
          avatars={avatars}
          onSubscribe={(id) => console.log("Subscribe:", id)}
          onMessage={(id) => console.log("Message:", id)}
          onLike={(id) => console.log("Like:", id)}
        />

        <PricingSection />
      </main>

      <CreateAvatarDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateAvatar}
      />

      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onAuthSuccess={(user) => setUser(user)}
      />
    </div>
  );
}
