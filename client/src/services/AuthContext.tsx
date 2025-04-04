import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
  id: string | null;
}

const authContext = createContext<AuthProps>({
  role: "anonymous",
  setRole: () => {},
  id: null,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  useEffect(() => {
    // Récupération de l'ID utilisateur depuis le cookie
    const idFromCookie = Cookies.get("id");
    if (idFromCookie) {
      setId(idFromCookie);
    }
  }, []);

  return (
    <authContext.Provider value={{ role, setRole, id }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Le auth context doit exister");
  }

  return context;
}
