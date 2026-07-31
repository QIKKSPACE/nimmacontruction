import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types";
import { API } from "../lib/api";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("nimma_admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("nimma_jwt_token");
  });

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await response.json();

      if (response.ok && data.status && data.token) {
        const loggedUser: User = data.user;
        setUser(loggedUser);
        setToken(data.token);
        localStorage.setItem("nimma_admin_user", JSON.stringify(loggedUser));
        localStorage.setItem("nimma_jwt_token", data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Invalid email or password." };
      }
    } catch (err: any) {
      // Fallback for local development if server/database is offline
      if (email === "admin@nimmametro.com" && pass === "admin123") {
        const loggedUser: User = {
          id: "usr-1",
          name: "Admin User",
          email: email,
          role: "Super Admin",
        };
        setUser(loggedUser);
        setToken("demo-jwt-fallback-token");
        localStorage.setItem("nimma_admin_user", JSON.stringify(loggedUser));
        localStorage.setItem("nimma_jwt_token", "demo-jwt-fallback-token");
        return { success: true };
      }
      return {
        success: false,
        message: "Server connection error. Please ensure XAMPP Apache & MySQL are running.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("nimma_admin_user");
    localStorage.removeItem("nimma_jwt_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
