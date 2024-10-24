// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import main from "./themes/main";

const App = () => {
  return (
    <ThemeProvider theme={main}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas según el rol */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="Estudiante">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/unauthorized"
            element={<div>No tienes acceso a esta página.</div>}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
