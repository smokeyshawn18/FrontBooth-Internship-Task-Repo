import { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import type { FormValues } from "../types";

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function SignUpForm() {
  const renderCount = useRef(0);
  renderCount.current++;

  console.log(`[useState] SignUpForm rendered #${renderCount.current}`);

  const [form, setForm] = useState<FormValues>({
    name: "",
    email: "",
    age: 18,
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("[useState] SignUpForm mounted");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    console.log(`[useState] ${name} changed:`, value);

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    }

    if (form.age < 18) {
      newErrors.age = "You must be at least 18";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    console.log("[useState] validation:", newErrors);

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("[useState] SUBMIT clicked");

    if (!validate()) {
      console.log("[useState] submission blocked");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("[useState] submitting data:", form);

      // await api.signup(form);

      alert(JSON.stringify(form, null, 2));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
      <Typography variant="h5">useState Form</Typography>

      <Typography variant="caption">
        Render count: {renderCount.current}
      </Typography>

      <TextField
        name="name"
        label="Name"
        value={form.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />

      <TextField
        name="email"
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <TextField
        name="age"
        label="Age"
        type="number"
        value={form.age}
        onChange={handleChange}
        error={!!errors.age}
        helperText={errors.age}
        fullWidth
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Sign up"}
      </Button>
    </Box>
  );
}
