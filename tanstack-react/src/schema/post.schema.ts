import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  userId: z.number(),
  title: z.string().min(10, "Title must be at least 10 characters"),
  body: z.string().min(10, "Body must be at least 10 characters"),
});

export const CreatePostSchema = PostSchema.omit({
  id: true,
});

export type PostFormValues = z.infer<typeof PostSchema>;

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
