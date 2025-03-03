import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  links?: Array<{ href: string; label: string }>;
  actions?: React.ReactNode;
  sticky?: boolean;
}

export function Navbar({
  className,
  logo,
  links = [],
  actions,
  sticky = true,
  ...props
}: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className={cn(
        "w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        sticky && "sticky top-0 z-50",
        className,
      )}
      {...props}
    >
      <div className="container flex h-14 items-center">
        <div className="flex gap-6 md:gap-10">
          {logo || (
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold inline-block">AI Universe</span>
            </Link>
          )}
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            {actions}
          </nav>
        </div>
      </div>
    </nav>
  );
}
