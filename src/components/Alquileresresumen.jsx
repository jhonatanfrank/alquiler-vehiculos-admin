import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Alquileresresumen = (props) => {
  const [data, setData] = useState([]);
  const [estadodata, setEstadodata] = useState(false);
  const [totalPrecioFinal, setTotalPrecioFinal] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/alquilervehiculos/api/alquileres",
          {
            headers: {
              Authorization:
                "Basic " + btoa(`${props.username}:${props.password}`),
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          setEstadodata(true);
        } else {
          alert("Error al ingresar. Intente nuevamente.");
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].preciofinal;
    }
    setTotalPrecioFinal(total);
  }, [data]);

  console.log(data);

  return (
    <>
      <div className="content-wrapper pt-5">
        <div className="container">
          <h1 className="mx-auto text-center">Todos nuestros alquileres</h1>
          {estadodata ? (
            <>
              <div className="table-responsive mt-5">
                <table className="table">
                  <>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Codigo alquiler</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Vehiculo</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>
                        <th>Dias</th>
                        <th>Estado</th>
                        <th>Precio final</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((alquileres, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{alquileres.codigoalquiler}</td>
                          <td>{alquileres.nombres}</td>
                          <td>{alquileres.apellidos}</td>
                          <td>{alquileres.vehiculo.placa}</td>
                          <td>
                            {new Date(
                              alquileres.fechainicio
                            ).toLocaleDateString("es-ES")}
                          </td>
                          <td>
                            {new Date(alquileres.fechafin).toLocaleDateString(
                              "es-ES"
                            )}
                          </td>
                          <td>{alquileres.diasalquiler}</td>
                          <td>
                            <div>
                              <span
                                className={
                                  alquileres.estadoatencion.nombre === "Nuevo"
                                    ? "rojo"
                                    : alquileres.estadoatencion.nombre ===
                                      "Tratando"
                                    ? "naranja"
                                    : "verde"
                                }
                              >
                                {alquileres.estadoatencion.nombre}
                              </span>
                            </div>
                          </td>
                          <td>${alquileres.preciofinal}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="9" className="text-end">
                          <b>Total:</b>
                        </td>
                        <td>
                          <b>${totalPrecioFinal}</b>
                        </td>
                      </tr>
                    </tfoot>
                  </>
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

export default Alquileresresumen;
