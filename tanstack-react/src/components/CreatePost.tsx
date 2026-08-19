import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputNumber, Modal } from "antd";
import { CreatePostSchema, type CreatePostDto } from "../schema/post.schema";

type CreatePostModalProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: CreatePostDto) => void;
};

const defaultValues: CreatePostDto = { userId: 1, title: "", body: "" };

export const CreatePostModal = ({
  open,
  loading,
  onClose,
  onSave,
}: CreatePostModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostDto>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues,
  });

  // reset the form each time the modal opens, so stale values don't linger
  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  const submit = handleSubmit((data) => {
    onSave(data);
  });

  return (
    <Modal
      title="Create Post"
      open={open}
      onCancel={onClose}
      onOk={submit}
      confirmLoading={loading}
      okText="Create Post"
      okButtonProps={{ htmlType: "button" }}
    >
      <div className="space-y-4">
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <InputNumber
              className="w-full!"
              placeholder="User ID"
              value={field.value}
              onChange={(value) => field.onChange(value ?? 1)}
            />
          )}
        />

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
