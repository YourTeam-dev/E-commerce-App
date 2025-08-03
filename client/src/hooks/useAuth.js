import { useState, useEffect } from "react";

export default function useAuth() {
  const [token, setToken] = useState(null);

  const loadToken = () => {
    if (localStorage.getItem("token"))
      setToken(JSON.parse(localStorage.getItem("token")));
    else setToken(null);
  };

  const login = (tokenData) => {
    localStorage.setItem("token", JSON.stringify(tokenData));
    setToken(tokenData);
    window.dispatchEvent(new Event("auth-changed"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.dispatchEvent(new Event("auth-changed"));
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    loadToken();

    const handleAuthChange = () => loadToken();
    window.addEventListener("auth-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return { token, isAuthenticated, login, logout };
}
