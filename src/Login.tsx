// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebase"; // Asegúrate de que la importación sea correcta
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

import login_img from "./assets/Login_Image.png";
import favicon_APT from "./assets/favicon_APT.png";

import "./App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password); // Asegúrate de que esta línea esté bien
      navigate("/dashboard"); // Redirige a la página de Dashboard después del inicio de sesión
    } catch (error) {
      toast.error("Usuario o clave incorrectos", {
        position: "bottom-left",
        theme: "colored",
      });
      console.error("Error en el inicio de sesión:", (error as any).message);
    }
  };

  //TODO: cambiar los colores usando el tema creado

  return (
    <Grid container spacing={2} sx={{ width: "100%", display: "flex" }}>
      <Grid size={5}>
        <ToastContainer />
        <Typography variant="h2" component="h1" sx={{ m: 3 }}>
          Algebra para todos
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4rem",
            mt: "6rem",
          }}
        >
          <img src={favicon_APT} alt="favicon APT " style={{ width: "20%" }} />
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              margin: "auto",
              gap: "1rem",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                background: "#FDFCDC",
                border: "none",
                padding: "10px 015px",
                borderRadius: "15px",
                color: "#00AFB9",
                fontWeight: "bolder",
                fontSize: "1rem",
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              style={{
                background: "#FDFCDC",
                border: "none",
                padding: "10px 015px",
                borderRadius: "15px",
                color: "#00AFB9",
                fontWeight: "bolder",
                fontSize: "1rem",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
              <button
                type="submit"
                style={{
                  background: "#0081A7",
                  border: "none",
                  padding: "10px 015px",
                  borderRadius: "15px",
                  color: "#FFFFFF",
                  fontWeight: "bolder",
                  fontSize: "1rem",
                  width: "80%",
                }}
              >
                Ingresar
              </button>
            </Box>
          </form>
        </Box>
      </Grid>
      <Grid size={7}>
        <img
          style={{ width: "100%", maxHeight: "100vh" }}
          src={login_img}
          alt="Imagen de login, niños aprendiendo matemáticas"
        />
      </Grid>
    </Grid>
  );
};

export default Login;
