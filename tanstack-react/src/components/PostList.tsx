import { useState } from "react";
import { Button, Col, Empty, Row, Tag, Typography } from "antd";

import {
  useCreatePostMutation,
  useDeletePostMutation,
  usePostsQuery,
  useUpdatePostMutation,
} from "../hooks/usePostsQueries";

import type { CreatePostDto, PostFormValues } from "../schema/post.schema";

import { SkeletonLoading } from "./SkeletonLoading";
import { ErrorPage } from "../pages/ErrorPage";
import { PostCard } from "./PostCard";
import { EditPostModal } from "./EditPostModal";
import { CreatePostModal } from "./CreatePost";

const { Title, Text } = Typography;

export const PostList = () => {
  const {
    data: posts = [],
    isLoading: isPostsLoading,
    error,
    refetch,
  } = usePostsQuery();

  const createPost = useCreatePostMutation();
  const updatePost = useUpdatePostMutation();
  const deletePost = useDeletePostMutation();

  const [editingPost, setEditingPost] = useState<PostFormValues | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleDelete = (id: string) => deletePost.mutate(id);

  const handleCreate = (data: CreatePostDto) => {
    setIsCreateOpen(false);

    createPost.mutate(data, {
      onError: () => {
        setIsCreateOpen(true); // reopen so they don't lose the failed submission's context
      },
    });
  };

  const handleUpdate = (data: PostFormValues) => {
    const snapshot = editingPost;
    setEditingPost(null);

    updatePost.mutate(
      { id: data.id, data },
      {
        onError: () => {
          setEditingPost(snapshot);
        },
      },
    );
  };

  const renderContent = () => {
    if (isPostsLoading) return <SkeletonLoading />;
    if (error) return <ErrorPage />;
    if (!posts.length) {
      return (
        <div className="flex min-h-100 items-center justify-center">
          <Empty description="No posts found" />
        </div>
      );
    }
    return (
      <Row gutter={[20, 20]}>
        {posts.map((post) => (
          <Col xs={24} sm={12} lg={8} key={post.id}>
            <PostCard
              post={post}
              onEdit={setEditingPost}
              onDelete={handleDelete}
              isDeleting={
                deletePost.isPending && deletePost.variables === post.id
              }
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Title level={2} className="mb-1!">
                Posts
              </Title>
              <Text type="secondary">
                Browse the latest posts and their details.
              </Text>
            </div>
            <div className="flex items-center gap-3">
              <Button
                htmlType="button"
                onClick={(e) => {
                  e.preventDefault();
                  refetch();
                }}
              >
                Refetch
              </Button>
              <Button
                htmlType="button"
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCreateOpen(true);
                }}
              >
                Create Post
              </Button>
              <Tag color="blue" className="w-fit px-3 py-1">
                {posts.length} posts
              </Tag>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>

      <CreatePostModal
        open={isCreateOpen}
        loading={createPost.isPending}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreate}
      />

      <EditPostModal
        post={editingPost}
        open={!!editingPost}
        loading={updatePost.isPending}
        onClose={() => setEditingPost(null)}
        onSave={handleUpdate}
      />
    </main>
  );
};
