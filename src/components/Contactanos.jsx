import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Contactanos = (props) => {
  const [data, setData] = useState([]);
  const [estadodata, setEstadodata] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = "http://localhost:8080/alquilervehiculos/api/contactanos";

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${props.username}:${props.password}`),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setEstadodata(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(data);
  return (
    <div className="content-wrapper pt-5">
      <div className="container">
        <h1 className="mx-auto text-center">Contactanos</h1>
        <div className="table-responsive">
          <div className="table-responsive pt-5">
            {estadodata ? (
              <>
                {" "}
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Email</th>
                      <th>Celular</th>
                      <th>Comentarios</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombres}</td>
                        <td>{item.apellidos}</td>
                        <td>{item.email}</td>
                        <td>{item.celular}</td>
                        <td>{item.comentarios}</td>
                        <td>
                          <div>
                            <span
                              className={
                                item.estadoatencion.nombre === "Nuevo"
                                  ? "rojo"
                                  : item.estadoatencion.nombre === "Tratando"
                                  ? "naranja"
                                  : "verde"
                              }
                            >
                              {item.estadoatencion.nombre}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <Spinner />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactanos;
