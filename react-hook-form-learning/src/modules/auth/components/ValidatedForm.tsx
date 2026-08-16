import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import type { FormValues } from "../../test/types";

export function AuthFormRHF() {
  const renderCount = useRef(0);
  renderCount.current++;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", age: 18, password: "" },
    mode: "onTouched",
  });

  console.log(`[RHF] rendered #${renderCount.current}`);

  useEffect(() => {
    console.log(
      "[RHF] touchedFields:",
      JSON.parse(JSON.stringify(touchedFields)),
    );
  }, [touchedFields]);

  useEffect(() => {
    console.log("[RHF] dirtyFields:", JSON.parse(JSON.stringify(dirtyFields)));
  }, [dirtyFields]);

  const onSubmit = async (data: FormValues) => {
    console.log("[RHF] SUBMIT:", data);
    alert(JSON.stringify(data, null, 2));
  };

  const fieldHelperText = (field: keyof FormValues) =>
    touchedFields[field] && errors[field]?.message
      ? errors[field]?.message
      : " ";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        mt: 10,
        p: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5">RHF Form</Typography>
      <Typography variant="caption" color="text.secondary">
        Renders: {renderCount.current}
      </Typography>

      <TextField
        label="Name"
        {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Min 3 characters" },
        })}
        error={!!errors.name && touchedFields.name}
        helperText={fieldHelperText("name")}
        onChange={(e) => console.log("[RHF] name typed:", e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email && touchedFields.email}
        helperText={fieldHelperText("email")}
        onChange={(e) => console.log("[RHF] email typed:", e.target.value)}
      />
      <TextField
        label="Age"
        type="number"
        {...register("age", {
          valueAsNumber: true,
          required: "Age is required",
          min: { value: 18, message: "Must be at least 18" },
          max: { value: 100, message: "Must be under 100" },
        })}
        error={!!errors.age && touchedFields.age}
        helperText={fieldHelperText("age")}
        onChange={(e) => console.log("[RHF] age typed:", e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Min 6 characters" },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)/,
            message: "Needs a letter and a number",
          },
        })}
        error={!!errors.password && touchedFields.password}
        helperText={fieldHelperText("password")}
        onChange={(e) => console.log("[RHF] password typed:", e.target.value)}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Sign up"}
      </Button>
    </Box>
  );
}
