import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Play, Pause, Save, Upload, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface AvatarAnimatorProps {
  avatarId?: string;
  avatarImageUrl?: string;
  onAnimationGenerated?: (videoUrl: string) => void;
}

const ANIMATION_PRESETS = [
  { id: "talking", name: "Talking" },
  { id: "dancing", name: "Dancing" },
  { id: "posing", name: "Posing" },
  { id: "waving", name: "Waving" },
  { id: "walking", name: "Walking" },
];

export function AvatarAnimator({
  avatarId,
  avatarImageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  onAnimationGenerated = () => {},
}: AvatarAnimatorProps) {
  const [selectedPreset, setSelectedPreset] = useState("talking");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("preset");
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call to generate animation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // In a real implementation, this would be an API call to an animation service
      // const formData = new FormData();
      // if (audioFile) formData.append('audio', audioFile);
      // formData.append('avatarId', avatarId || '');
      // formData.append('preset', selectedPreset);
      //
      // const response = await fetch('/api/generate-animation', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // const generatedUrl = data.videoUrl;

      // For demo purposes, we'll use a sample video URL
      const generatedUrl =
        "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

      setVideoUrl(generatedUrl);
      onAnimationGenerated(generatedUrl);

      // Create video element
      if (videoRef.current) {
        videoRef.current.src = generatedUrl;
      }
    } catch (error) {
      console.error("Error generating animation:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current || !videoUrl) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    if (!videoUrl) return;

    // Create a temporary anchor element to download the video file
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `avatar-animation-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Avatar Animator</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={false}
              loop
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={avatarImageUrl}
                alt="Avatar"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset">Animation Preset</TabsTrigger>
            <TabsTrigger value="audio">Audio Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="animation-preset">Animation Type</Label>
              <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                <SelectTrigger id="animation-preset">
                  <SelectValue placeholder="Select animation type" />
                </SelectTrigger>
                <SelectContent>
                  {ANIMATION_PRESETS.map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audio-file">Upload Audio for Lip Sync</Label>
              <div className="flex gap-2">
                <Input
                  id="audio-file"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
              {audioFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {audioFile.name}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || (activeTab === "audio" && !audioFile)}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Generate Animation
            </>
          )}
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePlayPause}
            disabled={!videoUrl || isGenerating}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSave}
            disabled={!videoUrl || isGenerating}
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
