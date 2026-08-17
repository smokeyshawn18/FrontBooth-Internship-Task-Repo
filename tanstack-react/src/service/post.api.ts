import { apiInstance } from "../api/api";
import type { PostFormValues, CreatePostDto } from "../schema/post.schema";

export const postApi = {
  async getPosts(): Promise<PostFormValues[]> {
    const response = await apiInstance.get<PostFormValues[]>("/posts");

    return response.data;
  },

  async getPostById(id: string): Promise<PostFormValues> {
    const response = await apiInstance.get<PostFormValues>(`/posts/${id}`);

    return response.data;
  },

  async createPost(data: CreatePostDto): Promise<PostFormValues> {
    const response = await apiInstance.post<PostFormValues>("/posts", data);

    return response.data;
  },

  async updatePost(id: string, data: CreatePostDto): Promise<PostFormValues> {
    const response = await apiInstance.put<PostFormValues>(
      `/posts/${id}`,
      data,
    );

    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await apiInstance.delete(`/posts/${id}`);
  },
};
