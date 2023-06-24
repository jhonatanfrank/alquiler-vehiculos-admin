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
    const confirmAction = window.confirm(
      `¿Estás seguro que desea realizar el cambio del vehiculo con placa ${placa}?`
    );

    if (confirmAction) {
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
      console.log(
        "El vehículo con ID " +
          id +
          " y placa: " +
          placa +
          " cambia a estado: " +
          estado
      );
    }
  };

  return (
    <div>
      <div className="content-wrapper pt-5 pr-5 pl-5">
        <section className="content">
          <h1>Historial de vehículos</h1>
          <div className="container-fluid mt-4">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner" onClick={() => filtrarVehiculos(1)}>
                    <h3> {vehiculosEstado1.length}</h3>
                    <p>Vehículos libres</p>
                  </div>
                  <div className="small-box-footer">
                    Más información <i className="fas fa-arrow-circle-right" />
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner" onClick={() => filtrarVehiculos(2)}>
                    <h3>{vehiculosEstado2.length}</h3>
                    <p>Vehículos entregados</p>
                  </div>
                  <div className="small-box-footer">
                    Más información <i className="fas fa-arrow-circle-right" />{" "}
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner" onClick={() => filtrarVehiculos(3)}>
                    <h3>{vehiculosEstado3.length}</h3>
                    <p>Vehículos en reserva</p>
                  </div>
                  <div className="small-box-footer">
                    Más información <i className="fas fa-arrow-circle-right" />{" "}
                  </div>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner" onClick={() => filtrarVehiculos(4)}>
                    <h3>{vehiculosEstado4.length}</h3>
                    <p>Vehículos en mantenimiento</p>
                  </div>
                  <div className="small-box-footer">
                    Más información <i className="fas fa-arrow-circle-right" />{" "}
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
                {estadoActual === 1 ? <h3>Vehículos libres</h3> : null}
                {estadoActual === 2 ? <h3>Vehículos entregados</h3> : null}
                {estadoActual === 3 ? <h3>Vehículos en reserva</h3> : null}
                {estadoActual === 4 ? (
                  <h1>Vehículos en mantenimiento</h1>
                ) : null}
                <ul>
                  {vehiculosMostrados.filter(
                    (vehiculo) => vehiculo.estado === estadoActual
                  ).length === 0 && (
                    <div className="pt-5">
                      <h5 className="text-center">
                        Actualmente no hay vehiculos en este estado
                      </h5>
                      <div className="pt-5 d-flex justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="150"
                          height="150"
                          fill="currentColor"
                          class="bi bi-tools"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
                        </svg>
                      </div>
                    </div>
                  )}
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
