import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarVoiceGenerator } from "./AvatarVoiceGenerator";
import { AvatarAnimator } from "./AvatarAnimator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar } from "@/lib/api";

interface AvatarStudioProps {
  avatar?: Avatar;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AvatarStudio({
  avatar,
  open = false,
  onOpenChange = () => {},
}: AvatarStudioProps) {
  const [activeTab, setActiveTab] = useState("voice");
  const [generatedVoice, setGeneratedVoice] = useState<string | null>(null);
  const [generatedAnimation, setGeneratedAnimation] = useState<string | null>(
    null,
  );

  const handleVoiceGenerated = (audioUrl: string) => {
    setGeneratedVoice(audioUrl);
  };

  const handleAnimationGenerated = (videoUrl: string) => {
    setGeneratedAnimation(videoUrl);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Avatar Studio - {avatar?.name || "Create Content"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4">
              <div className="aspect-square rounded-md overflow-hidden bg-muted">
                <img
                  src={
                    avatar?.imageUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                  }
                  alt={avatar?.name || "Avatar"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="font-semibold text-lg">
                  {avatar?.name || "Your Avatar"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {avatar?.description ||
                    "Create voice and animations for your AI avatar."}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("voice")}
                  className={activeTab === "voice" ? "border-primary" : ""}
                >
                  Voice
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("animation")}
                  className={activeTab === "animation" ? "border-primary" : ""}
                >
                  Animation
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-1">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="voice">Voice Generator</TabsTrigger>
                <TabsTrigger value="animation">Animator</TabsTrigger>
              </TabsList>

              <TabsContent value="voice" className="mt-4">
                <AvatarVoiceGenerator
                  avatarId={avatar?.id}
                  onVoiceGenerated={handleVoiceGenerated}
                />
              </TabsContent>

              <TabsContent value="animation" className="mt-4">
                <AvatarAnimator
                  avatarId={avatar?.id}
                  avatarImageUrl={avatar?.imageUrl}
                  onAnimationGenerated={handleAnimationGenerated}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
