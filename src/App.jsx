import { useState, useEffect, useRef } from "react";
import comercios from "./data/comercios";
import farmacias from "./data/farmacia";
import farmaciaTurno from "./data/farmacia_turno";
import emergencias from "./data/emergencias";
import lugaresInteres from "./data/lugares_de_interes";
import taxis from "./data/transportes_taxis";
import buses from "./data/transportes_buses";
import lagunaAvendano from "./assets/imagenes/laguna_avendano.jpeg";
import cascadaLiucura from "./assets/imagenes/cascada_liucura.jpg";
import elRoble from "./assets/imagenes/puente_itata.jpg";
import bioparque from "./assets/imagenes/bioparque_quillon.jpg";
import farmaciaTurnoImg from "./assets/imagenes/farmacia_simi.jpg";
import logoQuillon from "./assets/imagenes/logo_quillon_ahora.png";
import { FaHome} from "react-icons/fa";
import { FaStore} from "react-icons/fa";
import { FaMapMarkedAlt} from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  FaPhoneAlt,
  FaClock,
  FaInfoCircle,
  FaCompass,
  FaClinicMedical,
  FaBus,
  FaBars,
  FaMedkit,
  FaGlassCheers,
  FaChevronDown,
  FaChevronUp,
  FaTaxi 
  } from "react-icons/fa"; {/*Aca se declaran los iconos react que se necesitan, si faltan se agregan a la lista */}

{/**aca estan declarados los colores oficiales por seccion */}
  const COLOR_COMERCIO = "#2E7D32";
  const COLOR_FARMACIA = "#1976D2";
  const COLOR_EMERGENCIA = "#D32F2F";
  const COLOR_EVENTO = "#F57C00";
  const COLOR_TURISMO = "#00ACC1";
  const COLOR_TRANSPORTE = "#6A1B9A";

  
  
  {/*Inicio de app, aqui van todas las constantes o funciones */}
