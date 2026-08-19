import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { deleteUser } from "../store/user-slice";

import { AppDispatch, RootState } from "../store/store";
import { User } from "../types";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.users.users);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user: User) => {
    const value = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone.includes(value)
    );
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (confirmed) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Card>
      <CardHeader
        title="Users"
        action={
          <Button
            component={Link}
            to="/users/add"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add User
          </Button>
        }
      />

      <CardContent>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Search users"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </Box>

        {filteredUsers.length === 0 ? (
          <Typography color="text.secondary">
            {users.length === 0
              ? "No users found."
              : "No users match your search."}
          </Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>UserId</TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>

                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>{user.phone}</TableCell>

                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          component={Link}
                          to={`/users/edit/${user.id}`}
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersPage;
