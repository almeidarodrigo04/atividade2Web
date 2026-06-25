import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Senha incorreta.");
      }

      login(data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-box__symbol">⚗️</div>
        <h1 className="login-box__title">Área Restrita</h1>
        <p className="login-box__subtitle">
          Apenas Annabelle Merigold pode entrar aqui.
        </p>
        <div className="login-box__form">
          <label className="form-label" htmlFor="password">
            Senha de acesso
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          {error && <p className="form-error">{error}</p>}
          <button
            className="btn btn--primary btn--full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </div>
        <button
          className="login-box__back"
          onClick={() => navigate("/")}
        >
          ← Voltar à loja
        </button>
      </div>
    </div>
  );
};

export default Login;
