import React from "react";
import { COLORES } from "../../styles/colores";
import { ESTILO_SECCION } from "../../styles/componentes";
import { TAMANOS, GROSOR } from "../../styles/tipografia";
import { ESPACIADO } from "../../styles/espaciado";

function Seccion({
  id,
  refSeccion,
  titulo,
  color,
  icono,
  children
}) {
  return (
    <div
      id={id}
      ref={refSeccion}
      style={{
        backgroundColor: COLORES.fondo,
        ...ESTILO_SECCION
      }}
    >
      <h2
          style={{
            color,
            fontSize: TAMANOS.xl,
            fontWeight: GROSOR.semibold,
            display: "flex",
            alignItems: "center",
            gap: ESPACIADO.sm,
            margin: 0,
            marginBottom: ESPACIADO.lg,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icono}
          </span>

          <span>{titulo}</span>
</h2>
      {children}
    </div>
  );
}

export default Seccion;