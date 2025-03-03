import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Home, Users, Settings, HelpCircle, LogOut } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Community", href: "/community", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-background/95 lg:backdrop-blur">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-14 flex-shrink-0 px-4 border-b">
          <Link to="/" className="font-bold text-xl">
            AI Universe
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex-shrink-0 flex border-t p-4">
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={() => console.log("logout")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
