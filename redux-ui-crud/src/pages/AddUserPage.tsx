import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import UserForm from "../components/add-user-form";
import { addUser } from "../store/user-slice";
import { UserFormData } from "../schema/user.schema";

const AddUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (data: UserFormData) => {
    dispatch(addUser(data));
    navigate("/users");
  };

  return (
    <UserForm
      title="Add New User"
      submitText="Add User"
      onSubmit={handleSubmit}
    />
  );
};

export default AddUserPage;
