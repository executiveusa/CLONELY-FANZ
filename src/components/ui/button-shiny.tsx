import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type ButtonProps } from "@/components/ui/button";

export interface ButtonShinyProps extends ButtonProps {}

export const ButtonShiny = React.forwardRef<
  HTMLButtonElement,
  ButtonShinyProps
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden transition-all hover:scale-105",
        "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-r before:from-primary/50 before:to-secondary/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-r after:from-primary after:to-secondary after:opacity-0 hover:after:opacity-10 after:transition-opacity",
        className,
      )}
      {...props}
    />
  );
});

ButtonShiny.displayName = "ButtonShiny";