function App() {  

  const hoy = new Date(); {/*los modulos de fecha acá, son para calcular los horarios de los buses, dia actual y proxima salida */}
  const diaSemana = hoy.getDay();
  const horaActual = new Date();
  const minutosActuales =
  horaActual.getHours() * 60 +
  horaActual.getMinutes();
  let horariosActuales;
  let nombreDia;

  const obtenerProximaSalida = (horarios) => {

  const ahora = new Date();

  const minutosActuales =
    ahora.getHours() * 60 +
    ahora.getMinutes();

  return horarios.find((hora) => {
    const [h, m] = hora.split(":");
    const minutosBus =
      Number(h) * 60 +
      Number(m);

    return minutosBus > minutosActuales;

    });
  };

const obtenerMinutosRestantes = (horaSalida) => {
  if (!horaSalida) return null;
  const ahora = new Date();
  const minutosActuales =
    ahora.getHours() * 60 +
    ahora.getMinutes();

  const [h, m] = horaSalida.split(":");

  const minutosSalida =
    Number(h) * 60 +
    Number(m);

  return minutosSalida - minutosActuales;
  };

  const formatearTiempoRestante = (minutos) => {

  if (minutos === null) {
    return "🚫 No quedan salidas hoy";
  }

  if (minutos < 60) {
    return `⏳ Sale en ${minutos} minutos`;
  }

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  if (minutosRestantes === 0) {
    return `⏳ Sale en ${horas} hora${horas > 1 ? "s" : ""}`;
  }

  return `⏳ Sale en ${horas} hora${horas > 1 ? "s" : ""} y ${minutosRestantes} min`;
};

  const claveDiaActual =
  diaSemana >= 1 && diaSemana <= 5
    ? "lunesViernes"
    : diaSemana === 6
      ? "sabado"
      : "domingoFestivo";

  const nombreDiaActual =
  diaSemana >= 1 && diaSemana <= 5
    ? "Lunes a Viernes"
    : diaSemana === 6
      ? "Sábado"
      : "Domingo y Festivos";
  
  if (diaSemana >= 1 && diaSemana <= 5) {
  nombreDia = "Lunes a Viernes";
  }
  else if (diaSemana === 6) {
  nombreDia = "Sábado";
  }
  else {
  nombreDia = "Domingo y Festivos";
  }
 {/*Aca terminan los modulos de los dias para los buses */}

{/*Aqui se declaran las funciones de  los menu expandibles de los buses */}
  const [busExpandido, setBusExpandido] = useState(null);
  const [diaExpandido, setDiaExpandido] = useState(null);
  const [horarioExpandido, setHorarioExpandido] = useState(null);
{/*Hasta Aqui se declaran las funciones de  los menu expandibles de los buses */}

  const farmaciasRef = useRef(null);
  const transportesRef = useRef(null);
  const lugaresRef = useRef(null);
  const farmaciaActual = farmacias.find(
  farmacia => farmacia.id === farmaciaTurno.farmaciaId
)  || {};

  const scrollSuave = (id) => {
  const seccion = document.getElementById(id);

  if (seccion) {
    window.scrollTo({
      top: seccion.offsetTop - 40,
      behavior: "smooth",
    });
  }
};



{/*aca se crea la funcion de busqueda de la brujula, que hace saltar desde los destacados a la tarjeta real */}

  const irADestacado = () => {
  let destino = null;
  if (seccionActual === "comercios" && comercioDestacado) {
    destino = `comercio-${comercioDestacado.id}`;
  }
  if (seccionActual === "lugares" && lugarDestacado) {
    destino = `lugar-${lugarDestacado.id}`;
  }
  if (!destino) return;

  const elemento =
    document.getElementById(destino);

  if (elemento) {
    elemento.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
};

  const [busqueda, setBusqueda] = useState("");
  const [detalleLugar, setDetalleLugar] = useState(null);
  const [detalleComercio, setDetalleComercio] = useState(null);
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [mostrarMas, setMostrarMas] = useState(false);
  const [farmaciaExpandida, setFarmaciaExpandida] = useState(null);
  const [seccionActual, setSeccionActual] = useState("inicio");
  {/*console.log(seccionActual);*/}

{/*Aca se genera el efecto del boton flotante donde cambia de nombre segun la seccion en la que está, mostrando el destacado */}
  useEffect(() => {
  const detectarSeccion = () => {

    const puntoCentral =
      window.scrollY + window.innerHeight / 2;

    const secciones = [
      "inicio",
      "emergencias",
      "comercios",
      "lugares",
      "eventos"
    ];

    for (const id of secciones) {

      const elemento =
        document.getElementById(id);

      if (!elemento) continue;

      const inicio = elemento.offsetTop;
      const fin = inicio + elemento.offsetHeight;

      if (
        puntoCentral >= inicio &&
        puntoCentral < fin
      ) {
        setSeccionActual(id);
        break;
      }
    }
  };

  window.addEventListener(
    "scroll",
    detectarSeccion
  );

  detectarSeccion();

  return () => {
    window.removeEventListener(
      "scroll",
      detectarSeccion
    );
  };

}, []);

{/*Fin efecto boton flotante */}

  const abiertos = comercios.filter(c => c.abierto);

    const toggleDetalleFarmacia = (id) => {
  setDetalleFarmacia(
    detalleFarmacia === id ? null : id
  );
  };

  const toggleDetalleComercio = (id) => {
  setDetalleComercio(
    detalleComercio === id ? null : id
  );
  };

  const irAComercioDestacado = () => {
  scrollSuave("comercios");

  setDetalleComercio(
    comercioDestacado.id
  );

  };

  const toggleDetalleLugar = (id) => {
    setDetalleLugar(
      detalleLugar === id ? null : id
    );
  };
  const irALugarDestacado = () => {

  scrollSuave("lugares");

  setDetalleLugar(
    lugarDestacado.id
  );

};

  const imagenesLugares = {
  laguna: lagunaAvendano,
  cascada: cascadaLiucura,
  elRoble: elRoble,
  bioparque: bioparque
  };

  
  {/*filtro de busqueda, puede ser nombre, categoria, direccion o referencia */}
  const comerciosFiltrados = comercios.filter(comercio =>
  (comercio.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
  (comercio.categoria || "").toLowerCase().includes(busqueda.toLowerCase()) ||
  (comercio.direccion || "").toLowerCase().includes(busqueda.toLowerCase()) ||
  (comercio.referencia || "").toLowerCase().includes(busqueda.toLowerCase())
);

  const farmaciasFiltradas = farmacias.filter(farmacia =>
  farmacia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  farmacia.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
  farmacia.referencia.toLowerCase().includes(busqueda.toLowerCase())
);

const taxisFiltrados = taxis.filter(taxi =>
  taxi.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  taxi.telefono.includes(busqueda)
);

const busesFiltrados = buses.filter(bus =>
  bus.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  bus.ruta.toLowerCase().includes(busqueda.toLowerCase()) ||
  bus.empresas.some(empresa =>
    empresa.toLowerCase().includes(busqueda.toLowerCase())
  ) ||
  "bus".includes(busqueda.toLowerCase()) ||
  "buses".includes(busqueda.toLowerCase())
);

  const comercioDestacado =
  comercios.find(c => c.destacado);

  const lugarDestacado =
  lugaresInteres.find(l => l.destacado);

  {/*Funcion que hace cambiar nombre al boton flotante */}
  const textoBrujula = () => {
  if (seccionActual === "comercios")
    return comercioDestacado?.nombre;
  if (seccionActual === "lugares")
    return lugarDestacado?.nombre;
  return "Destacado Ahora";
  };
 {/* console.log(seccionActual);*/}

  {/*esta funcion devuelve los destacados por seccion y filtra si no hay destacados */}
  const destacados = [comercioDestacado, lugarDestacado].filter(Boolean);
  
{/*aca se seleccionan los iconos 
  de cada categoria de comercio*/}

  const obtenerIconoCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case "restaurant":
      return "🍽️";

    case "ferreteria":
      return "🔧";

    case "florería":
      return "🌷";

    case "farmacia":
      return "💊";

    case "supermercado":
      return "🛒";

    case "panadería":
      return "🥖";

    case "verdulería":
      return "🥬";

    case "carnicería":
      return "🥩";

    case "pizzería":
      return "🍕";

    default:
      return "📍";
      
  }

 

};
const totalResultados =
  comerciosFiltrados.length +
  farmaciasFiltradas.length +
  taxisFiltrados.length +
  busesFiltrados.length;

 {/*Aca empieza el hero de la app con el logo y el slogan*/}

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "30px",
      }}
    >
      <header
      id="inicio"
        style={{
          background:
            "linear-gradient(135deg, #1976D2, #26A69A)",
          color: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
        }}
      >
        <header>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px"
    }}
  >
    <img
      src={logoQuillon}
      alt="Logo Quillón Ahora"
      style={{
        width: "250px",
        height: "250px",
        objectFit: "contain",
      }}
    />

    <div>
      <h1
        style={{
        margin: "0",
        fontSize: "clamp(32px, 6vw, 42px)",
        textAlign: "center",
        lineHeight: "1.1",
  }}
      >
        Quillón Ahora
      </h1>

      <div
        style={{
          backgroundColor: "#FFF3CD",
          color: "#856404",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "20px",
          fontSize: "14px",
          textAlign: "center"
        }}
      >
          <p>🚧 QUILLÓN AHORA🚧</p>
          se encuentra en fase de pruebas.
          La información publicada puede contener errores u omisiones.
          <p display= "inline-block" >El sitio está optimizado para ser visto desde un celular o tablet</p>
      </div>

      <p
        style={{
        margin: "5px 0 0 0",
        textAlign: "center",
        maxWidth: "320px",
        lineHeight: "1.4",
        opacity: "0.9",
       fontSize: "clamp(14px, 2.5vw, 18px)",
       opacity: "0.9"
  }}
      >
        La app del vecino que sabe
      </p>
    </div>
  </div>
