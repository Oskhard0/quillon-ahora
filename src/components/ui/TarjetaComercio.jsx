import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaPhoneAlt,
  FaCompass,
  FaClock
} from "react-icons/fa";
import { ICONOS_UI } from "./Iconos";
import { COLORES, COLORES_SECCION } from "../../styles/colores";
import {
  ESTILO_TARJETA,
  SOMBRAS,
  TRANSICIONES
} from "../../styles/componentes";
import { useState } from "react";
import { TAMANOS, GROSOR } from "../../styles/tipografia";
import {
  estaAbierto,
  formatearHorario,
  formatearHorarioHoy,
  obtenerEstadoHorario
} from "../../utils/horarios";

function TarjetaComercio({
  comercio,
  expandida,
  onClick
}) {

  

  if (!comercio) return null;
  const [mostrarHorario, setMostrarHorario] = useState(false);
  const estado = obtenerEstadoHorario(comercio.horario);

  const horarioMostrado = comercio.horario
  ? formatearHorarioHoy(comercio.horario)
  : comercio.Horario;

  const horarioSemanal = comercio.horario
  ? formatearHorario(comercio.horario)
  : [];

const estadoHorario = obtenerEstadoHorario(comercio.horario);


const abiertoAhora = estadoHorario.abierto;
  
    

  function llamarTelefono(e) {
  e.stopPropagation();
  if (!comercio.telefono) return;
  window.location.href = `tel:${comercio.telefono}`;

}

function abrirWhatsApp(e) {

  e.stopPropagation();

  if (!comercio.whatsapp) return;

  const numero = comercio.whatsapp.replace(/\D/g, "");

  window.open(
    `https://wa.me/${numero}`,
    "_blank"
  );

}

  const IconoMapa = ICONOS_UI.mapa;
  const IconoTelefono = ICONOS_UI.telefono;
  const IconoHorario = ICONOS_UI.horario;
  const IconoReferencia = ICONOS_UI.referencia;
  const IconoDestacado = ICONOS_UI.destacado;
  const IconoChevronDown = ICONOS_UI.chevronDown;
  const IconoChevronUp = ICONOS_UI.chevronUp;

  return (

    <div
      id={`comercio-${comercio.id}`}
      onClick={onClick}      
      style={{
        ...ESTILO_TARJETA,
        backgroundColor: COLORES.fondo,        
        boxShadow: SOMBRAS.tarjeta,
        transition: TRANSICIONES.rapida,
        cursor: "pointer"
      }}
    >

      {/* CABECERA */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}
      >

        {/* LADO IZQUIERDO */}

        <div
          style={{
            display: "flex",
            gap: "6px",
            flex: 1
          }}
        >

          {/* Estado */}

          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              marginTop: "6px",
              flexShrink: 0,
              transition: TRANSICIONES.despliegue,
              backgroundColor: abiertoAhora
                ? COLORES.exito
                : COLORES.peligro,
              boxShadow: expandida
                ? SOMBRAS.tarjetaElevada
                : SOMBRAS.tarjeta
            }}
          />

          {/* Nombre + Dirección */}

          <div>

            <div
              style={{
                fontSize: TAMANOS.lg,
                fontWeight: expandida
                  ? GROSOR.bold
                  : GROSOR.semibold,

                color: expandida
                  ? COLORES_SECCION.comercio
                  : COLORES.texto,

                transition: TRANSICIONES.despliegue
              }}
            >
              {comercio.nombre}
            </div>
            <div
              style={{
                fontSize: TAMANOS.sm,
                fontWeight: GROSOR.semibold,
                color: estadoHorario.abierto
                  ? COLORES.exito
                  : COLORES.peligro,
                marginTop: "4px"
              }}
            >
              {estadoHorario.texto}
            </div>

            <div
              style={{
                fontSize: TAMANOS.sm,
                color: "#666",
                marginTop: "2px"
              }}
            >
              <IconoMapa
                style={{
                  marginRight: "5px",
                  color: COLORES_SECCION.comercio
                }}
              />

              {comercio.direccion}

            </div>

          </div>

        </div>

        {/* LADO DERECHO */}

        <div
          style={{
            display: "flex",
            alignItems: "left",
            gap: "6px",
            marginLeft: "6px"
          }}
        >

          {comercio.destacado && (

            <IconoDestacado
              style={{
                color: "#F5B301",
                transform: expandida
                ? "scale(1.5)"
                : "scale(1)",

              transition: TRANSICIONES.despliegue
              }}
            />

          )}

         <IconoChevronDown
            style={{
              transform: expandida ? "rotate(180deg)" : "rotate(0deg)",
              transition: TRANSICIONES.despliegue
            }}
          />

        </div>

      </div>

      {/* DETALLE */}

      <div
          style={{
            maxHeight: expandida ? "500px" : "0px",
            overflow: "hidden",
            opacity: expandida ? 1 : 0,
            transition: TRANSICIONES.despliegue
          }}
        >

        <div
            style={{
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid #E5E7EB"
            }}
          >

            {/* REFERENCIA */}

            <div style={{ marginBottom: "12px" }}>

              <div
                style={{
                  fontSize: TAMANOS.xs,
                  fontWeight: GROSOR.bold,
                  color: COLORES_SECCION.comercio,
                  marginBottom: "4px"
                }}
              >
                <IconoReferencia style={{ marginRight: "6px" }} />
                Referencia
              </div>

              <div
                style={{
                  paddingLeft: "22px",
                  fontSize: TAMANOS.sm,
                  color: "#555"
                }}
              >
                {comercio.referencia}
              </div>

            </div>

            {/* TELEFONO */}

            {comercio.telefono && (

              <div
                  style={{
                    paddingLeft: "22px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "6px"
                    }}
                  >

                    <button
                      onClick={llamarTelefono}
                      style={{
                        border: "none",
                        borderRadius: "18px",
                        padding: "6px 12px",
                        backgroundColor: COLORES_SECCION.comercio,
                        color: "white",
                        cursor: "pointer",
                        fontSize: TAMANOS.xs,
                        fontWeight: GROSOR.bold
                      }}
                    >
                      📞 Llamar
                    </button>

                    {comercio.whatsapp && (

                      <button
                        onClick={abrirWhatsApp}
                        style={{
                          border: "none",
                          borderRadius: "18px",
                          padding: "6px 12px",
                          backgroundColor: "#25D366",
                          color: "white",
                          cursor: "pointer",
                          fontSize: TAMANOS.xs,
                          fontWeight: GROSOR.bold
                        }}
                      >
                        💬 WhatsApp
                      </button>

                    )}

                  </div>

                  <div
                    style={{
                      fontSize: TAMANOS.sm,
                      color: "#555"
                    }}
                  >
                    {comercio.telefono}
                  </div>

                </div>

            )}

            {/* HORARIO */}

            <div>

              <div
                style={{
                  fontSize: TAMANOS.xs,
                  fontWeight: GROSOR.bold,
                  color: COLORES_SECCION.comercio,
                  marginBottom: "4px"
                }}
              >
                <IconoHorario style={{ marginRight: "6px" }} />
                Horario de hoy
                
              </div>

              <div
                style={{
                  paddingLeft: "22px",
                  fontSize: TAMANOS.sm,
                  color: "#555",
                  whiteSpace: "pre-line"
                }}
              >
                {horarioMostrado}
              </div>
              <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setMostrarHorario(!mostrarHorario);
                  }}
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: COLORES_SECCION.comercio,
                    cursor: "pointer",
                    fontSize: TAMANOS.xs,
                    fontWeight: GROSOR.semibold,
                    userSelect: "none"
                  }}
                >

                  {mostrarHorario
                    ? <IconoChevronUp />
                    : <IconoChevronDown />}

                  <span>
                    {mostrarHorario
                      ? "Ocultar horario semanal"
                      : "Ver horario semanal"}
                  </span>

                </div>

                {mostrarHorario && (

                  <div
                    style={{
                      marginTop: "8px",
                      paddingTop: "8px",
                      borderTop: "1px solid #EEE",
                      whiteSpace: "pre-line",
                      fontSize: TAMANOS.sm,
                      color: "#555"
                    }}
                  >

                    {horarioSemanal.map((linea) => (

                      <div key={linea}>
                        {linea}
                      </div>

                    ))}

                  </div>

                )}
       </div>

  </div>

     

    </div>
</div>
  );

}

export default TarjetaComercio;