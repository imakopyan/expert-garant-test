import React, { useState } from "react";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (login === "admin" && password === "admin") {
      navigate("/report");
    } else {
      setError("Неверный логин или пароль (используй admin/admin)");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <TextField
        label="Логин"
        type="text"
        fullWidth
        margin="normal"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <TextField
        label="Пароль"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        sx={{ marginTop: "12px" }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Войти
      </Button>
      {error && (
        <Typography sx={{ marginTop: "12px" }} color="error" align="center">
          {error}
        </Typography>
      )}{" "}
      <Link
        href="/reset-password"
        style={{ display: "block", marginTop: "10px", textAlign: "center" }}
      >
        Забыли пароль?
      </Link>
    </Container>
  );
};

export default Login;
