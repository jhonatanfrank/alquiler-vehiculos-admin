import React, { useEffect, useState } from "react";
import "../style/Vehiculos.css";

const Vehiculos = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = "http://localhost:8080/alquilervehiculos/api/vehiculos";
    const username = "admin";
    const password = "123";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${props.username}:${props.password}`),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <div className="content-wrapper">
        <h2>Tabla de Vehículos</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Opciones</th>
                <th>ID</th>
                <th>Placa</th>
                <th>Marca</th>
                <th>Combustible</th>
                <th>Tipo Manejo</th>
                <th>Tipo Carro</th>
                <th>Tapizado Asientos</th>
                <th># De Asientos</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Foto</th>
                <th>Descripción</th>
                {/* Agrega más columnas según tus datos */}
              </tr>
            </thead>
            <tbody>
              {data.map((vehiculo) => (
                <tr key={vehiculo.id}>
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
                  <td>{vehiculo.id}</td>
                  <td>{vehiculo.placa}</td>
                  <td>{vehiculo.marca.marca}</td>
                  <td>{vehiculo.tipocombustible.tipocombustible}</td>
                  <td>{vehiculo.tipomanejo.tipomanejo}</td>
                  <td>{vehiculo.tipocarro.tipocarro}</td>
                  <td>{vehiculo.tapizadoasientos.tapizadoasientos}</td>
                  <td>{vehiculo.asientos}</td>
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
                  <td>{vehiculo.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Vehiculos;
