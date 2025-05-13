import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://145.93.49.113:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Succesvol ingelogd:", data);
        localStorage.setItem("token", data.token);
        setMessage("Inloggen geslaagd!");
        // dashboard
      } else {
        const errorData = await response.json();
        console.error("Fout bij inloggen:", errorData);
        setMessage(errorData.message || "Inloggen mislukt");
      }
    } catch (error) {
      console.error("Netwerkfout:", error);
      setMessage("Server niet bereikbaar. Probeer opnieuw.", error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
      <div className="card shadow p-4 text-center" style={{ minWidth: "350px" }}>
        <img
          src="/vitech_logo.png"
          alt="Vitech logo"
          className="mb-3"
          style={{ maxWidth: "150px", height: "auto", margin: "0 auto" }}
        />

        <h2 className="mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Gebruikersnaam</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Wachtwoord</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Even geduld..." : "Login"}
          </button>
        </form>

        {message && <p className="mt-3 text-danger">{message}</p>}
      </div>

      <div className="mt-4 text-center">
        <p>
          Heb je nog geen account?
          <Link to="/register" className="ms-2 text-primary fw-bold">
            Maak een nieuwe account aan!!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
