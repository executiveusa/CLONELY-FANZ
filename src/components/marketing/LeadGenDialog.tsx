import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LeadGenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (email: string) => void;
}

export function LeadGenDialog({
  open,
  onOpenChange,
  onSubmit,
}: LeadGenDialogProps) {
  const [email, setEmail] = React.useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get 50% Off Your First Month</DialogTitle>
          <DialogDescription>
            Join thousands of creators using AI to build their virtual brand.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={() => onSubmit(email)} className="w-full">
            Get Early Access
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
