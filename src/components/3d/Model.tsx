import React from "react";

interface ModelProps {
  url?: string;
}

export function Model({ url = "/model.glb" }: ModelProps) {
  return (
    <div className="w-full h-full min-h-[300px] bg-muted/20 rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">3D Model Loading...</p>
    </div>
  );
}
