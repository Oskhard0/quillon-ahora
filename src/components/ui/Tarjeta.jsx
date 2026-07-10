import { COLORES } from "../../styles/colores";
import {
  ESTILO_TARJETA,
  SOMBRAS,
  TRANSICIONES
} from "../../styles/componentes";

function Tarjeta({
  color,
  children,
  onClick
}) {

  return (

    <div
      onClick={onClick}
      style={{
        ...ESTILO_TARJETA,
        backgroundColor: COLORES.fondo,
        borderTop: `4px solid ${color}`,
        boxShadow: SOMBRAS.tarjeta,
        transition: TRANSICIONES.rapida,
        cursor: onClick ? "pointer" : "default"
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          SOMBRAS.hover;
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          SOMBRAS.tarjeta;
      }}

    >

      {children}

    </div>

  );

}

export default Tarjeta;