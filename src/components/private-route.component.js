import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/user.provider";

// zajistí přesměrování na login page pokud se nepřihlášený uživatel pokouší dostat na stranu která vyžaduje přihlášení
export default function PrivateRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to={`/login`} />;
}
