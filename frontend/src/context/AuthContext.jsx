import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const SESSION_KEY = "authSession";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!session?.token);
  const [isAdmin, setIsAdmin] = useState(session?.user?.role === "admin" || session?.user?.role === "superadmin");
  const [user, setUser] = useState(session?.user || null);

  // Update derived state when session changes
  useEffect(() => {
    setIsAuthenticated(!!session?.token);
    setIsAdmin(session?.user?.role === "admin" || session?.user?.role === "superadmin");
    setUser(session?.user || null);
  }, [session]);

  // Listen for forced logout from Axios interceptor
  const handleForceLogout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  useEffect(() => {
    window.addEventListener("auth:logout", handleForceLogout);
    return () => window.removeEventListener("auth:logout", handleForceLogout);
  }, [handleForceLogout]);

  function login(authData) {
    const newSession = {
      token: authData.token,
      user: authData.user,
      ts: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }

  function getToken() {
    return session?.token || null;
  }

  const value = {
    session,
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;