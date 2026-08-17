import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postQueryKeys } from "../service/queryKeys";

import { postApi } from "../service/post.api";
import { message } from "antd";

import type { CreatePostDto } from "../schema/post.schema";

export const usePostsQuery = (enabled = true) => {
  return useQuery({
    queryKey: postQueryKeys.lists(),
    queryFn: () => postApi.getPosts(),
    enabled,
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostDto) => postApi.createPost(data),

    onSuccess: () => {
      message.success("Post created successfully");

      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });
    },

    onError: (error) => {
      message.error("Failed to create post");
      console.error(error);
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePostDto }) =>
      postApi.updatePost(id, data),

    onSuccess: (_, { id }) => {
      message.success("Post updated successfully");

      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: postQueryKeys.detail(id),
      });
    },

    onError: (error) => {
      message.error("Failed to update post");
      console.error(error);
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postApi.deletePost(id),

    onSuccess: () => {
      message.success("Post deleted successfully");

      queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });
    },

    onError: (error) => {
      message.error("Failed to delete post");
      console.error(error);
    },
  });
};
