import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Resumen from "./components/Resumen";
import Alquilerresumen from "./components/Alquileresresumen";
import Vehiculos from "./components/Vehiculos";

import "../src/App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [estado, setEstado] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setEstado(true);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:8080/alquilervehiculos/api/alquileres",
      {
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      setData(responseData);
      setEstado(true);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      alert("Error al ingresar. Intente nuevamente :).");
    }
  };

  const handleLogout = () => {
    setEstado(false);
    setData(null);
    setUsername("");
    setPassword("");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  return (
    <>
      <BrowserRouter>
        {estado ? (
          <>
            <Header handleLogout={handleLogout} />
            <Aside />
            <Routes>
              <Route
                path="/"
                element={<Resumen username={username} password={password} />}
              />
              <Route
                path="/alquileres-resumen"
                element={
                  <Alquilerresumen username={username} password={password} />
                }
              />
              <Route
                path="/mantenimiento-vehiculos"
                element={<Vehiculos username={username} password={password} />}
              />
            </Routes>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center">
              <div className="login">
                <form onSubmit={handleSubmit}>
                  <p>Por favor, ingrese a su cuenta</p>
                  <div className="form-outline mb-4">
                    <label>Username</label>
                    <input
                      className="form-control"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                      type="submit"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
