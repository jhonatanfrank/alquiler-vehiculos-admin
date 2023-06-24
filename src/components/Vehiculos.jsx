import React, { useEffect, useState } from "react";
import "../style/Vehiculos.css";
import Spinner from "./Spinner";

const Vehiculos = (props) => {
  const [data, setData] = useState([]);
  const [estadodata, setEstadodata] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = "http://localhost:8080/alquilervehiculos/api/vehiculos";
    const username = "administrador@rentcars.pe";
    const password = "@Frank123";
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

  const truncateDescription = (description, limit) => {
    const words = description.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ...";
    }
    return description;
  };

  const handleUpdate = (id) => {
    // Lógica para actualizar el vehículo con el ID proporcionado
    console.log("Actualizar vehículo con ID:", id);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      // Realizar la eliminación en el backend o hacer una solicitud DELETE al servidor
      const url = `http://localhost:8080/alquilervehiculos/api/vehiculos/${id}`;

      fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + btoa(`${props.username}:${props.password}`),
        },
      })
        .then((response) => {
          if (response.ok) {
            // Eliminar el vehículo de la lista
            const updatedData = data.filter((vehiculo) => vehiculo.id !== id);
            setData(updatedData);
          } else {
            console.error("Error al eliminar el vehículo");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="content-wrapper pt-5">
        <div className="container">
          <h1 className="mx-auto text-center">Vehículos</h1>
          {estadodata ? (
            <>
              <div className="table-responsive mt-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Placa</th>
                      <th>Marca</th>
                      <th>Combustible</th>
                      <th>Modelo</th>
                      <th>Año</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Foto</th>
                      <th>Descripción</th>
                      <th>Opciones</th>

                      {/* Agrega más columnas según tus datos */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((vehiculo) => (
                      <tr key={vehiculo.id}>
                        <td>{vehiculo.id}</td>
                        <td>{vehiculo.placa}</td>
                        <td>{vehiculo.marca.marca}</td>
                        <td>{vehiculo.tipocombustible.tipocombustible}</td>
                        <td>{vehiculo.modelo}</td>
                        <td>{vehiculo.anio}</td>
                        <td>{vehiculo.precio}</td>
                        <td>{vehiculo.estado}</td>
                        <td className="foto-vehiculo-table">
                          <img
                            className="foto-vehiculo-table"
                            src={vehiculo.foto}
                            alt={vehiculo.foto}
                          />
                        </td>
                        <td>{truncateDescription(vehiculo.descripcion, 6)}</td>
                        <td>
                          <div
                            className="btn-group-vertical btn-group-sm"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button type="button" className="btn btn-dark">
                              Editar
                            </button>
                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={() => handleDelete(vehiculo.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <Spinner />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Vehiculos;
