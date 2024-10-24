import React, { useState, useEffect, useReducer } from "react";
import { auth } from "./firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore"; // Asegúrate de importar estos métodos
import { Box, Typography } from "@mui/material";

import { colores } from "./themes/colores";
import avatares from "./assets/avatares.jpg";

const firestore = getFirestore();

const Dashboard = () => {
  const [institution, setInstitution] = useState("Instituto de Matemáticas");
  const [loading, setLoading] = useState(true);

  interface Perfil {
    nombre: string;
    institucion: string;
    grupo: string;
    role: string;
  }
  const perfilDefault: Perfil = {
    nombre: "Estudiante",
    institucion: "Instituto de Matemáticas",
    grupo: "Grupo 1",
    role: "Estudiante",
  };

  const reducer = (
    state: Perfil,
    action: { type: string; payload?: any }
  ): Perfil => {
    switch (action.type) {
      case "SET_NOMBRE":
        return { ...state, nombre: action.payload };
      case "SET_INSTITUCION":
        return { ...state, institucion: action.payload };
      case "SET_GRUPO":
        return { ...state, grupo: action.payload };
      case "SET_ROLE":
        return { ...state, role: action.payload };
      default:
        return state;
    }
  };

  const [perfil, setPerfil] = useReducer(reducer, perfilDefault);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userDocRef = doc(firestore, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setPerfil({ type: "SET_ROLE", payload: userDoc.data().role });
            setPerfil({ type: "SET_NOMBRE", payload: userDoc.data().name });
            setPerfil({ type: "SET_GRUPO", payload: userDoc.data().grupo });

            if (userDoc?.data().institucion) {
              const institutionDoc = await getDoc(userDoc?.data().institucion);

              if (institutionDoc.exists()) {
                setPerfil({
                  type: "SET_INSTITUCION",
                  payload: (institutionDoc.data() as { nombre: string }).nombre,
                });
              } else {
                console.error("No se encontró información de la institución.");
              }
            } else {
              console.error("No se encontró información de la institución.");
            }
          } else {
            console.error("No se encontró información del usuario.");
          }
        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
        }
      }
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Cargando...........</div>;
  }
  console.log(institution);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Box
        sx={{
          backgroundColor: colores.azul_secundario,
          width: "25%",
          height: "100vh",
          padding: "2rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box
            style={{
              backgroundImage: `url(${avatares})`,
              width: "110px",
              height: "90px",
              //TODO: Crear enum con ls pociciones de los avatares pra implementar el cambio de imagen
              backgroundPosition: "-3.55cm -0.8cm",
              backgroundSize: "350px",
              backgroundRepeat: "no-repeat",
              borderRadius: "50%",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: colores.crema_claro,
                lineHeight: "1.5rem",
                fontWeight: "Bold",
              }}
            >
              {perfil.nombre}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colores.crema_oscuro, fontWeight: "Bold" }}
            >
              {perfil.institucion}
            </Typography>
            <Typography variant="body1" sx={{ color: colores.crema_oscuro }}>
              {perfil.grupo}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <h1>Bienvenido a tu panel</h1>
        {perfil.role === "Admin" ? (
          <div>
            <h2>Contenido para Profesores</h2>
            <p>Puedes agregar o modificar cursos.</p>
          </div>
        ) : (
          <div>
            <h2>Contenido para Estudiantes</h2>
            <p>Puedes ver los cursos disponibles.</p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
