import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { registerUser } from "../store/userSlice";

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "80%" }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "80%" }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "80%" }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
