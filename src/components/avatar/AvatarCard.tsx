import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  Lock,
  Trash2,
  MoreVertical,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Mic,
  Video,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarStudio } from "./AvatarStudio";

interface AvatarCardProps {
  name?: string;
  description?: string;
  imageUrl?: string;
  niche?: string;
  isNsfw?: boolean;
  redditAutomation?: boolean;
  subscriberCount?: number;
  messageCount?: number;
  likeCount?: number;
  onSubscribe?: () => void;
  onMessage?: () => void;
  onLike?: () => void;
  onDelete?: () => void;
  onToggleNsfw?: (value: boolean) => void;
  onToggleRedditAutomation?: (value: boolean) => void;
  id?: string;
}

const AvatarCard = ({
  name = "AI Creator",
  description = "Digital content creator powered by AI",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  niche = "Digital Art",
  isNsfw = false,
  redditAutomation = false,
  subscriberCount = 0,
  messageCount = 0,
  likeCount = 0,
  onSubscribe = () => {},
  onMessage = () => {},
  onLike = () => {},
  onDelete,
  onToggleNsfw,
  onToggleRedditAutomation,
  id,
}: AvatarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  const handleOpenStudio = () => {
    setIsStudioOpen(true);
  };

  return (
    <>
      <Card
        className="w-[300px] overflow-hidden group hover:shadow-xl transition-all duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-slate-200 dark:border-slate-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <CardHeader className="p-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30"
                >
                  {niche}
                </Badge>
                {isNsfw && (
                  <Badge variant="destructive" className="flex gap-1">
                    <Lock className="w-3 h-3" /> 18+
                  </Badge>
                )}
                {redditAutomation && (
                  <Badge
                    variant="outline"
                    className="bg-white/20 text-white flex gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reddit
                  </Badge>
                )}
              </div>
            </div>
            {isNsfw && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="flex gap-1">
                  <Lock className="w-3 h-3" /> 18+
                </Badge>
              </div>
            )}

            {isHovered && (
              <div className="absolute top-2 right-2 z-30">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Avatar Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleOpenStudio}>
                      <Video className="mr-2 h-4 w-4" />
                      <span>Open Studio</span>
                    </DropdownMenuItem>

                    {onToggleNsfw && (
                      <DropdownMenuItem onClick={() => onToggleNsfw(!isNsfw)}>
                        {isNsfw ? (
                          <>
                            <ToggleLeft className="mr-2 h-4 w-4" />
                            <span>Disable NSFW</span>
                          </>
                        ) : (
                          <>
                            <ToggleRight className="mr-2 h-4 w-4" />
                            <span>Enable NSFW</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    )}

                    {onToggleRedditAutomation && (
                      <DropdownMenuItem
                        onClick={() =>
                          onToggleRedditAutomation(!redditAutomation)
                        }
                      >
                        {redditAutomation ? (
                          <>
                            <ToggleLeft className="mr-2 h-4 w-4" />
                            <span>Disable Reddit</span>
                          </>
                        ) : (
                          <>
                            <ToggleRight className="mr-2 h-4 w-4" />
                            <span>Enable Reddit</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    )}

                    {onDelete && (
                      <DropdownMenuItem
                        onClick={onDelete}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Avatar</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <Badge variant="secondary" className="mt-1">
                {niche}
              </Badge>
            </div>
            <Avatar className="w-10 h-10 border-2 border-primary">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex gap-1"
              onClick={onLike}
            >
              <Heart className="w-4 h-4" />
              <span className="text-xs">{likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex gap-1"
              onClick={onMessage}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{messageCount}</span>
            </Button>
          </div>
          <Button
            variant="default"
            size="sm"
            className="flex gap-1"
            onClick={onSubscribe}
          >
            Subscribe
          </Button>
        </CardFooter>
      </Card>

      <AvatarStudio
        avatar={{
          id: id || "temp-id",
          name,
          description,
          imageUrl,
          niche,
          isNsfw,
          redditAutomation,
          subscriberCount,
          messageCount,
          likeCount,
        }}
        open={isStudioOpen}
        onOpenChange={setIsStudioOpen}
      />
    </>
  );
};

export default AvatarCard;
