import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import type { FormValues } from "../types";
import { Box, Button, TextField, Typography } from "@mui/material";

export function AuthForm() {
  const renderCount = useRef(0);
  renderCount.current++;

  console.log(`[RHF] AuthForm rendered #${renderCount.current}`);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      age: 18,
      password: "",
    },
  });

  useEffect(() => {
    console.log("[RHF] AuthForm mounted");
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log("[RHF] SUBMIT:", data);

    alert(JSON.stringify(data, null, 2));
  };

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

      <Typography variant="caption">
        Render count: {renderCount.current}
      </Typography>

      <TextField
        label="Name"
        {...register("name", {
          required: "Name is required",
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
        onChange={(e) => {
          console.log("[RHF] name changed:", e.target.value);
        }}
      />

      <TextField
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        onChange={(e) => {
          console.log("[RHF] email changed:", e.target.value);
        }}
      />

      <TextField
        label="Age"
        type="number"
        {...register("age", {
          valueAsNumber: true,
          min: {
            value: 18,
            message: "You must be at least 18",
          },
        })}
        error={!!errors.age}
        helperText={errors.age?.message}
        onChange={(e) => {
          console.log("[RHF] age changed:", e.target.value);
        }}
      />

      <TextField
        label="Password"
        type="password"
        {...register("password", {
          required: "Password is required",
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        onChange={(e) => {
          console.log("[RHF] password changed:", e.target.value);
        }}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Sign up"}
      </Button>
    </Box>
  );
}
