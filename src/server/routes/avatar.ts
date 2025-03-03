import { Router } from "express";
import { supabase } from "../index";
import { authenticateUser } from "../middleware/auth";

const router = Router();

// Create avatar
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { name, description, niche, nsfw } = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from("avatars")
      .insert([{ name, description, niche, nsfw, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's avatars
router.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user?.id;
    const { data, error } = await supabase
      .from("avatars")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update avatar
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from("avatars")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete avatar
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const { error } = await supabase
      .from("avatars")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
    res.json({ message: "Avatar deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const avatarRoutes = router;
