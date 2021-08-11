import React, { useState } from "react";
import Error from "./Error";
import shortid from "shortid";
import PropTypes from "prop-types";

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
  const [nombre, guardaNombre] = useState("");
  const [cantidad, guardadCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  // cuando el usuario agrega un gasto
  const agregarGasto = (e) => {
    e.preventDefault();
    // validar

    if (cantidad < 1 || isNaN(cantidad) || nombre.trim === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    // construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate(),
    };
    // Pasar el gasto al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);
    // resetear el formulario
    guardaNombre("");
    guardadCantidad(0);
  };
  return (
    <form onSubmit={agregarGasto}>
      <h2>Agregar sus Gastos</h2>
      {error ? (
        <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" />
      ) : null}
      <div className="campo">
        <label>Nombre del gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ejemplo: Tranporte"
          value={nombre}
          onChange={(e) => guardaNombre(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Cantidad de Gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ejemplo: 300"
          value={cantidad}
          onChange={(e) => {
            if (isNaN(parseInt(e.target.value, 10))) {
              guardadCantidad(0);
            } else {
              guardadCantidad(parseInt(e.target.value, 10));
            }
            return;
          }}
        />
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
      />
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
};
export default Formulario;
