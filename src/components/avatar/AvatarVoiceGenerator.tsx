import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Mic, Play, Pause, Save, Loader2 } from "lucide-react";
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

interface AvatarVoiceGeneratorProps {
  avatarId?: string;
  onVoiceGenerated?: (audioUrl: string) => void;
}

const VOICE_TYPES = [
  { id: "female-1", name: "Female 1" },
  { id: "female-2", name: "Female 2" },
  { id: "male-1", name: "Male 1" },
  { id: "male-2", name: "Male 2" },
  { id: "neutral", name: "Neutral" },
];

export function AvatarVoiceGenerator({
  avatarId,
  onVoiceGenerated = () => {},
}: AvatarVoiceGeneratorProps) {
  const [text, setText] = useState(
    "Hi there! I'm your AI avatar. I can speak any text you type here.",
  );
  const [voiceType, setVoiceType] = useState("female-1");
  const [pitch, setPitch] = useState([1]);
  const [speed, setSpeed] = useState([1]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call to generate voice
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real implementation, this would be an API call to a TTS service
      // const response = await fetch('/api/generate-voice', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text, voiceType, pitch: pitch[0], speed: speed[0], avatarId }),
      // });
      // const data = await response.json();
      // const generatedUrl = data.audioUrl;

      // For demo purposes, we'll use a sample audio URL
      const generatedUrl =
        "https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3";

      setAudioUrl(generatedUrl);
      onVoiceGenerated(generatedUrl);

      // Create audio element
      if (!audioRef.current) {
        audioRef.current = new Audio(generatedUrl);
        audioRef.current.onended = () => setIsPlaying(false);
      } else {
        audioRef.current.src = generatedUrl;
      }
    } catch (error) {
      console.error("Error generating voice:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    if (!audioUrl) return;

    // Create a temporary anchor element to download the audio file
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `avatar-voice-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Voice Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Text to speak</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text for your avatar to speak..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice-type">Voice Type</Label>
          <Select value={voiceType} onValueChange={setVoiceType}>
            <SelectTrigger id="voice-type">
              <SelectValue placeholder="Select voice type" />
            </SelectTrigger>
            <SelectContent>
              {VOICE_TYPES.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pitch">Pitch</Label>
          <Slider
            id="pitch"
            min={0.5}
            max={2}
            step={0.1}
            value={pitch}
            onValueChange={setPitch}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>Normal</span>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="speed">Speed</Label>
          <Slider
            id="speed"
            min={0.5}
            max={2}
            step={0.1}
            value={speed}
            onValueChange={setSpeed}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slow</span>
            <span>Normal</span>
            <span>Fast</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !text.trim()}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Generate Voice
            </>
          )}
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePlayPause}
            disabled={!audioUrl || isGenerating}
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
            disabled={!audioUrl || isGenerating}
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
