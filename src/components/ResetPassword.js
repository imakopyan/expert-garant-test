import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (email) {
      setMessage("Сообщение о сбросе пароля отправлено на вашу почту.");
      setError("");
      setEmail("");
    } else {
      setError("Пожалуйста, введите ваш email.");
      setMessage("");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Сброс пароля
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        sx={{ marginTop: "12px" }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Отправить
      </Button>
      {message && (
        <Typography sx={{ marginTop: "12px" }} color="primary" align="center">
          {message}
        </Typography>
      )}{" "}
      {error && (
        <Typography sx={{ marginTop: "12px" }} color="error" align="center">
          {error}
        </Typography>
      )}{" "}
    </Container>
  );
};

export default ResetPassword;
