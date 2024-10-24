// src/ProtectedRoute.js
import React, { useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore();

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [userRole, setUserRole] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userDoc = doc(firestore, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserRole(userSnapshot.data().role);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userRole === null) {
    return <div>Cargando...</div>; // Puedes mostrar un loader aquí
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
