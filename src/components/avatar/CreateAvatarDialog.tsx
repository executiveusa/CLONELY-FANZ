import React, { useState } from "react";
import { createAvatar } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ButtonShiny } from "@/components/ui/button-shiny";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { faker } from "@faker-js/faker";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  niche: z.string().min(1, "Please select a niche"),
  isNsfw: z.boolean().default(false),
  redditAutomation: z.boolean().default(false),
});

export type CreateAvatarFormData = z.infer<typeof formSchema>;

export interface CreateAvatarDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

const CreateAvatarDialog = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = (data) => console.log(data),
}: CreateAvatarDialogProps) => {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      niche: "",
      isNsfw: false,
      redditAutomation: false,
    },
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    try {
      // Generate a random avatar image
      const imageUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${faker.string.uuid()}`;

      // Create the avatar in the database
      const newAvatar = {
        name: data.name,
        description: data.description,
        niche: data.niche,
        isNsfw: data.isNsfw,
        redditAutomation: data.redditAutomation,
        imageUrl,
        userId: user?.id,
        subscriberCount: faker.number.int({ min: 0, max: 1000 }),
        messageCount: faker.number.int({ min: 0, max: 100 }),
        likeCount: faker.number.int({ min: 0, max: 5000 }),
      };

      // In a real app, we would call the API here
      // const createdAvatar = await createAvatar(newAvatar);

      // For now, simulate a created avatar with an ID
      const createdAvatar = {
        ...newAvatar,
        id: faker.string.uuid(),
        createdAt: new Date().toISOString(),
      };

      onSubmit(createdAvatar);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create avatar:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>Create New Avatar</DialogTitle>
          <DialogDescription>
            Configure your new AI-powered virtual influencer
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter avatar name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your avatar's personality and purpose"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="niche"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Niche</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a niche" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Fitness">Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isNsfw"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>NSFW Content</FormLabel>
                    <FormDescription>
                      Allow mature or adult-oriented content
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="redditAutomation"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Reddit Automation</FormLabel>
                    <FormDescription>
                      Enable automated posting to Reddit
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <ButtonShiny
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </ButtonShiny>
              <ButtonShiny type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Create Avatar"
                )}
              </ButtonShiny>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAvatarDialog;