</header>
</header>

{/*Acá comienza el Destacados Ahora*/}
<div
          style={{
            backgroundColor: "#FFF8E1",
            padding: "15px",
            borderRadius: "16px",
            marginTop: "20px",
            borderTop: `5px solid ${COLOR_EVENTO}`,
            borderLeft: `5px solid ${COLOR_EVENTO}`,
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
          }}
      >
          <strong
            style={{
              color: COLOR_EVENTO,
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "700",
              marginBottom: "12px"
            }}
          >
            <FaCompass /> Destacados Ahora
          </strong>
          <p
              onClick={irAComercioDestacado}
              style={{
                cursor: "pointer",
                marginBottom: "12px"
              }}
            >
              <FaStore
                style={{
                  marginRight: "8px",
                  color:"#424242"
                }}
              />

              {comercioDestacado.nombre}

            </p>
            <p
              onClick={irALugarDestacado}
              style={{
                cursor: "pointer",
                marginBottom: "12px"
              }}
            >
              <FaMapMarkedAlt
                style={{
                  marginRight: "8 px",
                  color:"#424242"
                }}
              />

              {lugarDestacado.nombre}

            </p>
</div>


{/* Aca empieza el buscador de comercios por nombre, localizacion, o descripcion*/}
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Buscar comercio, evento o lugar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        />
      </div>
      

      {busqueda && (
        <div
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        {/*Modulo que muestra resultados de comercios en la busqueda */}
        <h3>🔍 Resultados</h3>
        {comerciosFiltrados.length === 0 && (
          <p>No se encontraron comercios con ese criterio.</p>
        )}

          {comerciosFiltrados.map(comercio => (
            <div
            style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
             onClick={() => toggleDetalleComercio(comercio.id)}
              key={comercio.id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}

                onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}

              style={{
                backgroundColor: "#f8f8f8",
                padding: "10px",
                maxWidth: "350px",
                margin: "0 auto 10px auto",
                borderRadius: "10px",
                marginBottom: "15px",
                textAlign: "left",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                borderLeft: comercio.abierto
                  ? "5px solid #2E7D32"
                  : "5px solid #C62828",
                backgroundColor: comercio.abierto
                  ? "#F1F8E9"
                  : "#FFEBEE",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              <strong>{comercio.nombre}</strong>

              <p><FaMapMarkedAlt style={{ marginRight: "6px", color: COLOR_COMERCIO }}/> {comercio.direccion}</p>
              <p><FaCompass style={{ marginRight: "6px", color: COLOR_COMERCIO }}/> {comercio.referencia}</p>
              <p>{obtenerIconoCategoria(comercio.categoria)}
                {" "}
                {comercio.categoria}</p>

              <p>
              {comercio.abierto
                ? "🟢 Abierto"
                : "🔴 Cerrado"}
              </p>
                 {detalleComercio === comercio.id
                  ? <FaChevronUp />
                  : <FaChevronDown />}
             
              {detalleComercio === comercio.id && (
                <div>
                  <p><FaPhoneAlt  style={{ marginRight: "6px", color: "#2E7D32" }}/> {comercio.telefono}</p>
                  <p><FaClock  style={{ marginRight: "6px", color: "#2E7D32" }}/> {comercio.horario}</p>
                </div>
              )}

            </div>
          ))}
            {/*Modulo que muestra resultados de farmacias en la busqueda */}
            {farmaciasFiltradas.length > 0 && (
              <>
                <h3
                style={{
                  marginTop: "20px",
                  marginBottom: "10px"
                }}
                >💊 Farmacias</h3>

                {farmaciasFiltradas.map((farmacia) => (
                  <div
                    key={farmacia.id}
                    onClick={() => scrollSuave("farmacias")}                    
                    style={{
                      backgroundColor: "#F4FAFF",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      borderTop: `5px solid ${COLOR_FARMACIA}`,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <strong>{farmacia.nombre}</strong>
                    <p
                      style={{
                        fontSize: "12px",
                        opacity: "0.7"
                      }}
                    >
                      👉 Ver información completa
                    </p>
                    <p>{farmacia.direccion}</p>
                  </div>
                ))}
              </>
            )}

            {/*Modulo que muestra resultados de taxis en la busqueda */}
            {taxisFiltrados.length > 0 && (
              <>
                <h3
                style={{
                        marginTop: "20px",
                        marginBottom: "10px"
                      }}
                >🚕 Taxis</h3>

                {taxisFiltrados.map((taxi) => (
                  <div
                    key={taxi.id}
                    onClick={() => scrollSuave("transportes")}
                    style={{
                      backgroundColor: "#F5F3EA",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      borderTop: `5px solid ${COLOR_TRANSPORTE}`,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <strong>{taxi.nombre}</strong>

                    <p>
                      📞 {taxi.telefono}
                    </p>
                  </div>
                ))}
              </>
            )}
            {/*Modulo que muestra resultados de buses en la busqueda */}
            {busesFiltrados.length > 0 && (
              <>
                <h3
                  style={{
                      marginTop: "20px",
                      marginBottom: "10px"
                  }}                
                >🚌 Buses</h3>

                {busesFiltrados.map((bus) => (
                  <div
                    key={bus.id}
                    onClick={() => scrollSuave("transportes")}
                    style={{
                      backgroundColor: "#FFF8E1",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      borderTop: `5px solid ${COLOR_TRANSPORTE}`,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <strong>{bus.nombre}</strong>
                    <p
                        style={{
                          fontSize: "12px",
                          opacity: "0.7"
                        }}
                      >
                        👉 Ver horarios y próxima salida
                      </p>

                    <p>
                      Empresas: {bus.empresas.join(", ")}
                    </p>
                  </div>
                ))}
              </>
            )}
        </div> 
      )}
{/*Div final del buscador */}

{/*Flex envuelve farmacia de turno
 y emergencias para mejorar visualización*/}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}        
      >
       {/*Acá empieza el modulo farmacia de turno*/}
        <div             
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}

                onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}

          style={{
              flex: "1 1 350px",
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "16px",
              marginTop: "20px",
              border: `3px solid ${COLOR_FARMACIA}`,
              borderTop: `4px solid ${COLOR_FARMACIA}`,
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
            > {/*Termino del primer div de la farmacia, solo se crearon eventos y marco*/}

              {/*Insercion de imagen ya declarada*/}
              <img 
                src={farmaciaTurnoImg}
                alt="Farmacia de Turno"
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "15px"
                }}
              />
                           
                {/*<div
                style={{
                  backgroundColor: COLOR_FARMACIA,
                  color: "white",
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  marginBottom: "10px"
                }}
              >
              DESTACADO AHORA
              </div>*/}

              <h2 
              style={{ color: COLOR_FARMACIA,
              marginBottom: "5px",
              fontWeight: "700",
              fontSize: "29px" }}
             
              >Farmacia de Turno</h2>             
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: COLOR_FARMACIA,
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: "800",
                    fontSize: "15px",
                    marginBottom: "12px",
                    letterSpacing: "0.5px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                  }}
                >
                  🟢 EN TURNO HOY
                </div>              
              <p><strong
              style={{
              fontSize: "18px",
              color: "#333"}}
              >{farmaciaActual.nombre}</strong></p>
              <p> <FaMapMarkedAlt style={{ marginRight: "6px", color: COLOR_FARMACIA }} />{farmaciaActual.direccion}</p>
              <p> <FaCompass style={{ marginRight: "6px", color: COLOR_FARMACIA }}/>{farmaciaActual.referencia}</p>
              <p>
                <a
                  href={`tel:${farmaciaActual.telefono}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <FaPhoneAlt style={{ marginRight: "6px", color: COLOR_FARMACIA }}/> {farmaciaActual.telefono}
                </a>
              </p>              
              <p> <FaClock style={{ marginRight: "6px", color: COLOR_FARMACIA }}/> {farmaciaActual.horarioTurno}</p>
        </div>

        {/*Acá empieza modulo emergencias*/}
      <div
        id="emergencias"
        style={{
          flex: "1 1 350px",
          backgroundColor: "#FFF5F5",
          padding: "15px",
          borderRadius: "12px",
          scrollMarginTop: "80px"
        }}
      >
        <h2 
          style={{
            color: COLOR_EMERGENCIA,
            marginBottom: "5px",
            fontWeight: "700",
            fontSize: "26px"
          }}
        >
          <FaExclamationTriangle
            style={{
            marginRight: "8px",
            verticalAlign: "middle"
          }}
        /> Emergencias
        </h2>

        {emergencias.map(emergencia => (
          <div
            key={emergencia.id}
            style={{              
              backgroundColor: "#FFFFFF",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              borderTop: "4px solid ${COLOR_EMERGENCIA}"
            }}
          >
            <strong
              style={{
              fontSize: "18px",
              color: "#333"}}
            >{emergencia.nombre}</strong>

            <p>
              <a
                href={`tel:${emergencia.telefono}`}
                style={{
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                <FaPhoneAlt style={{ marginRight: "6px", color: COLOR_EMERGENCIA }}/> {emergencia.telefono}
              </a>
            </p>            

            {emergencia.direccion && (
              <p><FaMapMarkedAlt style={{ marginRight: "6px", color: COLOR_EMERGENCIA }} />{emergencia.direccion}</p>
            )}

            {emergencia.horario && (
              <p><FaClock style={{ marginRight: "6px", color: COLOR_EMERGENCIA }}/> {emergencia.horario}</p>
            )}
          </div>
        ))}
      </div>

    </div> {/*aqui termina primer flex*/}

    {/*Aca empieza flex que envuelve comercios y lugares*/}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "15px",
          flexWrap: "wrap"
        }}
      >
        {/*Aca empieza el bloque comercios 
        debo corregir el boton ver detalles*/}
        <div
          id="comercios"
          style={{
            flex: "1 1 350px",
            backgroundColor: "#F3FBF4",
            padding: "15px",
            borderRadius: "12px",
            scrollMarginTop: "80px"
          }}
        >
          <h2 style={{color:COLOR_COMERCIO,
            marginBottom: "5px",
            fontSize: "26px"
           }}> 🟢Qué está abierto ahora</h2>
          <p style={{color: COLOR_COMERCIO }}>{abiertos.length} comercios abiertos</p>

           {/*el toggle detalle hace que la tarjeta funcione como boton mostrando los datos ocultos */} 
           {/*Evento on mouse hace que la tarjeta genere sombra al pasar el mouse por encima en la version web */}
          {abiertos.map(comercio => (
            <div
              id={`comercio-${comercio.id}`}
              onClick={() => toggleDetalleComercio(comercio.id)}
              style={{cursor: "pointer"}}
              key={comercio.id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}                  
                onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}
              style={{
                    backgroundColor: "#FFFFFF",
                    padding: "15px",
                    margin: "0 auto 10px auto",
                    borderRadius: "14px",
                    marginBottom: "15px",
                    borderTop: "4px solid #2E7D32",
                    textAlign: "left",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",                    
                    transition: "all 0.2s ease",
                    cursor: "pointer"
                  }}
             >
              <strong
              style={{
              fontSize: "18px",
              color: "#333"}}
              >{comercio.nombre}</strong>
              <p style={{              
              display: "block",
              marginBottom: "8px"}}              
              >{comercio.categoria}</p>         
              <p><FaMapMarkedAlt style={{ marginRight: "6px", color: COLOR_COMERCIO }}/> {comercio.direccion}</p>
              <p><FaCompass style={{ marginRight: "6px",color: COLOR_COMERCIO }}/> {comercio.referencia}</p>              
              {detalleComercio === comercio.id && (
                  <div>
                    <p><FaPhoneAlt style={{ marginRight: "6px", color: COLOR_COMERCIO }}/> {comercio.telefono}</p>
                    <p><FaClock style={{ marginRight: "6px", color: COLOR_COMERCIO }}/>{comercio.horario}</p>
                  </div>
              )}
            </div>
            ))
        }
     </div>
        {/*Aca empieza el bloque lugares de interes*/}
      <div
      id="lugares"
        style={{
          flex: "1 1 350px",
          backgroundColor: "#F4FAFF",
          padding: "15px",
          borderRadius: "12px",
          scrollMarginTop: "80px"
        }}
      >
        <h2 style={{color: COLOR_TURISMO,
        marginBottom: "5px",
        fontWeight: "700",
        fontSize: "26px" }}        
        > 🗺️ Lugares de Interes</h2>
        <p style={{color: "#666", 
          fontSize: "18px",
          marginTop: 0
         }}
        > dentro de la comuna</p>

{/*el toggle detalle hace que la tarjeta funcione como boton mostrando los datos ocultos */}
        {lugaresInteres.map(lugar => (
          <div
            id={`lugar-${lugar.id}`}          
            onClick={() => toggleDetalleLugar(lugar.id)}
            style={{cursor: "pointer"}}
            key={lugar.id}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}

                onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}
            style={{              
              backgroundColor: "#FFFFFF",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "14px",
              textAlign: "left",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",              
              borderTop: "4px solid color: COLOR_TURISMO"
            }}
          >
           
            <img
                    src={imagenesLugares[lugar.imagen]}
                    alt={lugar.nombre}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "10px"
                    }}
                  />

            <strong
              style={{
              fontSize: "18px",
              color: "#333",
              display: "block",
              marginBottom: "8px"}}
            >{lugar.nombre}</strong>

            

            {lugar.direccion && (
              <p><FaMapMarkedAlt style={{ marginRight: "6px",color: COLOR_TURISMO }}/> {lugar.direccion}</p>
            )}

            {detalleLugar === lugar.id && (
              <div>

                {lugar.descripcion && (
                  <p> <FaInfoCircle style={{ marginRight: "6px", color: COLOR_TURISMO }} />{lugar.descripcion}</p>
                )}

                {lugar.referencia && (
                  <p><FaCompass style={{ marginRight: "6px", color: COLOR_TURISMO }} /> {lugar.referencia}</p>
                )}

              </div>
            )}
          
             
            
          </div>
        ))}

        </div>     
  </div>

    {/*Aca empieza bloque eventos activos dentro de la comuna*/}   
          <div
            id="eventos"
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "12px",
                scrollMarginTop: "80px"
              }}
            >
              <h2 style={{color: "#F57C00" }}> 🎉 Eventos de hoy</h2>
              <p>Fiesta de la Vendimia</p>
            </div>   

    {/*Aca empieza bloque farmacias normal*/}        
      <div
        ref={farmaciasRef}
        id="farmacias"
        style={{
          backgroundColor: "#F4FAFF",
          padding: "15px",
          paddingBottom: "50px",
          borderRadius: "12px",
          marginTop: "15px",
          scrollMarginTop: "80px"
        }}
          >
            <h2
              style={{
                color: COLOR_FARMACIA,
                marginBottom: "20px"
              }}
            >
              <FaMedkit style={{ color: COLOR_FARMACIA }} /> Farmacias
            </h2>
            {farmacias.map((farmacia) => (
              <div
                key={farmacia.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "14px",
                  textAlign: "left",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  borderTop: `4px solid ${COLOR_FARMACIA}`
                }}
              >
                <>
                <strong
                  style={{
                    fontSize: "18px",
                    color: "#333",
                    display: "block",
                    marginBottom: "10px"
                  }}
                >
                  {farmacia.nombre}
                </strong>

                <p>
                  <FaMapMarkedAlt
                    style={{
                      marginRight: "6px",
                      color: COLOR_FARMACIA
                    }}
                  />
                  {farmacia.direccion}
                </p>

                <p>
                  <a
                    href={`tel:${farmacia.telefono}`}
                    style={{
                      color: "inherit",
                      textDecoration: "none"
                    }}
                  >
                    <FaPhoneAlt style={{marginRight: "6px", color: COLOR_FARMACIA}}/> {farmacia.telefono || "No informado"}
                  </a>
                </p>                

                <div
                  onClick={() =>
                    setFarmaciaExpandida(
                      farmaciaExpandida === farmacia.id
                        ? null
                        : farmacia.id
                    )
                  }
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    cursor: "pointer",
                    color: COLOR_FARMACIA,
                    fontSize: "22px"
                  }}
                >
                  {farmaciaExpandida === farmacia.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                </div>

                {farmaciaExpandida === farmacia.id && (
                  <div
                    style={{
                      marginTop: "12px",
                      borderTop: "1px solid #E0E0E0",
                      paddingTop: "12px"
                    }}
                  >
                    <p>
                      <FaCompass
                        style={{
                          marginRight: "6px",
                          color: COLOR_FARMACIA
                        }}
                      />
                      {farmacia.referencia}
                    </p>

                    <p>
                      <FaClock
                        style={{
                          marginRight: "6px",
                          color: COLOR_FARMACIA
                        }}
                      />
                      {farmacia.horarioSemanal}
                    </p>
                  </div>
                )}
              </>
              </div>
            ))}
          </div>
{/*Aca empieza el modulo transportes, aloja taxis y buses  */}
          <div
          ref={transportesRef}
          id="transportes"
          style={{
            backgroundColor: "#F8FBFF",
            padding: "15px",
            paddingBottom: "120px",
            borderRadius: "12px",
            marginTop: "15px",
            scrollMarginTop: "80px"
          }}
          >
          <h2
          style={{
            color: COLOR_TRANSPORTE,
            marginBottom: "20px"
          }}
            >
          <FaBus style={{ color: COLOR_TRANSPORTE }} /> Transportes
        </h2>
        <h3>
          <FaTaxi style={{ color: COLOR_TRANSPORTE }} /> Taxis
        </h3>
        {/* INICIO BLOQUE TAXIS */}
        {taxis.map((taxi) => (
          <div
            key={taxi.id}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "12px",
              borderTop: `4px solid ${COLOR_TRANSPORTE}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
            <strong>{taxi.nombre}</strong>            
              <p>
                <a
                  href={`tel:${taxi.telefono}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <FaPhoneAlt style={{ color: COLOR_TRANSPORTE }}/> {taxi.telefono}
                </a>
              </p>
              {/* {taxi.telefono}*/}
            
          </div>
        ))}
        {/* TERMINO BLOQUE TAXIS */}

        {/* BLOQUE BUSES */}
       <h3 style={{ marginTop: "25px" }}>
          <FaBus style={{ color: COLOR_TRANSPORTE }} /> Buses
        </h3>
        {buses.map((bus) => (
          <div
            key={bus.id}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "15px",
              marginBottom: "15px",              
              borderRadius: "12px",
              borderTop: `4px solid ${COLOR_TRANSPORTE}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}          
          >
            <strong
            style={{
                fontSize: "18px",
                color: COLOR_TRANSPORTE,
                display: "block",
                marginBottom: "8px"
              }}
          >
            {bus.nombre} {/*Aca toma el nombre de la ruta de los buses (Quillón - Chillan o Quillón - Concepcion) */}
          </strong>
          <div
              onClick={() =>
                setBusExpandido(
                  busExpandido === bus.id
                    ? null
                    : bus.id
                )
              }
              style={{
                textAlign: "center",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              {busExpandido === bus.id
                ? <FaChevronUp />
                : <FaChevronDown />}
            </div>
              {busExpandido === bus.id && (
                <div style={{ marginTop: "15px" }}>

                  <p>
                    <strong
                    style={{
                      backgroundColor: "#FFF8E1",
                      padding: "10px",
                      borderRadius: "10px",
                      marginBottom: "12px"
                    }}
                    >
                      ⭐ Hoy: {nombreDiaActual} 
                      {/*nombreDiaActual tiene la logica arriba 
                      en los const busca el dia actual para mostrarlo */}
                    </strong>
                  </p>
                  <div
                      style={{
                        backgroundColor: "#E8F5E9",
                        padding: "12px",
                        borderRadius: "16px",
                        marginTop: "12px",
                        marginBottom: "12px"
                      }}
                    >
                      <strong>🕒 Próxima salida:</strong>

                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          marginTop: "6px"
                        }}
                      >
                        {
                          obtenerProximaSalida(
                            bus.horarios[claveDiaActual].ida
                          ) || "No quedan salidas hoy"
                        }
                        <div
                          style={{
                            fontSize: "14px",
                            marginTop: "8px",
                            opacity: 0.8
                          }}
                        > {/*Aqui se genera el proceso de mostrar la proxima salida y el tiempo que resta */}
                          {
                            formatearTiempoRestante(
                              obtenerMinutosRestantes(
                                obtenerProximaSalida(
                                  bus.horarios[claveDiaActual].ida
                                )
                              )
                            )
                          }{/*aca termina proceso de mostrar la proxima salida y el tiempo que resta */}
                          {/*{
                            obtenerProximaSalida(
                              bus.horarios[claveDiaActual].ida
                            )
                              ? `⏳ Sale en ${obtenerMinutosRestantes(
                                  obtenerProximaSalida(
                                    bus.horarios[claveDiaActual].ida
                                  )
                                )} minutos`
                              : "🚫 No quedan salidas hoy"
                          }*/}
                        </div>
                      </div>
                    </div>
                  <p>
                    ➡️ Ida:
                    {bus.horarios[claveDiaActual].ida.join(" • ")} 
                  </p>

                  <p>
                    ⬅️ Vuelta:
                    {bus.horarios[claveDiaActual].vuelta.join(" • ")}
                  </p>
                  <hr style={{ margin: "15px 0" }} />
                  {claveDiaActual !== "lunesViernes" && (
                      <>
                        <div
                          onClick={() =>
                            setHorarioExpandido(
                              horarioExpandido === "lunesViernes"
                                ? null
                                : "lunesViernes"
                            )
                          }
                          style={{
                            cursor: "pointer",
                            marginTop: "10px",
                            fontWeight: "bold"
                          }}
                        >
                          {horarioExpandido === "lunesViernes"
                            ? <FaChevronUp />
                            : <FaChevronDown />}
                          {" "}
                          Lunes a Viernes
                        </div>

                        {horarioExpandido === "lunesViernes" && (
                          <div style={{ marginTop: "10px" }}>
                            <p>
                              ➡️ Ida:
                              {bus.horarios.lunesViernes.ida.join(" • ")}
                            </p>

                            <p>
                              ⬅️ Vuelta:
                              {bus.horarios.lunesViernes.vuelta.join(" • ")}
                            </p>
                          </div>
                        )}


                      </>
                    )}
                    {claveDiaActual !== "sabado" && (
                      <>
                        <div
                          onClick={() =>
                            setHorarioExpandido(
                              horarioExpandido === "sabado"
                                ? null
                                : "sabado"
                            )
                          }
                          style={{
                            cursor: "pointer",
                            marginTop: "10px",
                            fontWeight: "bold"
                          }}
                        >
                          {horarioExpandido === "sabado"
                            ? <FaChevronUp />
                            : <FaChevronDown />}
                          {" "}
                          Sábado
                        </div>

                        {horarioExpandido === "sabado" && (
                          <div style={{ marginTop: "10px" }}>
                            <p>
                              ➡️ Ida:
                              {bus.horarios.sabado.ida.join(" • ")}
                            </p>

                            <p>
                              ⬅️ Vuelta:
                              {bus.horarios.sabado.vuelta.join(" • ")}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                    {claveDiaActual !== "domingoFestivo" && (
                      <>
                        <div
                          onClick={() =>
                            setHorarioExpandido(
                              horarioExpandido === "domingoFestivo"
                                ? null
                                : "domingoFestivo"
                            )
                          }
                          style={{
                            cursor: "pointer",
                            marginTop: "10px",
                            fontWeight: "bold"
                          }}
                        >
                          {horarioExpandido === "domingoFestivo"
                            ? <FaChevronUp />
                            : <FaChevronDown />}
                          {" "}
                          Domingo y Festivos
                        </div>

                        {horarioExpandido === "domingoFestivo" && (
                          <div style={{ marginTop: "10px" }}>
                            <p>
                              ➡️ Ida:
                              {bus.horarios.domingoFestivo.ida.join(" • ")}
                            </p>

                            <p>
                              ⬅️ Vuelta:
                              {bus.horarios.domingoFestivo.vuelta.join(" • ")}
                            </p>
                          </div>
                        )}
                      </>
                    )}


                </div>
              )}

          </div>
        ))} {/*Aqui termina seccion buses */}
  </div>    {/*este div se queda, es de arriba no de buses */}  
              
{/*Menu boton Más de la barra de navegacion */}
              {mostrarMas && (
                <div
                  style={{
                    position: "fixed",
                    bottom: "80px",
                    right: "20px",
                    background: "white",
                    borderRadius: "16px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    zIndex: 1000
                  }}
                >
                  <p
                  onClick={() => {scrollSuave("farmacias");
                                  setMostrarMas(false);
                                }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      margin: "8px 0"
                    }}
                  >
                    <FaMedkit style={{ color: COLOR_FARMACIA }} />
                    Farmacias
                  </p>
                  <p
                  onClick={() => {
                                  scrollSuave("transportes");
                                  setMostrarMas(false);
                                }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "8px 0"
                    }}                  
                  >
                      <FaTaxi style={{color: COLOR_TRANSPORTE}}/> Transportes
                  </p>
                  <p
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: "8px 0"
                      }}><FaGlassCheers style={{color: COLOR_EVENTO}}/> Eventos
                  </p>
                </div>
              )}

{/* Aqui empieza la barra inferior
con los botones de navegacion tipo app */}
            <div            
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "20px 0",
                  paddingBottom: "20px",
                  boxShadow: "0 -2px 10px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                }}
              >
              <div
                onClick={() => scrollSuave("inicio")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "30px"
                       }}
                ><FaHome color="#1976D2"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                  }}
                >
                  Inicio
                </p>
              </div>
              <div
                onClick={() => scrollSuave("comercios")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "30px"
                       }}        
                ><FaStore style={{ marginRight: "6px", color:"#2E7D32"}}/>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                  }}
                >
                  Comercio
                </p>
              </div>
              <div
                onClick={() => scrollSuave("lugares")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "30px"
                       }}                  
                ><FaMapMarkedAlt color="#26A69A"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                  }}
                >
                  Lugares
                </p>
              </div>
              <div
                onClick={() => scrollSuave("emergencias")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "30px"
                       }}      
                
                ><FaExclamationTriangle color="#D32F2F"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                  }}
                >
                  Emergencias
                </p>
                </div>

                <div
                onClick={() => scrollSuave("emergencias"),
                         () => setMostrarMas(!mostrarMas)
                }
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "30px"
                       }}      
                
                ><FaBars  color="#000000"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                  }}
                >
                  Más
                </p>
                </div>
              </div>

             <div
             onClick={irADestacado}
              style={{                
                position: "fixed",
                right: "5px",
                bottom: "210px",
                zIndex: "1000",
                cursor: "pointer"
              }}
              >
                  <div
                    style={{
                      backgroundColor: COLOR_EVENTO,
                      color: "white",
                      borderRadius: "30px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                      fontWeight: "600"
                    }}
                  >
                    <FaCompass />                    
                  
                    {/*mostrarTexto && (*/}
                      <span>{textoBrujula()}</span>
                     {/*)}*/ }
                  </div>
              </div>
              <footer
                style={{
                  marginTop: "40px",
                  padding: "20px",
                  textAlign: "center",
                  fontSize: "14px", 
                  paddingBottom: "120px",
                  color: "#666"
                }}
              >
                <a
                    href="mailto:contacto@quillonahora.cl"
                    style={{
                      color: "inherit"
                    }}
                  >
                   📧 contacto@quillonahora.cl
                  </a>

                <p>
                  ¿Encontraste información incorrecta o tienes una sugerencia?
                  Escríbenos.
                </p>

                <p
                style={{
                    fontSize: "12px",
                    color: "#777",
                    fontStyle: "italic",
                    marginTop: "15px"}}
                  >Los nombres comerciales y marcas mencionados pertenecen 
                  a sus respectivos propietarios y se utilizan únicamente 
                  con fines informativos y de orientación para la comunidad.</p>

                <p>
                  QUILLÓN AHORA v0.4.0 Beta
                </p>
              </footer>
    </div>
  );
}

export default App;