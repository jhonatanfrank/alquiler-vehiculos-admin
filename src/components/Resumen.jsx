import React, { useEffect, useState } from "react";

const Resumen = (props) => {
  const [vehiculos, setVehiculos] = useState(0);
  const [vehiculosEstado1, setVehiculosEstado1] = useState(0);
  const [vehiculosEstado2, setVehiculosEstado2] = useState(0);
  const [vehiculosEstado3, setVehiculosEstado3] = useState(0);
  const [vehiculosEstado4, setVehiculosEstado4] = useState(0);
  const [showVehiculos, setShowVehiculos] = useState(false);
  const [vehiculosMostrados, setVehiculosMostrados] = useState([]);
  const [estadoActual, setEstadoActual] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/alquilervehiculos/api/vehiculos",
          {
            headers: {
              Authorization:
                "Basic " + btoa(`${props.username}:${props.password}`),
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setVehiculos(responseData);
          setVehiculosEstado1(
            responseData.filter((vehiculo) => vehiculo.estado === 1)
          );
          setVehiculosEstado2(
            responseData.filter((vehiculo) => vehiculo.estado === 2)
          );
          setVehiculosEstado3(
            responseData.filter((vehiculo) => vehiculo.estado === 3)
          );
          setVehiculosEstado4(
            responseData.filter((vehiculo) => vehiculo.estado === 4)
          );
        } else {
          alert("Error al ingresar. Intente nuevamente.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Llamada inicial al cargar el componente
    fetchData();

    // Llamada automática cada segundo
    const interval = setInterval(fetchData, 1000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  }, []);

  const filtrarVehiculos = (estado) => {
    setShowVehiculos(true);
    setEstadoActual(estado);
    switch (estado) {
      case 1:
        setVehiculosMostrados(vehiculosEstado1);
        break;
      case 2:
        setVehiculosMostrados(vehiculosEstado2);
        break;
      case 3:
        setVehiculosMostrados(vehiculosEstado3);
        break;
      case 4:
        setVehiculosMostrados(vehiculosEstado4);
        break;
      default:
        setVehiculosMostrados([]);
        break;
    }
  };

  const handleClick = async (id, placa, estado) => {
    console.log(
      "El vehículo con ID " +
        id +
        " y placa: " +
        placa +
        " cambia a estado: " +
        estado
    );

    try {
      const response = await fetch(
        `http://localhost:8080/alquilervehiculos/api/vehiculos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " + btoa(`${props.username}:${props.password}`),
          },
          body: JSON.stringify({ estado: estado }),
        }
      );

      if (response.ok) {
        console.log("Estado del vehículo actualizado exitosamente.");

        // Actualizar la lista de vehículos mostrados eliminando el vehículo actualizado
        setVehiculosMostrados((prevVehiculos) =>
          prevVehiculos.filter((vehiculo) => vehiculo.id !== id)
        );
      } else {
        console.log("Error al actualizar el estado del vehículo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div className="content-wrapper">
        <section className="content">
          <h1>Historial de vehículos</h1>
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3> {vehiculosEstado1.length}</h3>
                    <p>Vehículos libres</p>
                  </div>
                  <div
                    className="small-box-footer"
                    onClick={() => filtrarVehiculos(1)}
                  >
                    More info <i className="fas fa-arrow-circle-right" />
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{vehiculosEstado2.length}</h3>
                    <p>Vehículos ocupados</p>
                  </div>
                  <div
                    className="small-box-footer"
                    onClick={() => filtrarVehiculos(2)}
                  >
                    More info <i className="fas fa-arrow-circle-right" />
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{vehiculosEstado3.length}</h3>
                    <p>Vehículos en reserva</p>
                  </div>
                  <div
                    className="small-box-footer"
                    onClick={() => filtrarVehiculos(3)}
                  >
                    More info <i className="fas fa-arrow-circle-right" />
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{vehiculosEstado4.length}</h3>
                    <p>Vehículos en mantenimiento</p>
                  </div>
                  <div
                    className="small-box-footer"
                    onClick={() => filtrarVehiculos(4)}
                  >
                    More info <i className="fas fa-arrow-circle-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>
            Total de vehículos: <b>{vehiculos.length}</b>
          </p>
          <hr />
          <>
            {showVehiculos && (
              <div>
                {estadoActual === 1 ? <h1>Vehículos libres</h1> : null}
                {estadoActual === 2 ? <h1>Vehículos ocupados</h1> : null}
                {estadoActual === 3 ? <h1>Vehículos en reserva</h1> : null}
                {estadoActual === 4 ? (
                  <h1>Vehículos en mantenimiento</h1>
                ) : null}
                <ul>
                  <div className="contenedor-padre-vehiculos">
                    {vehiculosMostrados
                      .filter((vehiculo) => vehiculo.estado === estadoActual)
                      .map((vehiculo) => (
                        <>
                          <div className="contenedor-hijo-vehiculos contenedor-box-shadow">
                            <div className="imagen-caja">
                              <img
                                className="foto-vehiculos"
                                src={vehiculo.foto}
                                alt={vehiculo.marca.marca}
                              />
                            </div>
                            <div className="container p-3">
                              <div className="row">
                                <div className="col-6">
                                  <h5>Placa: </h5>
                                </div>
                                <div className="col-6">{vehiculo.placa}</div>
                                <div className="col-6">
                                  <h5>Precio: </h5>
                                </div>
                                <div className="col-6">${vehiculo.precio}</div>
                              </div>
                              <h5>Cambiar a:</h5>
                              <div
                                className="btn-group"
                                role="group"
                                aria-label="Basic example"
                              >
                                {estadoActual !== 1 ? (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() =>
                                      handleClick(
                                        vehiculo.id,
                                        vehiculo.placa,
                                        1
                                      )
                                    }
                                  >
                                    Libres
                                  </button>
                                ) : null}
                                {estadoActual !== 2 ? (
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                      handleClick(
                                        vehiculo.id,
                                        vehiculo.placa,
                                        2
                                      )
                                    }
                                  >
                                    Ocupados
                                  </button>
                                ) : null}
                                {estadoActual !== 3 ? (
                                  <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() =>
                                      handleClick(
                                        vehiculo.id,
                                        vehiculo.placa,
                                        3
                                      )
                                    }
                                  >
                                    Reserva
                                  </button>
                                ) : null}
                                {estadoActual !== 4 ? (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleClick(
                                        vehiculo.id,
                                        vehiculo.placa,
                                        4
                                      )
                                    }
                                  >
                                    Manteni.
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </ul>
              </div>
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default Resumen;
