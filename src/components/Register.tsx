import React, { useState } from "react";
import { useAppDispatch, useAppSelector, } from "../store";
import { registerUser } from "../store/userSlice";
import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <TextField
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        style={{
          padding: "10px 20px",
          marginTop: "10px",
        }}
        fullWidth
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
      {error && (
        <Typography color="error" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
    </form>
  );
};

export default Register;
