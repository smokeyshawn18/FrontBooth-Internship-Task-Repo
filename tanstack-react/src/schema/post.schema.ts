import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  userId: z.number(),
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
});

export const CreatePostSchema = PostSchema.omit({
  id: true,
});

export type PostFormValues = z.infer<typeof PostSchema>;

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
