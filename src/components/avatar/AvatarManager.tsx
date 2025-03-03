import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getAvatars,
  getUserAvatars,
  deleteAvatar,
  updateAvatar,
  Avatar,
} from "@/lib/api";
import { AvatarGrid } from "@/components/avatar";
import { CreateAvatarDialog } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AuthDialog } from "@/components/auth";

export function AvatarManager() {
  const { user } = useAuth();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchAvatars();
  }, [user, activeTab]);

  const fetchAvatars = async () => {
    setLoading(true);
    try {
      let fetchedAvatars;
      if (activeTab === "mine" && user) {
        fetchedAvatars = await getUserAvatars(user.id);
      } else {
        fetchedAvatars = await getAvatars();
      }
      setAvatars(fetchedAvatars);
    } catch (error) {
      console.error("Error fetching avatars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAvatar = (newAvatar: Avatar) => {
    setAvatars([newAvatar, ...avatars]);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteAvatar = async (id: string) => {
    try {
      await deleteAvatar(id);
      setAvatars(avatars.filter((avatar) => avatar.id !== id));
    } catch (error) {
      console.error("Error deleting avatar:", error);
    }
  };

  const handleToggleNsfw = async (id: string, isNsfw: boolean) => {
    try {
      await updateAvatar(id, { isNsfw });
      setAvatars(
        avatars.map((avatar) =>
          avatar.id === id ? { ...avatar, isNsfw } : avatar,
        ),
      );
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleToggleRedditAutomation = async (
    id: string,
    redditAutomation: boolean,
  ) => {
    try {
      await updateAvatar(id, { redditAutomation });
      setAvatars(
        avatars.map((avatar) =>
          avatar.id === id ? { ...avatar, redditAutomation } : avatar,
        ),
      );
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList>
            <TabsTrigger value="all">All Avatars</TabsTrigger>
            <TabsTrigger value="mine" disabled={!user}>
              My Avatars
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          onClick={() =>
            user ? setIsCreateDialogOpen(true) : setIsAuthDialogOpen(true)
          }
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Create Avatar
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <AvatarGrid
          avatars={avatars}
          onDelete={handleDeleteAvatar}
          onToggleNsfw={handleToggleNsfw}
          onToggleRedditAutomation={handleToggleRedditAutomation}
        />
      )}

      <CreateAvatarDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateAvatar}
      />

      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onAuthSuccess={() => setIsAuthDialogOpen(false)}
      />
    </div>
  );
}
