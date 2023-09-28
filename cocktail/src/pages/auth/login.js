import React, { useState } from "react";
import "./auth.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };
  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <div className="group">
          <label htmlFor="login"> Identifiant</label>
          <input
            type="text"
            name="login"
            value={credentials.login}
            onChange={onChange}
          />
        </div>
        <div className="group">
          <label htmlFor="password"> Mot de passe</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button>Connexion</button>
      </form>
    </div>
  );
};

export default Login;
