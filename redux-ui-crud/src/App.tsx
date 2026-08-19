import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EdituserPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Management
          </Typography>

          <Button component={Link} to="/" color="inherit">
            Users
          </Button>

          <Button component={Link} to="/users/add" color="inherit">
            Add User
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/users/add" replace />} />

            <Route path="/users" element={<UsersPage />} />

            <Route path="/users/add" element={<AddUserPage />} />

            <Route path="/users/edit/:id" element={<EditUserPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
};

export default App;
