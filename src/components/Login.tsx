import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { loginUser } from "../store/userSlice";
import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import { RootState } from "../store"; // Adjust path as necessary

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(form));
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
        color="primary"
        style={{
          padding: "10px 20px",
          marginTop: "10px",
        }}
        fullWidth
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
      {error && (
        <Typography color="error" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
    </form>
  );
};

export default Login;
