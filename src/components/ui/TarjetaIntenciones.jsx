{/*// // ------------------------------------------------------
// MOTOR DE INTENCIONES
//
// Interpreta el texto ingresado por el usuario para
// identificar una intención conocida.
//
// Responsabilidad:
//
// • Analizar el texto.
// • Devolver una intención o null.
//
// No genera recomendaciones.
// No consulta comercios.
// No conoce horarios.
//
// La decisión sobre cómo responder pertenece al
// Motor de Recomendaciones.
//
// Arquitectura:
// Esta capa representa el conocimiento semántico de la
// aplicación y podrá evolucionar en el futuro para
// incorporar IA manteniendo la misma interfaz.
// ------------------------------------------------------*/}
import { ESTILOS_INTENCION } from "../../styles/intenciones";
import { TAMANOS } from "../../styles/tipografia";
import { abrirCategoria } from "../../utils/motor_acciones";

function TarjetaIntencion({
    intencion,
    onSeleccionarCategoria
}) {

  const estiloIntencion = ESTILOS_INTENCION[intencion.ambiente];

  return (
    <div
      style={{
        background: estiloIntencion.fondo,
        borderLeft: `10px solid ${estiloIntencion.borde}`,
        borderRadius: "16px",
        padding: "18px",
        marginBottom: "20px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "18px",
          fontSize: TAMANOS.xxl,
          color: estiloIntencion.titulo
        }}
      >
        {intencion.icono} {intencion.titulo}
      </h3>

      <p
        style={{
          lineHeight: "1.6",
          fontSize: TAMANOS.md,
          marginBottom: "16px"
        }}
      >
        {intencion.mensaje}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        {intencion.categorias.map((categoria) => (
    <span
        key={categoria.nombre}
        onClick={() => {
            onSeleccionarCategoria(
                abrirCategoria(categoria.nombre)
            );
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
        }}

        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
        }}
        style={{
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: "white",
            padding: "8px 14px",
            borderRadius: "30px",
            fontWeight: "600",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "6px"
        }}
    >
        <span>{categoria.icono}</span>
        <span>{categoria.nombre}</span>
    </span>
        ))}
      </div>
    </div>
  );
}

export default TarjetaIntencion;