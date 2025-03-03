import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard";
import { AvatarGrid } from "@/components/avatar";
import { CreateAvatarDialog } from "@/components/avatar";
import { generateAvatars } from "@/lib/avatar-generator";
import { PricingSection } from "@/components/pricing";

const DashboardStoryboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [avatars, setAvatars] = useState(() => generateAvatars(6));
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAvatars = avatars.filter(
    (avatar) =>
      avatar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avatar.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        onCreateAvatar={() => setIsCreateDialogOpen(true)}
        onSearch={setSearchQuery}
      />

      <main className="max-w-[1440px] mx-auto space-y-16">
        <AvatarGrid
          avatars={filteredAvatars}
          onSubscribe={(id) => console.log("Subscribe:", id)}
          onMessage={(id) => console.log("Message:", id)}
          onLike={(id) => console.log("Like:", id)}
        />

        <PricingSection
          onSelectTier={(tier) => console.log("Selected tier:", tier)}
        />
      </main>

      <CreateAvatarDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateAvatar}
      />
    </div>
  );
};

export default DashboardStoryboard;
