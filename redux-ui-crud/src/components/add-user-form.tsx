import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema, UserFormData } from "../schema/user.schema";
import { UserFormProps } from "../types";
import { DEFAULT_VALUES } from "../constants";

const UserForm: React.FC<UserFormProps> = ({
  title,
  submitText,
  initialData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),

    defaultValues: initialData ?? DEFAULT_VALUES,
  });

  useEffect(() => {
    reset(initialData ?? DEFAULT_VALUES);
  }, [initialData, reset]);

  return (
    <Card>
      <CardHeader title={title} />

      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            label="Phone"
            fullWidth
            {...register("phone")}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
          >
            {submitText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserForm;
