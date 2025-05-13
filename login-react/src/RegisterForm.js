import React from "react";

function RegisterForm() {
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">


        {/* registratie Card */}
      <div className="card shadow p-4 text-center" style={{ minWidth: "350px" }}>
        <img
          src="/vitech_logo.png"
          alt="Vitech logo"
          className="mb-3"
          style={{ maxWidth: "150px", height: "auto", margin: "0 auto" }}
        />

        <h2 className="text-center mb-4">Registratie</h2>
        
        <form>
          <div className="mb-3">
            <label className="form-label">Gebruikersnaam</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Wachtwoord</label>
            <input type="password" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Herhaal Wachtwoord</label>
            <input type="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-success w-100">Account aanmaken</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
