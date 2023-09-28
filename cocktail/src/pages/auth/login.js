import React from "react";
import "./auth.css";

const Login = () => {
  return (
    <div className="Login">
      <form>
        <div className="group">
          <label htmlFor="login"> Identifiant</label>
          <input type="text" name="login" />
        </div>
        <div className="group">
          <label htmlFor="password"> Mot de passe</label>
          <input type="password" name="password" />
        </div>

        <button>Connexion</button>
      </form>
    </div>
  );
};

export default Login;
