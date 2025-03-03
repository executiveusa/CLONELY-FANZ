import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarGroupProps {
  avatars: Array<{
    src: string;
    alt: string;
    fallback?: string;
  }>;
  max?: number;
  size?: number;
}

export function AvatarGroup({ avatars, max = 4, size = 40 }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className="flex -space-x-3">
      {visibleAvatars.map((avatar, i) => (
        <Avatar
          key={i}
          className="ring-2 ring-background"
          style={{ width: size, height: size }}
        >
          <AvatarImage src={avatar.src} alt={avatar.alt} />
          <AvatarFallback>
            {avatar.fallback || avatar.alt.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar
          className="ring-2 ring-background bg-muted"
          style={{ width: size, height: size }}
        >
          <AvatarFallback>+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
