import React, { useState } from "react";
import RegisterLink from "./RegisterLink"; // bovenaan toevoegen
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Vul alstublieft alle velden in.");
      return;
    }

    try {
      const res = await axios.post("http://localhost/Gezondheidapplicatie_project4/backend/login.php", {
        username,
        password
      });

      if (res.data.success) {
        setMessage("Goed" + res.data.message);
      } else {
        setMessage("fout" + res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Serverfout");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 text-center" style={{ minWidth: "350px" }}>
        {/* Logo */}
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

          <button type="submit" className="btn btn-danger w-100">Login</button>
        </form>

        {message && <p className="mt-3 text-danger">{message}</p>}
        </div>    
        {message && <p className="mt-3 text-danger">{message}</p>}

{/* Nieuwe component hier tonen */}
<RegisterLink />
      

    </div>
  );
}

export default LoginForm;
