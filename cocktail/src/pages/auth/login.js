import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { accountService } from "../../_services/account.service";

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
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
    axios
      .post("https//localhost:8888/auth/login", credentials)
      .then((res) => {
        console.log(res);
        accountService.saveToken(res.data.access_token);
        navigate("/admin");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <div className="group">
          <label htmlFor="login"> Identifiant</label>
          <input
            type="text"
            name="email"
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
