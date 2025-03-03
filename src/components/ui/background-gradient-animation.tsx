import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradientAnimation = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("min-h-screen bg-background relative", className)}>
      <div
        className="absolute inset-0 overflow-hidden -z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(var(--primary-rgb), 0.2), rgba(var(--secondary-rgb), 0.2))",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background animate-gradient" />
      </div>
      {children}
    </div>
  );
};
