import { Input, Modal } from "antd";

import type { PostFormValues } from "../schema/post.schema";

type EditPostModalProps = {
  post: PostFormValues | null;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: () => void;
  onChange: (post: PostFormValues) => void;
};

export const EditPostModal = ({
  post,
  open,
  loading,
  onClose,
  onSave,
  onChange,
}: EditPostModalProps) => {
  if (!post) return null;

  return (
    <Modal
      title="Edit Post"
      open={open}
      onCancel={onClose}
      onOk={onSave}
      confirmLoading={loading}
      okText="Save Changes"
      okButtonProps={{ htmlType: "button" }}
    >
      <div className="space-y-4">
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
