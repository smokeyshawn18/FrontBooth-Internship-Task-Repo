import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postQueryKeys } from "../service/queryKeys";

import { postApi } from "../service/post.api";
import { message } from "antd";

import type { CreatePostDto } from "../schema/post.schema";
import { snapshotAndCancel } from "../service/optimistic";
import type { Post } from "../types";

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

    onMutate: async ({ id, data }) => {
      const keys = [postQueryKeys.lists(), postQueryKeys.detail(id)];
      const { rollback } = await snapshotAndCancel(queryClient, keys);

      queryClient.setQueryData(postQueryKeys.lists(), (old: any) =>
        old?.map((post: Post) =>
          post.id === id ? { ...post, ...data } : post,
        ),
      );
      queryClient.setQueryData(postQueryKeys.detail(id), (old: any) =>
        old ? { ...old, ...data } : old,
      );

      return { rollback };
    },

    onError: (error, _vars, context) => {
      message.error("Failed to update post");
      console.error(error);
      context?.rollback();
    },

    onSuccess: () => message.success("Post updated successfully"),

    onSettled: (_data, _err, { id }) => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(id) });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postApi.deletePost(id),

    onMutate: async (id) => {
      const { rollback } = await snapshotAndCancel(queryClient, [
        postQueryKeys.lists(),
      ]);

      queryClient.setQueryData(postQueryKeys.lists(), (old: any) =>
        old?.filter((post: Post) => post.id !== id),
      );

      return { rollback };
    },

    onError: (error, _id, context) => {
      message.error("Failed to delete post");
      console.error(error);
      context?.rollback();
    },

    onSuccess: () => message.success("Post deleted successfully"),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
};
