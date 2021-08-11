import React, { Fragment, useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Pregunta = ({
  guardarPresupuesto,
  guardarRestante,
  actualizarPregunta,
}) => {
  // definir el state
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  // funcion para leer el presupuesto
  const definirPresupuesto = (e) => {
    guardarCantidad(parseInt(e.target.value, 10));
  };

  // submit para definir el presupuesto
  const agregarPresupuesto = (e) => {
    e.preventDefault();

    // validad datos
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true);
      return;
    }

    // si se pasa la validacion
    guardarError(false);
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    actualizarPregunta(false);
  };
  return (
    <Fragment>
      {error ? <Error mensaje="El presupuesto es correcto" /> : null}
      <h2>Coloca tu Presupuesto</h2>
      <form onSubmit={agregarPresupuesto}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ingresa tu Presupuesto Actual"
          onChange={definirPresupuesto}
        />
        <input
          type="submit"
          className="button-primary u-full-width"
          placeholder="Ingresa tu Presupuesto Actual"
          value="Definir el presupuesto"
        />
      </form>
    </Fragment>
  );
};

Pregunta.protoTypes = {
  guardarPresupuesto: PropTypes.func.isRequired,
  guardarRestante: PropTypes.func.isRequired,
  actualizarPregunta: PropTypes.func.isRequired,
};

export default Pregunta;
