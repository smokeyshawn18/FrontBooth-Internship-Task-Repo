import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Modal } from "antd";
import { PostSchema, type PostFormValues } from "../schema/post.schema";

type EditPostModalProps = {
  post: PostFormValues | null;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: PostFormValues) => void;
};

export const EditPostModal = ({
  post,
  open,
  loading,
  onClose,
  onSave,
}: EditPostModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: post ?? undefined,
  });

  useEffect(() => {
    if (post) reset(post);
  }, [post, reset]);

  if (!post) return null;

  const submit = handleSubmit((data) => {
    onSave(data);
  });

  return (
    <Modal
      title="Edit Post"
      open={open}
      onCancel={onClose}
      onOk={submit}
      confirmLoading={loading}
      okText="Save Changes"
      okButtonProps={{ htmlType: "button" }}
    >
      <div className="space-y-4">
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Post title"
                status={errors.title ? "error" : undefined}
                {...field}
              />
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                rows={5}
                placeholder="Post body"
                status={errors.body ? "error" : undefined}
                {...field}
              />
            )}
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-500">{errors.body.message}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};
