import { Button, Card, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

import type { PostFormValues } from "../schema/post.schema";

const { Title, Paragraph, Text } = Typography;

type PostCardProps = {
  post: PostFormValues;
  onEdit: (post: PostFormValues) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

export const PostCard = ({
  post,
  onEdit,
  onDelete,
  isDeleting,
}: PostCardProps) => {
  return (
    <Card hoverable className="h-full overflow-hidden !rounded-xl p-20">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <Tag color="blue">#{post.id}</Tag>

          <div className="flex items-center gap-1.5 text-gray-500">
            <UserOutlined className="text-xs" />

            <Text type="secondary">User {post.userId}</Text>
          </div>
        </div>

        <Title level={4} className="!mb-2 line-clamp-2 !text-lg">
          {post.title}
        </Title>

        <Paragraph type="secondary" ellipsis={{ rows: 3 }} className="!mb-5">
          {post.body}
        </Paragraph>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <Text type="secondary" className="text-xs">
            Post #{post.id}
          </Text>

          <div className="flex gap-2">
            <Button
              size="small"
              icon={<EditOutlined />}
              htmlType="button"
              onClick={(e) => {
                e.preventDefault();
                onEdit(post);
              }}
            >
              Edit
            </Button>

            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              loading={isDeleting}
              htmlType="button"
              onClick={(e) => {
                e.preventDefault();
                onDelete(post.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
