import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFormData } from "../schema/user.schema";
import { User } from "../types";

interface UserState {
  users: User[];
}

const loadUsers = (): User[] => {
  const savedUsers = localStorage.getItem("");

  if (!savedUsers) {
    return [];
  }

  try {
    return JSON.parse(savedUsers);
  } catch {
    throw new Error("User not found");
  }
};

const initialState: UserState = {
  users: loadUsers(),
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    addUser: (state, action: PayloadAction<UserFormData>) => {
      const newUser: User = {
        id: crypto.randomUUID().toString().substring(2, 8),
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        createdAt: new Date().toISOString(),
      };

      state.users.push(newUser);
    },

    updateUser: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        phone: string;
      }>,
    ) => {
      const user = state.users.find((user) => user.id === action.payload.id);

      if (!user) return;

      user.name = action.payload.name;
      user.email = action.payload.email;
      user.phone = action.payload.phone;
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
