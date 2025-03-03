import React from "react";
import AvatarCard from "./AvatarCard";
import { Avatar as AvatarType } from "@/lib/api";

interface AvatarGridProps {
  avatars?: AvatarType[];
  onSubscribe?: (id: string) => void;
  onMessage?: (id: string) => void;
  onLike?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleNsfw?: (id: string, value: boolean) => void;
  onToggleRedditAutomation?: (id: string, value: boolean) => void;
}

const defaultAvatars: AvatarType[] = [
  {
    id: "1",
    name: "Digital Dreamer",
    description: "Creating AI-generated digital art and immersive experiences",
    imageUrl: "https://images.unsplash.com/photo-1660241588741-dfd8a64d9a86",
    niche: "Digital Art",
    isNsfw: false,
    subscriberCount: 1200,
    messageCount: 45,
    likeCount: 3200,
  },
  {
    id: "2",
    name: "Virtual Muse",
    description: "AI fashion model and style inspiration",
    imageUrl: "https://images.unsplash.com/photo-1670272505340-d906d8d77d03",
    niche: "Fashion",
    isNsfw: false,
    subscriberCount: 2100,
    messageCount: 89,
    likeCount: 5600,
  },
  {
    id: "3",
    name: "Cyber Artist",
    description: "Blending technology and creativity in the digital realm",
    imageUrl: "https://images.unsplash.com/photo-1684163029671-7d2606ff7f11",
    niche: "Tech Art",
    isNsfw: true,
    subscriberCount: 890,
    messageCount: 32,
    likeCount: 2100,
  },
];

const AvatarGrid = ({
  avatars = defaultAvatars,
  onSubscribe = () => {},
  onMessage = () => {},
  onLike = () => {},
  onDelete,
  onToggleNsfw,
  onToggleRedditAutomation,
}: AvatarGridProps) => {
  return (
    <div className="container py-8">
      {avatars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground text-lg">No avatars found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {avatars.map((avatar) => (
            <AvatarCard
              key={avatar.id}
              name={avatar.name}
              description={avatar.description}
              imageUrl={avatar.imageUrl}
              niche={avatar.niche}
              isNsfw={avatar.isNsfw}
              subscriberCount={avatar.subscriberCount}
              messageCount={avatar.messageCount}
              likeCount={avatar.likeCount}
              onSubscribe={() => onSubscribe(avatar.id)}
              onMessage={() => onMessage(avatar.id)}
              onLike={() => onLike(avatar.id)}
              onDelete={onDelete ? () => onDelete(avatar.id) : undefined}
              onToggleNsfw={
                onToggleNsfw
                  ? (value) => onToggleNsfw(avatar.id, value)
                  : undefined
              }
              onToggleRedditAutomation={
                onToggleRedditAutomation
                  ? (value) => onToggleRedditAutomation(avatar.id, value)
                  : undefined
              }
              redditAutomation={avatar.redditAutomation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarGrid;
