import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import UserForm from "../components/add-user-form";

import { updateUser } from "../store/user-slice";

import { AppDispatch, RootState } from "../store/store";
import { UserFormData } from "../schema/user.schema";

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === id),
  );

  if (!user) {
    return <Typography color="error">User not found.</Typography>;
  }

  const initialData: UserFormData = {
    name: user.name,
    email: user.email,
    phone: user.phone,
  };

  const handleSubmit = (data: UserFormData) => {
    dispatch(
      updateUser({
        id: user.id,
        ...data,
      }),
    );

    navigate("/users");
  };

  return (
    <UserForm
      title="Edit User"
      submitText="Update User"
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
};

export default EditUserPage;
