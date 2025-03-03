import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { AvatarGrid, CreateAvatarDialog } from "@/components/avatar";
import { AuthDialog } from "@/components/auth";
import { DashboardHeader } from "@/components/dashboard";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { generateAvatars } from "@/lib/avatar-generator";

// Define sexy AI avatar placeholders
const sexyAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
];

export default function ClonelyFanz() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [avatars, setAvatars] = useState(() => generateAvatars(6));
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    fetchUser();
  }, []);

  const generateAvatar = async () => {
    setLoading(true);
    try {
      // Simulate API call with random avatar selection
      const randomAvatar =
        sexyAvatars[Math.floor(Math.random() * sexyAvatars.length)];
      setAvatar(randomAvatar);
    } catch (error) {
      console.error("Failed to generate avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const monetizeAvatar = async () => {
    if (!avatar) return;
    try {
      await supabase
        .from("avatars")
        .insert({ user_id: user?.id, avatar_url: avatar });
      alert("Avatar monetized successfully!");
    } catch (error) {
      console.error("Failed to monetize avatar:", error);
    }
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
      <h1 className="text-4xl font-bold mt-10">
        ClonelyFanz - AI Avatar Revolution
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md mt-6"
      >
        <Card className="shadow-lg rounded-2xl bg-[#1B1F3B]">
          <CardContent className="flex flex-col items-center p-6">
            {avatar ? (
              <motion.img
                src={avatar}
                alt="Generated Avatar"
                className="w-64 h-64 rounded-xl shadow-md object-cover"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            ) : (
              <p className="text-gray-400 h-64 flex items-center">
                No avatar generated yet.
              </p>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full"
            >
              <Button
                onClick={generateAvatar}
                disabled={loading}
                className="w-full bg-[#FF2768] hover:bg-[#E01E5A] text-white py-3 rounded-lg transition-all duration-300 shadow-lg"
              >
                {loading ? "Generating..." : "Generate AI Avatar"}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full"
            >
              <Button
                onClick={monetizeAvatar}
                disabled={!avatar}
                className="w-full bg-[#3C91E6] hover:bg-[#2973B7] text-white py-3 rounded-lg transition-all duration-300 shadow-lg"
              >
                Monetize Avatar
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <ThreeDPhotoCarousel avatars={avatars} />

      <AvatarGrid
        avatars={avatars}
        onSubscribe={(id) => console.log("Subscribe:", id)}
        onMessage={(id) => console.log("Message:", id)}
        onLike={(id) => console.log("Like:", id)}
      />

      <CreateAvatarDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={(data) => {
          const newAvatar = {
            ...generateAvatars(1)[0],
            name: data.name,
            description: data.description,
            niche: data.niche,
            isNsfw: data.isNsfw,
          };
          setAvatars([newAvatar, ...avatars]);
        }}
      />

      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onAuthSuccess={(user) => setUser(user)}
      />
    </div>
  );
}
