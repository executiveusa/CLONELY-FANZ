import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Menu, Plus } from "lucide-react";

interface DashboardHeaderProps {
  onCreateAvatar?: () => void;
  onSearch?: (query: string) => void;
  user?: any;
  onSignInClick?: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export const DashboardHeader = ({
  onCreateAvatar = () => {},
  onSearch = () => {},
  user = null,
  onSignInClick = () => {},
}: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center space-x-2 lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">AI Creators</h1>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost">Discover</Button>
              <Button variant="ghost">Following</Button>
              <Button variant="ghost">Popular</Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-full max-w-sm hidden lg:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search creators..."
                className="pl-8"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-600"></span>
            </Button>

            {user ? (
              <Button onClick={onCreateAvatar}>
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            ) : (
              <Button onClick={onSignInClick}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
