import { Input, InputNumber, Modal } from "antd";
import type { CreatePostDto } from "../schema/post.schema";

type CreatePostModalProps = {
  open: boolean;
  loading: boolean;
  post: CreatePostDto;
  onClose: () => void;
  onSave: () => void;
  onChange: (post: CreatePostDto) => void;
};

export const CreatePostModal = ({
  open,
  loading,
  post,
  onClose,
  onSave,
  onChange,
}: CreatePostModalProps) => {
  return (
    <Modal
      title="Create Post"
      open={open}
      onCancel={onClose}
      onOk={onSave}
      confirmLoading={loading}
      okText="Create Post"
      okButtonProps={{ htmlType: "button" }}
    >
      <div className="space-y-4">
        <InputNumber
          className="!w-full"
          placeholder="User ID"
          value={post.userId}
          onChange={(value) =>
            onChange({
              ...post,
              userId: value ?? 1,
            })
          }
        />

        <Input
          placeholder="Post title"
          value={post.title}
          onChange={(event) =>
            onChange({
              ...post,
              title: event.target.value,
            })
          }
        />

        <Input.TextArea
          rows={5}
          placeholder="Post body"
          value={post.body}
          onChange={(event) =>
            onChange({
              ...post,
              body: event.target.value,
            })
          }
        />
      </div>
    </Modal>
  );
};
