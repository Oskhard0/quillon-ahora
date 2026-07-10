// ======================================================
// APP.JSX
//
// Orquestador principal de QUILLÓN AHORA.
//
// Este archivo coordina la navegación, el estado global
// y la composición de los módulos principales.
//
// La lógica reutilizable debe migrar progresivamente a:
// - utils/
// - components/
// - styles/
//
// Estado actual:
// App.jsx aún contiene lógica en proceso de extracción,
// manteniendo siempre el Estado Verde del proyecto.
// ======================================================
import { useState, useEffect, useRef } from "react";
import Seccion from "./components/sections/Seccion.jsx";
import Tarjeta from "./components/ui/Tarjeta.jsx";
import TarjetaComercio from "./components/ui/TarjetaComercio";
import { ESTILO_SECCION, ESTILO_TARJETA } from "./styles/componentes";
import { TAMANOS } from "./styles/tipografia.js";
import comercios from "./data/comercios";
import { estaAbierto } from "./utils/horarios";
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
import {COLORES} from "./styles/colores.js";
import {COLORES_SECCION} from "./styles/colores.js";
import { GRADIENTES } from "./styles/colores.js";
import { FaHome} from "react-icons/fa";
import { FaStore} from "react-icons/fa";
import { FaMapMarkedAlt} from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { buscarIntencion } from "./utils/motor_intenciones.js";
import { ESTILOS_INTENCION } from "./styles/intenciones";
import { ACCIONES } from "./utils/motor_acciones";
import { DESTINOS_BRUJULA} from "./knowledge/brujula";
import { TIPO_ENTIDAD } from "./knowledge/tipos_entidad";
import { obtenerDestacados } from "./knowledge/motor_destacados";
import { obtenerDestinoBrujula } from "./utils/motor_brujula";
import TarjetaIntencion from "./components/ui/TarjetaIntenciones.jsx";
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
  } from "react-icons/fa"; //*Aca se declaran los iconos react que se necesitan, si faltan se agregan a la lista.

  //*Inicio de app, aqui van todas las constantes o funciones 
function App() {  
// ======================================================
// DESTACADOS AHORA
//
// Obtiene la configuración actual de los destacados.
//
// ======================================================

const destacadosConfigurados  = obtenerDestacados();


// ======================================================
// BRÚJULA
//
// Obtiene el destino actual recomendado por la Brújula.
//
// ======================================================

const destinoBrujula = obtenerDestinoBrujula();


// ======================================================
// ESTADOS
// Controlan el estado global de la interfaz y la interacción del usuario.
// ======================================================

const [tarjetasAbiertas, setTarjetasAbiertas] = useState({});
const [categoriaAbierta, setCategoriaAbierta] = useState(null);

// ======================================================
// CATEGORÍAS
// ======================================================

const categoriasUnicas = [
  ...new Set(
    comercios.flatMap((comercio) =>
      comercio.categoria
        .split("•")
        .map((cat) => cat.trim())
    )
  )
].sort();

// ======================================================
// RESUMEN DE CATEGORÍAS
// total / abiertos / cerrados
// ======================================================

const estadoCategorias = {};

comercios.forEach((comercio) => {

  comercio.categoria
    .split("•")
    .map((cat) => cat.trim())
    .forEach((categoria) => {


      if (!estadoCategorias[categoria]) {

        estadoCategorias[categoria] = {
          total: 0,
          abiertos: 0,
          cerrados: 0
        };

      }

      estadoCategorias[categoria].total++;

        if (estaAbierto(comercio.horario)) {
            estadoCategorias[categoria].abiertos++;
        } else {
            estadoCategorias[categoria].cerrados++;
        }
    });

});

// ======================================================
// TRANSPORTES · MOTOR DE TIEMPO
//
// Calcula el día actual, la próxima salida disponible y
// el tiempo restante para los recorridos de buses.
//
// Arquitectura:
// Este bloque constituye el motor temporal de Transportes.
// En una futura refactorización deberá migrar a utils/buses.js.
// ======================================================
  const hoy = new Date();  // TODO Auditoría Revisar si las referencias de tiempo pueden unificarse utilizando una única fecha base.
  const diaSemana = hoy.getDay();
  const horaActual = new Date(); 
  const minutosActuales =
  horaActual.getHours() * 60 +
  horaActual.getMinutes();
  let horariosActuales;  // TODO Auditoría Revisar si esta variable sigue siendo necesaria.
  let nombreDia; // TODO Auditoría

// ------------------------------------------------------
// Devuelve la próxima salida disponible según la hora actual.
// Utilizada por el módulo Transportes.
// ------------------------------------------------------
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

// ------------------------------------------------------
// Calcula el tiempo restante hasta una salida determinada.
// Utilizada por el módulo Transportes.
// ------------------------------------------------------
const obtenerMinutosRestantes = (horaSalida) => {
  if (!horaSalida) return null;
  const ahora = new Date(); // TODO Auditoría
  const minutosActuales =
    ahora.getHours() * 60 +
    ahora.getMinutes();

  const [h, m] = horaSalida.split(":");

  const minutosSalida =
    Number(h) * 60 +
    Number(m);

  return minutosSalida - minutosActuales;
  };

 // ------------------------------------------------------
// Genera un mensaje legible para el usuario indicando
// cuánto falta para la próxima salida.
// -----------------------------------------------------
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

// Arquitectura:
// Selecciona automáticamente el conjunto de horarios
// correspondiente al día actual.
  const claveDiaActual = 
  diaSemana >= 1 && diaSemana <= 5
    ? "lunesViernes"
    : diaSemana === 6
      ? "sabado"
      : "domingoFestivo";

// Arquitectura:
// Genera el nombre del día mostrado al usuario,
// manteniendo una única nomenclatura para toda la aplicación.

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
 // ======================================================


// ======================================================
// ESTADO · TRANSPORTES
//
// Controla los menús desplegables del módulo Transportes,
// permitiendo expandir recorridos y horarios.
// ======================================================
  const [busExpandido, setBusExpandido] = useState(null);
  const [diaExpandido, setDiaExpandido] = useState(null); // TODO Auditoría Verificar si este estado continúa utilizándose.
  const [horarioExpandido, setHorarioExpandido] = useState(null);


// ======================================================
// DATOS DERIVADOS
//
// Obtiene información calculada a partir de los datos
// principales utilizados por la interfaz.
// ======================================================

  const farmaciasRef = useRef(null);
  const transportesRef = useRef(null);
  const lugaresRef = useRef(null);
  const farmaciaActual = farmacias.find(
  farmacia => farmacia.id === farmaciaTurno.farmaciaId
)  || {};

const proximoBusChillan =
buses.find(
    bus => bus.ruta === "Quillón - Chillán"
);

const proximoBusConcepcion =
buses.find(
    bus => bus.ruta === "Quillón - Concepción"
);

// ======================================================
// NAVEGACIÓN
// ======================================================

// ------------------------------------------------------
// Desplaza suavemente la pantalla hasta una sección.
//
// Utilizada por:
// - barra inferior
// - accesos rápidos
// - buscador
// - brújula
// ------------------------------------------------------
  const scrollSuave = (id) => {
  const seccion = document.getElementById(id);

// Futuro:
// Extraer a utils/navigation.js

  if (seccion) {
    window.scrollTo({
      top: seccion.offsetTop - 40,
      behavior: "smooth",
    });
  }
};

// ------------------------------------------------------
// CONTEXTO
//
// Restablece la interfaz a un estado neutro antes de
// iniciar una nueva navegación principal.
//
// Responsabilidad:
//
// • Limpiar búsquedas.
// • Cerrar fichas abiertas.
// • Restablecer elementos temporales de la interfaz.
//
// Arquitectura:
//
// No realiza navegación.
// Solo reinicia el contexto activo del usuario.
// ------------------------------------------------------
const limpiarContexto = () => {

  setBusqueda("");

  setDetalleComercio(null);

  setDetalleLugar(null);

  setMostrarMas(false);

};

// ------------------------------------------------------
// NAVEGACIÓN PRINCIPAL
//
// Inicia una nueva navegación desde la barra inferior.
//
// Responsabilidad:
//
// • Reiniciar el contexto anterior.
// • Desplazar la pantalla a la nueva sección.
//
// Arquitectura:
//
// Se utiliza exclusivamente desde la navegación principal.
// ------------------------------------------------------
const navegarASeccion = (id) => {

    limpiarContexto();

    scrollSuave(id);

};

// ======================================================
// BRÚJULA
//
// Controla el comportamiento del botón flotante,
// incluyendo su navegación y el contexto de la sección actual.
//
// Futuro:
// Este bloque migrará al componente Brújula cuando deje de
// depender del estado global de App.
// ======================================================
// ------------------------------------------------------
// Desplaza la pantalla hasta el elemento principal de la
// sección actualmente visible.
// ------------------------------------------------------


  const irADestacado = () => {

    let destino = null;

    if (seccionActual === "comercios" && comercioDestacado) {
        destino = `comercio-${comercioDestacado.id}`;
  }
// TODO Auditoría
// Renombrar a comercioInicial cuando finalice la
// migración de la Brújula.
 if (seccionActual === "comercios" && comercioDestacado) {

    abrirComercioDesdeBrujula(destinoBrujula.entidad);

    return;
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

  const [busqueda, setBusqueda] = useState(""); //Buscador.
  const [detalleLugar, setDetalleLugar] = useState(null); //Lugares.
  const [detalleComercio, setDetalleComercio] = useState(null); //Comercios.
  const [mostrarTexto, setMostrarTexto] = useState(false); // TODO Auditoría  Verificar si este estado continúa utilizándose.
  const [mostrarMas, setMostrarMas] = useState(false); //Menú inferior, barra de navegacion.
  const [farmaciaExpandida, setFarmaciaExpandida] = useState(null); //Farmacias.
  const [seccionActual, setSeccionActual] = useState("inicio"); //Brújula.
  const [brujulaContraida, setBrujulaContraida] = useState(false);//Brújula.
  const [destinoScroll, setDestinoScroll] = useState(null);

// ======================================================
// BÚSQUEDA / MOTOR DE INTENCIONES
//
// Interpreta el texto ingresado por el usuario para
// determinar si corresponde a una intención conocida.
//
// Este motor no genera recomendaciones.
// Solo identifica la intención y la devuelve para que
// otros módulos decidan cómo responder.
//
// Arquitectura:
// En el futuro podrá evolucionar para incorporar modelos
// de IA, manteniendo la misma interfaz pública.
// ======================================================

const intencion = buscarIntencion(busqueda);


const estiloIntencion = intencion
  ? ESTILOS_INTENCION[intencion.ambiente]
  : null;
// ======================================================
// ACCIONES DE NAVEGACIÓN
//
// Centraliza todas las acciones que modifican el estado
// de navegación de la interfaz.
//
// Incluye:
//
// • Apertura de detalles.
// • Navegación a destacados.
// • Ejecución de acciones provenientes del
//   Motor de Acciones.
// ======================================================
  useEffect(() => {

// ------------------------------------------------------
// Identifica la sección ubicada en el centro de la pantalla
// y actualiza el contexto de navegación.
// ------------------------------------------------------
  const detectarSeccion = () => {

    const puntoCentral =
      window.scrollY + window.innerHeight / 2;

// Futuro:
// Extraer la configuración de secciones a un archivo dedicado.
    const secciones = [
      "inicio",
      "emergencias",
      "comercios",
      "lugares",
      "eventos"
    ];

// Recorre las secciones registradas hasta encontrar
// aquella que ocupa el centro de la pantalla.

    for (const id of secciones) {

      const elemento =
        document.getElementById(id);

      if (!elemento) continue;
      // Calcula los límites visibles de la sección actual.
      const inicio = elemento.offsetTop;
      const fin = inicio + elemento.offsetHeight;

      // Si el centro de la pantalla se encuentra dentro de la
      // sección, esta pasa a ser la sección activa.
      if (
        puntoCentral >= inicio &&
        puntoCentral < fin
      ) {
        setSeccionActual(id);
        break;
      }
    }
  };
// Inicia la detección automática durante el desplazamiento.
  window.addEventListener(
    "scroll",
    detectarSeccion
  );

  detectarSeccion();
// Elimina el listener al desmontar el componente.
  return () => {
    window.removeEventListener(
      "scroll",
      detectarSeccion
    );
  };

}, []);

// ======================================================
// DETALLE DE TARJETAS
//
// Controla la apertura y cierre del contenido expandible
// de cada módulo.
// ======================================================

    const toggleDetalleFarmacia = (id) => {
  setDetalleFarmacia(
    detalleFarmacia === id ? null : id
  );
  }; // Alterna el detalle visible de una farmacia.

  const toggleDetalleComercio = (id) => {
  setDetalleComercio(
    detalleComercio === id ? null : id
  );
  }; // Alterna el detalle visible de un comercio.

  const irAComercioDestacado = () => {
  scrollSuave("comercios");

  setDetalleComercio(
    comercioDestacado.id
  ); // Alterna el detalle visible de un lugar de interés.

  };

  // Futuro:
// Evaluar una función reutilizable para alternar
// detalles expandibles.

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
// ------------------------------------------------------
// Ejecuta una acción proveniente del Motor de Acciones.
//
// Responsabilidad:
//
// Interpretar las acciones generadas por los distintos
// motores de la aplicación.
//
// Actualmente solo registra la acción recibida.
//
// En futuros microhitos ejecutará la navegación real.
// ------------------------------------------------------

function ejecutarAccion(accion) {

    switch (accion.accion) {

        case ACCIONES.ABRIR_CATEGORIA:

            toggleCategoria(accion.categoria);
            scrollSuave("comercios");

            break;

        default:

            console.warn("Acción no soportada:", accion);

    }

}

// ======================================================
// CONFIGURACIÓN · LUGARES
//
// Relaciona cada lugar con la imagen utilizada por la
// interfaz.
// ======================================================
  const imagenesLugares = {
  laguna: lagunaAvendano,
  cascada: cascadaLiucura,
  elRoble: elRoble,
  bioparque: bioparque
  };

  
  // ======================================================
// MOTOR DE BÚSQUEDA
//
// Genera los resultados de búsqueda para los distintos
// módulos de QUILLÓN AHORA.
//
// Arquitectura:
// Actualmente realiza filtros independientes por módulo.
// En una futura versión podrá evolucionar hacia un buscador
// unificado con resultados agrupados.
// ======================================================

  const comerciosFiltrados = comercios.filter(comercio =>
  (comercio.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
  (comercio.categoria || "").toLowerCase().includes(busqueda.toLowerCase()) ||
  (comercio.direccion || "").toLowerCase().includes(busqueda.toLowerCase()) ||
  (comercio.referencia || "").toLowerCase().includes(busqueda.toLowerCase())
);

// ------------------------------------------------------
// Filtra las farmacias según el texto ingresado.
// ------------------------------------------------------
  const farmaciasFiltradas = farmacias.filter(farmacia =>
  farmacia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  farmacia.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
  farmacia.referencia.toLowerCase().includes(busqueda.toLowerCase())
);
// ------------------------------------------------------
// Filtra los taxis por nombre o teléfono.
// ------------------------------------------------------

const taxisFiltrados = taxis.filter(taxi =>
  taxi.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  taxi.telefono.includes(busqueda)
);

// ------------------------------------------------------
// Filtra los recorridos de buses por nombre, ruta,
// empresa o términos relacionados.
// ------------------------------------------------------
const busesFiltrados = buses.filter(bus =>
  bus.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  bus.ruta.toLowerCase().includes(busqueda.toLowerCase()) ||
  bus.empresas.some(empresa =>
    empresa.toLowerCase().includes(busqueda.toLowerCase())
  ) ||
  "bus".includes(busqueda.toLowerCase()) ||
  "buses".includes(busqueda.toLowerCase())
);

// TODO Auditoría
// Normalizar el texto de búsqueda una sola vez para
// evitar conversiones repetidas.


// ======================================================
// DATOS DERIVADOS · TRANSPORTES
//
// Calcula la próxima salida disponible y el tiempo
// restante para los recorridos principales.
// ======================================================
const salidaChillan =
  obtenerProximaSalida(
    proximoBusChillan.horarios[claveDiaActual].ida
  );

const minutosChillan =
  obtenerMinutosRestantes(salidaChillan);

const salidaConcepcion =
  obtenerProximaSalida(
    proximoBusConcepcion.horarios[claveDiaActual].ida
  );

const minutosConcepcion =
  obtenerMinutosRestantes(salidaConcepcion);

// ======================================================
// ELEMENTOS PRINCIPALES
//
// Obtiene los elementos utilizados por la Brújula para
// realizar la navegación contextual.
//
// TODO Auditoría:
// Revisar la nomenclatura "comercioDestacado", ya que el
// Motor de Horarios puede seleccionar un comercio que no
// necesariamente sea destacado.
// ======================================================
// ======================================================
// DESTACADOS AHORA
//
// Resolución temporal de las entidades utilizadas por la
// tarjeta "Destacados Ahora".
//
// TODO Auditoría:
// Sustituir esta implementación por el Motor de
// Destacados una vez finalizada la migración.
//
// ======================================================

const comercioDestacado =
  destacadosConfigurados.find(
    d => d.tipo === TIPO_ENTIDAD.COMERCIO
  )?.entidad;

const lugarDestacado =
  destacadosConfigurados.find(
    d => d.tipo === TIPO_ENTIDAD.LUGAR
  )?.entidad;
  // ======================================================
// DESTACADOS AHORA
//
// Obtiene las entidades definidas por el sistema de
// Destacados.
//
// TODO Auditoría:
// Sustituir esta resolución temporal por el
// Motor de Destacados.
// ======================================================

// ------------------------------------------------------
// Devuelve el texto mostrado por la Brújula según la
// sección actualmente visible.
// ------------------------------------------------------
  const textoBrujula = () => {
  if (seccionActual === "comercios")
    return comercioDestacado?.nombre;
  if (seccionActual === "lugares")
    return lugarDestacado?.nombre;
  return "Recomendado por QA";
  };
// TODO Auditoría
// Actualizar el texto por defecto de la Brújula tras la
// eliminación de la categoría "Abierto ahora".

// ======================================================
// ELEMENTOS PRINCIPALES
//
// Reúne los elementos utilizados por la Brújula para la
// navegación contextual, descartando referencias nulas.
// ======================================================
  const destacados = [comercioDestacado, lugarDestacado].filter(Boolean);
// TODO Auditoría
// Revisar la nomenclatura cuando la Brújula evolucione
// hacia el Módulo de Navegación Inteligente.
  
// ======================================================
// ICONOGRAFÍA DE COMERCIOS
//
// Asigna el icono representativo a cada categoría de
// comercio utilizada por la aplicación.
//
// Arquitectura:
// Esta configuración forma parte del Design System.
// En el futuro podrá migrar a una configuración central
// de iconografía.
// ======================================================

// Futuro:
// Migrar a styles/iconos.js

  const obtenerIconoCategoria = (categoria) => {
  switch (categoria.toLowerCase()) {
    case "restaurante":
      return "🍽️";

    case "ferreteria":
      return "🛠️";

    case "floreria":
      return "🌸";

    case "farmacia":
      return "💊";

    case "supermercado":
      return "🛒";

    case "panaderia":
      return "🥖";

    case "verduleria":
      return "🥬";

    case "carniceria":
      return "🥩";

    case "pizzeria":
      return "🍕";
    
    case "almacen":
      return "🏪";
    
    case "bar":
      return "🍺";

    case "botilleria":
      return "🍷";
    
    case "cafeteria":
      return "☕";

    case "bazar":
      return "🛍️";
    
    case "comercializadora":
      return "📦";

    case "cuberteria":
      return "🍴";
    
    case "distribuidora":
      return "🚚";

    case "fastfood":
      return "🍔";

    case "floristeria":
      return "💐";

    case "fruteria":
      return "🍎";
    
    case "libreria":
      return "📚";

    case "material sanitario":
      return "🩺";

    case "multitienda":
      return "🏬";

    case "veterinaria":
      return "🐶";

    case "funeraria":
      return "⚰️";

    case "vulcanizacion":
      return "🛞";

    case "taller mecanico":
      return " 🔧";

    case "peluqueria":
      return "💇";
    
      case "repuestos automotrices":
      return "⚙️";

    default:
      return "📍";
      
  }
 };

// ======================================================
// RESULTADOS DE BÚSQUEDA
//
// Calcula la cantidad total de coincidencias obtenidas
// por el Motor de Búsqueda.
// ======================================================
  
const totalResultados =
  comerciosFiltrados.length +
  farmaciasFiltradas.length +
  taxisFiltrados.length +
  busesFiltrados.length;


// ======================================================
// COMERCIOS · NAVEGACIÓN
//
// Gestiona la interacción de las categorías y tarjetas
// del módulo Comercios.
//
// Arquitectura:
// Solo una categoría puede permanecer abierta al mismo
// tiempo, mientras que cada categoría puede mantener
// múltiples tarjetas expandidas.
//
// La selección inicial del comercio depende
// exclusivamente del Motor de Horarios.
// ======================================================
// ------------------------------------------------------
// Abre o cierra una categoría y selecciona automáticamente
// el comercio inicial según las reglas del Motor de Horarios.
// ------------------------------------------------------
 function toggleCategoria(categoria, comercioForzado = null) {

  

  if (categoriaAbierta === categoria) {

    setCategoriaAbierta(null);

    return;

  }

  // Abrimos la nueva categoría
  setCategoriaAbierta(categoria);

  // ------------------------------------------------------
  // Navegación dirigida.
  //
  // Arquitectura:
  //
  // Permite que otros módulos (como la Brújula)
  // indiquen explícitamente qué comercio debe abrirse,
  // evitando aplicar la selección automática del
  // Motor de Horarios.
  // ------------------------------------------------------

  if (comercioForzado) {

    setTarjetasAbiertas({

      [categoria]: [comercioForzado.id]

    });

    return;

  }

  const comercioInicial =
    obtenerComercioInicial(categoria);

  // Si existe, abrimos esa tarjeta
  if (comercioInicial) {

    setTarjetasAbiertas({

      [categoria]: [comercioInicial.id]

    });

  }

}

// ------------------------------------------------------
// Determina qué comercio debe abrirse automáticamente al
// ingresar a una categoría.
//
// Prioridad:
//
// 1. Primer comercio abierto.
// 2. Comercio destacado.
// 3. Primer comercio disponible.
//
// Arquitectura:
// El estado abierto/cerrado se obtiene exclusivamente
// desde el Motor de Horarios.
// ------------------------------------------------------
  function obtenerComercioInicial(categoria) {

  const comerciosCategoria = comercios.filter((comercio) =>
    comercio.categoria
      .split("•")
      .map((cat) => cat.trim())
      .includes(categoria)
  );
 
 const primerAbierto = comerciosCategoria.find(c =>
    estaAbierto(c.horario)  
  );

  if (primerAbierto) return primerAbierto;

  const destacado = comerciosCategoria.find(
    (c) => c.destacado
  );

  if (destacado) return destacado;

  return comerciosCategoria[0] ?? null;

}
// ------------------------------------------------------
// Alterna el estado expandido de una tarjeta de comercio.
//
// Arquitectura:
// Una categoría puede mantener múltiples tarjetas abiertas
// simultáneamente.
// ------------------------------------------------------

function toggleTarjeta(categoria, id) {

  setTarjetasAbiertas((prev) => {

    const abiertas = prev[categoria] || [];

    const existe = abiertas.includes(id);

    return {
      ...prev,
      [categoria]: existe
        ? abiertas.filter((x) => x !== id)
        : [...abiertas, id]
    };

  });

}
// ------------------------------------------------------
// BRÚJULA
//
// Navega directamente hacia un comercio recomendado por
// la Brújula.
//
// Arquitectura:
//
// Abre automáticamente la categoría principal y la
// tarjeta del comercio.
//
// El desplazamiento (scroll) se realiza posteriormente
// cuando React termina de renderizar.
//
// ------------------------------------------------------

function abrirComercioDesdeBrujula(comercio) {

  // 1. La Brújula define el comercio activo
    setDestinoScroll(comercio.id);

  // 2. Obtiene la categoría principal
   const categoriaPrincipal =
      comercio.categoria
        .split("•")[0]
        .trim();

        

     // 3. Abre la categoría correspondiente
    toggleCategoria(categoriaPrincipal, comercio);
}

// ======================================================
// efecto nuevo para brujula
// ======================================================

useEffect(() => {
  const contraer =
  busqueda.trim() !== "" ||
  detalleComercio !== null ||
  detalleLugar !== null;

  

  setBrujulaContraida(contraer);
}, [busqueda]);


useEffect(() => {

  

  if (!destinoScroll) return;

  const elemento = document.getElementById(
    `comercio-${destinoScroll}`
  );


  if (!elemento) return;

  elemento.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  setDestinoScroll(null);

}, [
  destinoScroll,
  categoriaAbierta,
  tarjetasAbiertas
]);
// ======================================================
// HERO
//
// Presentación principal de QUILLÓN AHORA.
//
// Da la bienvenida al usuario y comunica la identidad,
// propósito y estado actual de la aplicación.
//
// UX:
// Es la primera impresión del usuario y debe transmitir
// confianza, simplicidad y cercanía.
// ======================================================

// ======================================================
// HERO
//
// Presenta la identidad visual de QUILLÓN AHORA.
//
// UX:
// Primera impresión del usuario.
//
// ======================================================

  return (
    // Sección inicial utilizada como punto de referencia para
      // la navegación principal de la aplicación.
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORES.fondo,
        fontFamily: "'Segoe UI', sans-serif",
        padding: "12px",
        overflowX: "hidden"
      }}
    >
      
      <header
      id="inicio"
        style={{
          background: GRADIENTES.principal,
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
      {/* ======================================================
          HERO
      ====================================================== */}
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
          backgroundColor: COLORES.fondo,
          color: COLORES.texto,
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "20px",
          fontSize: TAMANOS.sm,
          textAlign: "center"
        }}
      >
        {/* Aviso Beta */}
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
  // Mensaje que resume la filosofía de QUILLÓN AHORA.
      >
        La app del vecino que sabe
      </p>
      
    </div>
  </div>
  
</header>
</header>
{/* ======================================================
    CENTRO DE INFORMACIÓN INMEDIATA

    Reúne la información más importante para el usuario
    al ingresar a QUILLÓN AHORA.
====================================================== */}

<div
  style={{
    backgroundColor: "#FFF8E1",
    borderLeft: "6px solid #FFB300",
    borderTop: "6px solid #FFB300",
    borderRadius: "12px",
    padding: "15px",
    marginTop: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }}
>
  <h3>📌 Importante Ahora</h3>

{/* Farmacia de Turno */}
  <div
  onClick={() => scrollSuave("farmaciaTurno")}
  style={{
    cursor: "pointer",
    padding: "10px",
    borderRadius: "10px"
  }}
  
>
  <strong>💊 Farmacia de turno</strong>

  <p>{farmaciaActual?.nombre}</p>

  <p
    style={{
      fontSize: TAMANOS.sm,
      color: COLORES.subtitulo,
      marginBottom: 0
    }}
  >
    ⬇ Ver más detalles
  </p>
</div>

  <hr />
{/* Próximo bus a Chillán */}
  <div
  onClick={() => scrollSuave("transportes")}
  style={{
    cursor: "pointer",
    padding: "10px",
    borderRadius: "10px"
  }}
>
  <strong>🚌 Próximo bus a Chillán</strong> 
  
<p>
  Próxima salida:
  {
    obtenerProximaSalida(
      proximoBusChillan.horarios[claveDiaActual].ida
    ) || "NINGUNA"
  }
</p>
  <p>
     {
    formatearTiempoRestante(
      obtenerMinutosRestantes(
        obtenerProximaSalida(
          proximoBusChillan.horarios[claveDiaActual].ida
        )
      )
    )
  }
  </p>

  <p
    style={{
      fontSize: TAMANOS.sm,
      color: COLORES.subtitulo,
      marginBottom: 0
    }}
  >
    ⬇ Ver más detalles
  </p>

</div>

   <hr />
{/* Próximo bus a Concepción */}
  
 <div
  onClick={() => scrollSuave("transportes")}
  style={{
    cursor: "pointer",
    padding: "10px",
    borderRadius: "10px"
  }}
>
  <strong>🚌 Próximo bus a Concepción</strong>

  <p>
    Próxima salida: 
  {
    obtenerProximaSalida(
      proximoBusConcepcion.horarios[claveDiaActual].ida
    ) || "NINGUNA"
  }
  </p>

  <p>
    {
    formatearTiempoRestante(
      obtenerMinutosRestantes(
        obtenerProximaSalida(
          proximoBusConcepcion.horarios[claveDiaActual].ida
        )
      )
    )
  }
  </p>

  <p
    style={{
      fontSize: TAMANOS.sm,
      color: COLORES.subtitulo,
      marginBottom: 0
    }}
  >
    ⬇ Ver más detalles
  </p>
</div>
  
</div>

{/* ======================================================
    BRÚJULA · ACCESOS PRINCIPALES

    Presenta los accesos rápidos hacia los elementos
    principales de cada sección de la aplicación.

    UX:
    Permite al usuario descubrir contenido relevante
    con un solo toque.
====================================================== */}
<div
          style={{
             ...ESTILO_SECCION,
            backgroundColor: "#FFF8E1",
            borderTop: `5px solid ${COLORES_SECCION.evento}`,
            borderLeft: `5px solid ${COLORES_SECCION.evento}`,
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
          }}
      >
          <strong
            style={{
              color: COLORES_SECCION.evento,
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "700",
              marginBottom: "12px"
            }}
          >
            <FaCompass /> Destacados Ahora
          </strong>
          {/* Comercio principal */}
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
              {/* Lugar de interés principal */}
              <FaMapMarkedAlt
                style={{
                  marginRight: "8px",
                  color:"#424242"
                }}
              />

              {lugarDestacado.nombre}

            </p>
</div>


{/* / ======================================================
// BUSCADOR GLOBAL
//
// Punto de entrada del Motor de Búsqueda.
//
// UX:
// Permite al usuario localizar rápidamente información
// relevante sin navegar manualmente por los módulos.
//
// Arquitectura:
// Actualmente consulta módulos independientes
// (Comercios, Farmacias, Transportes).
//
// En una futura versión evolucionará hacia el
// Motor de Búsqueda Unificado.
// ======================================================
*/}

{/* Campo de búsqueda */}
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
            fontSize: TAMANOS.md,
            boxSizing: "border-box"
          }}
        />
      </div>
      

      {busqueda && (
        <div
        style={{
          backgroundColor: COLORES.fondo,
          padding: "15px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
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

{intencion && (
  <TarjetaIntencion
    intencion={intencion}
    estilo={estiloIntencion}
    onSeleccionarCategoria={ejecutarAccion}
/>
)}

{/*// ======================================================
// RESULTADOS DEL BUSCADOR
//
// Se muestran únicamente cuando existe texto ingresado.
//
// Arquitectura:
// El Motor de Búsqueda solo obtiene coincidencias.
// Cada dominio es responsable de representar sus propios
// resultados mediante sus componentes oficiales.
//
// Ejemplos:
// - Comercios → TarjetaComercio
// - Farmacias → TarjetaFarmacia (futuro)
// - Buses → TarjetaBus (futuro)
// ====================================================== 
// // ------------------------------------------------------
// RESULTADOS · COMERCIOS
//
// Utiliza el componente oficial TarjetaComercio.
//
// Arquitectura:
// El buscador no conoce la representación visual de un
// comercio. Solo entrega los resultados encontrados.
// ------------------------------------------------------*/}
        <h3>🔍 Resultados</h3>
        {comerciosFiltrados.length === 0 && (
          <p>No se encontraron comercios con ese criterio.</p>
        )}

         {comerciosFiltrados.map((comercio) => (
              <TarjetaComercio
                key={comercio.id}
                comercio={comercio}
                expandida={detalleComercio === comercio.id}
                onClick={() => toggleDetalleComercio(comercio.id)}
              />
            ))}

 {/*// ------------------------------------------------------
// RESULTADOS · FARMACIAS
//
// Muestra las farmacias coincidentes con la búsqueda.
//
// TODO Arquitectura:
// Sustituir esta representación por TarjetaFarmacia
// cuando el componente exista.
// ------------------------------------------------------ */}
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
                      borderTop: `5px solid ${COLORES_SECCION.farmacia}`,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <strong>{farmacia.nombre}</strong>
                    <p
                      style={{
                        fontSize: TAMANOS.xs,
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

{/*// ------------------------------------------------------
// RESULTADOS · TAXIS
//
// Presenta accesos rápidos a teléfonos de taxis.
//
// TODO Arquitectura:
// Migrar a TarjetaTaxi para unificar la presentación.
// ------------------------------------------------------ */}
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
                      backgroundColor: COLORES.fondo,
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      borderTop: `5px solid ${COLORES_SECCION.transporte}`,
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
 {/*// ------------------------------------------------------
// RESULTADOS · BUSES
//
// Presenta recorridos encontrados.
//
// TODO Arquitectura:
// Reemplazar por TarjetaBus para reutilizar la lógica del
// módulo Transportes.
// ------------------------------------------------------ */}
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
                      backgroundColor: COLORES.fondo,
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      borderTop: `5px solid ${COLORES_SECCION.transporte}`,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <strong>{bus.nombre}</strong>
                    <p
                        style={{
                          fontSize: TAMANOS.xs,
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

{/*// ======================================================
// INFORMACIÓN CRÍTICA
//
// Reúne los módulos de mayor prioridad para el usuario,
// proporcionando acceso inmediato a servicios esenciales.
//
// UX:
// Esta zona concentra información que el usuario puede
// necesitar con urgencia o alta frecuencia.
//
// Módulos:
// - Farmacia de Turno
// - Emergencias
// ======================================================*/}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}        
      >
{/*// ======================================================
// FARMACIA DE TURNO
//
// Muestra la farmacia oficialmente asignada para el día,
// junto con su información de contacto.
//
// Fuente de datos:
// farmacia_turno.js
//
// UX:
// Es uno de los módulos prioritarios de la aplicación,
// por lo que permanece siempre visible desde la pantalla
// principal.
// ======================================================*/}
        <div          
          id="farmaciaTurno"  
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
              backgroundColor: COLORES.fondo,
               ...ESTILO_SECCION,
              border: `3px solid ${COLORES_SECCION.farmacia}`,
              borderTop: `4px solid ${COLORES_SECCION.farmacia}`,
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
            > {/*Termino del primer div de la farmacia, solo se crearon eventos y marco*/}

{/*// Imagen representativa del módulo.
//
// Arquitectura:
// La fotografía es decorativa y no representa
// necesariamente la farmacia de turno vigente.*/}
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
              
              <h2 
              style={{ color: COLORES_SECCION.farmacia,
              marginBottom: "5px",
              fontWeight: "700",
              fontSize: TAMANOS.xxl }}
             
              >Farmacia de Turno</h2>             
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: COLORES_SECCION.farmacia,
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: "800",
                    fontSize: TAMANOS.md,
                    marginBottom: "12px",
                    letterSpacing: "0.5px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                  }}
                >
                  🟢 EN TURNO HOY
                </div>    
                         
              <p><strong
              style={{
              fontSize: TAMANOS.lg,
              color: COLORES.subtitulo}}
              >{farmaciaActual.nombre}</strong></p>
              <p> <FaMapMarkedAlt style={{ marginRight: "6px", color: COLORES_SECCION.farmacia }} />{farmaciaActual.direccion}</p>
              <p> <FaCompass style={{ marginRight: "6px", color: COLORES_SECCION.farmacia }}/>{farmaciaActual.referencia}</p>
              <p>
                <a
                  href={`tel:${farmaciaActual.telefono}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <FaPhoneAlt style={{ marginRight: "6px", color: COLORES_SECCION.farmacia }}/> {farmaciaActual.telefono}
                </a>
              </p>              
              <p> <FaClock style={{ marginRight: "6px", color: COLORES_SECCION.farmacia }}/> {farmaciaActual.horarioTurno}</p>
        </div>

{/*// ======================================================
// EMERGENCIAS
//
// Presenta los principales números de emergencia
// disponibles dentro de la comuna.
//
// Arquitectura:
// Cada registro proviene del módulo de datos
// emergencias.js.
//
// UX:
// Se prioriza el acceso inmediato mediante enlaces
// telefónicos directos.
// ======================================================*/}
      <Seccion
          id="emergencias"
          titulo="Emergencias"
          color={COLORES_SECCION.emergencia}
          icono={<FaExclamationTriangle />}
        > 
{/*// ------------------------------------------------------
// Genera automáticamente una tarjeta por cada servicio
// de emergencia registrado.
//
// Arquitectura:
// La interfaz se construye completamente a partir de los
// datos, evitando componentes estáticos.
// ------------------------------------------------------*/}
        {emergencias.map(emergencia => (
          <div
            key={emergencia.id}
            style={{              
              backgroundColor: COLORES.fondo,
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              borderTop: `4px solid ${COLORES_SECCION.emergencia}`
            }}
          >
            <strong
              style={{
              fontSize: TAMANOS.lg,
              color: COLORES.subtitulo}}
            >{emergencia.nombre}</strong>

            <p>
              <a
                href={`tel:${emergencia.telefono}`}
                style={{
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                <FaPhoneAlt style={{ marginRight: "6px", color: COLORES_SECCION.emergencia }}/> {emergencia.telefono}
              </a>
            </p>            

            {emergencia.direccion && (
              <p><FaMapMarkedAlt style={{ marginRight: "6px", color: COLORES_SECCION.emergencia }} />{emergencia.direccion}</p>
            )}

            {emergencia.horario && (
              <p><FaClock style={{ marginRight: "6px", color: COLORES_SECCION.emergencia }}/> {emergencia.horario}</p>
            )}
          </div>
        ))}
       </Seccion>

    </div> {/*aqui termina primer flex*/}

{/*// ======================================================
// CONTENIDO PRINCIPAL
//
// Reúne los dos pilares informativos de QUILLÓN AHORA:
//
// - Comercios
// - Lugares de Interés
//
// UX:
// Ambos módulos comparten el mismo espacio visual por
// representar las principales actividades que el usuario
// puede realizar dentro de la comuna.
//
// Arquitectura:
// Cada módulo mantiene su propia lógica de negocio,
// compartiendo únicamente la estructura de distribución.
// ======================================================*/}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "15px",
          flexWrap: "wrap"
        }}
      >
{/*// ======================================================
// COMERCIOS
//
// Permite explorar los comercios organizados por
// categorías.
//
// Arquitectura:
// El estado de apertura depende exclusivamente del
// Motor de Horarios.
//
// UX:
// Solo una categoría puede permanecer expandida al mismo
// tiempo para reducir el desplazamiento vertical.
// ====================================================== */}
        <div
          id="comercios"
          style={{
            flex: "1 1 350px",
            backgroundColor:COLORES.fondo,
             ...ESTILO_SECCION,
          }}
        >
          <h3
          style={{
                margin: 0,
                marginBottom: "10px",
                textAlign: "center"
            }}
          >🛍️ Comercios por Categoría</h3>
          <p
          style={{
                margin: "8px 0 18px 0",
                textAlign: "center"
            }}
          >Encuentra rápidamente lo que buscas</p>

          <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
          >
{/*// ------------------------------------------------------
// Genera dinámicamente cada categoría de comercios.
//
// Arquitectura:
// Las categorías no están definidas manualmente.
// Se obtienen directamente desde los datos disponibles.
// ------------------------------------------------------ */}
            {categoriasUnicas.map((categoria) => {
                const abierto = categoriaAbierta === categoria;
             
              return (
                <div
                   id={`categoria-${categoria}`}
                   key={categoria}
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid #e5e5e5",
                    backgroundColor: COLORES.fondo,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                >

{/* // ------------------------------------------------------
// CABECERA DE CATEGORÍA
//
// Permite expandir o contraer la categoría y muestra un
// resumen del estado actual de los comercios.
//
// Indicadores:
// 🟢 Comercios abiertos.
// 🔴 Comercios cerrados.
// ------------------------------------------------------*/}
                  <div
                    onClick={() =>
                      toggleCategoria(categoria)
                    }
                    style={{
                      cursor: "pointer",
                      padding: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: abierto ? "1px solid #eee" : "none",
                      borderTop: abierto ? "4px solid #2E7D32" : "4px solid transparent",
                      borderLeft: abierto ? "3px solid #2E7D32" : "4px solid transparent",
                      backgroundColor: abierto ? "#F1F8E9" : "#ffffff",
                      borderTopLeftRadius: "14px",
                      borderTopRightRadius: "14px",
                      fontWeight: 600
                    }}
                  >
                    <span 
                    style={{
                        fontSize: TAMANOS.sm,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                      {abierto ? "▼" : "▶"} {obtenerIconoCategoria?.(categoria) ?? "📦"}{" "}
                      {categoria}
                    </span>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: TAMANOS.xs,
                        fontWeight: "700"
                      }}
                    >

                      <span style={{ color: "#22C55E" }}>
                        🟢 {estadoCategorias[categoria].abiertos}
                      </span>

                      <span style={{ color: "#EF4444" }}>
                        🔴 {estadoCategorias[categoria].cerrados}
                      </span>

                    </span>

                  </div>

 {/* // ------------------------------------------------------
// CONTENIDO DE LA CATEGORÍA
//
// Renderiza únicamente los comercios pertenecientes a la
// categoría seleccionada.
//
// Arquitectura:
// La representación visual se delega completamente al
// componente TarjetaComercio.
// ------------------------------------------------------ */}
                      {abierto && (
                      <div
                        style={{
                          backgroundColor: "#fff",

                          marginLeft: "1px",

                          paddingLeft: "1px",

                          borderLeft: `3px solid ${COLORES_SECCION.comercio}`,

                          display: "flex",
                          flexDirection: "column",
                          gap: "12px"
                        }}
                      >

                    {comercios
                      .filter((c) =>
                        c.categoria
                          .split("•")
                          .map((x) => x.trim())
                          .includes(categoria)
                      )
                      .map((comercio) => (

                        <TarjetaComercio
                                key={comercio.id}
                                comercio={comercio}
                                expandida={
                                  tarjetasAbiertas[categoria]?.includes(comercio.id)
                                }
                                onClick={() => toggleTarjeta(categoria, comercio.id)}
                              />

                  ))}

                  </div>
                )}
                </div>
              );
            })}
        </div>

           </div> 


 {/*// ======================================================
// LUGARES DE INTERÉS
//
// Presenta los principales atractivos turísticos y
// recreativos de la comuna.
//
// UX:
// Cada tarjeta funciona como un acordeón para mostrar
// información adicional sin sobrecargar la interfaz.
//
// Arquitectura:
// La información proviene íntegramente del módulo
// lugares_de_interes.js.
// ======================================================*/}
      <div
      id="lugares"
        style={{
          flex: "1 1 350px",
          backgroundColor: COLORES.fondo,
           ...ESTILO_SECCION,
        }}
      >
        <h2 style={{color: COLORES_SECCION.turismo,
        marginBottom: "5px",
        fontWeight: "700",
        fontSize: TAMANOS.xxl }}        
        > 🗺️ Lugares de Interes</h2>
        <p style={{color: "#666", 
          fontSize: TAMANOS.lg,
          marginTop: 0
         }}
        > dentro de la comuna</p>

{/*// ------------------------------------------------------
// Genera automáticamente una tarjeta por cada lugar de
// interés registrado.
//
// Arquitectura:
// El contenido mostrado depende exclusivamente de los
// datos disponibles.
// ------------------------------------------------------ */}
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
              backgroundColor: COLORES.fondo,
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "14px",
              textAlign: "left",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",              
              borderTop: `4px solid ${COLORES_SECCION.turismo}`
            }}
          >
{/*// Imagen representativa del lugar.
//
// UX:
// Facilita el reconocimiento visual del destino. */}           
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
              fontSize: TAMANOS.lg,
              color: "#333",
              display: "block",
              marginBottom: "8px"}}
            >{lugar.nombre}</strong>

            

            {lugar.direccion && (
              <p><FaMapMarkedAlt style={{ marginRight: "6px",color: COLORES_SECCION.turismo }}/> {lugar.direccion}</p>
            )}
{/*// ------------------------------------------------------
// DETALLE DEL LUGAR
//
// Se muestra únicamente cuando el usuario expande la
// tarjeta.
//
// Contenido:
// - Descripción.
// - Referencia.
// ------------------------------------------------------*/}   
            {detalleLugar === lugar.id && (
              <div>

                {lugar.descripcion && (
                  <p> <FaInfoCircle style={{ marginRight: "6px", color: COLORES_SECCION.turismo}} />{lugar.descripcion}</p>
                )}

                {lugar.referencia && (
                  <p><FaCompass style={{ marginRight: "6px", color: COLORES_SECCION.turismo }} /> {lugar.referencia}</p>
                )}

              </div>
            )}
          
             
            
          </div>
        ))}
     </div>
  </div>     
 

{/*// ======================================================
// EVENTOS
//
// Presenta los eventos vigentes dentro de la comuna.
//
// UX:
// Permite al usuario descubrir actividades disponibles
// durante su visita o permanencia en Quillón.
//
// Arquitectura:
// Actualmente utiliza datos estáticos.
// En futuras versiones obtendrá la información desde el
// módulo oficial de Eventos.
// ======================================================*/}   
            <Seccion
                titulo="Eventos Activos"
                color={COLORES_SECCION.evento}
                icono="🎉"
            >
              
              <p>Fiesta de la Vendimia</p>
            </Seccion>

{/*// ======================================================
// FARMACIAS
//
// Catálogo completo de farmacias registradas en la comuna.
//
// Arquitectura:
// Complementa el módulo "Farmacia de Turno",
// permitiendo consultar cualquier farmacia disponible.
//
// UX:
// Cada farmacia puede expandirse para mostrar
// información adicional.
// ======================================================*/}        
      <Seccion
              id="farmacias"
              refSeccion={farmaciasRef}
              titulo="Farmacias"              
              color={COLORES_SECCION.farmacia}
              icono={<FaMedkit style={{ color: COLORES_SECCION.farmacia }} />}
            >
{/*// ------------------------------------------------------
// Genera automáticamente una tarjeta por cada farmacia.
//
// Arquitectura:
// La representación utiliza el componente Tarjeta,
// reutilizando el Design System.
// ------------------------------------------------------*/}  
            {farmacias.map((farmacia) => (
              <Tarjeta
                    key={farmacia.id}
                    color={COLORES_SECCION.farmacia}
                  >                
                <strong
                  style={{
                    fontSize: TAMANOS.lg,
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
                      color: COLORES_SECCION.farmacia
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
                    <FaPhoneAlt style={{marginRight: "6px", color: COLORES_SECCION.farmacia}}/> {farmacia.telefono || "No informado"}
                  </a>
                </p>                
{/*// ------------------------------------------------------
// DESPLIEGUE DE DETALLE
//
// Permite mostrar u ocultar la información adicional
// correspondiente a la farmacia seleccionada.
// -----------------------------------------------------
// // ------------------------------------------------------
// INFORMACIÓN ADICIONAL
//
// Contiene:
//
// • Referencia.
// • Horario habitual.
//
// Se muestra únicamente cuando la tarjeta se encuentra
// expandida.
// ------------------------------------------------------*/}
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
                    color: COLORES_SECCION.farmacia,
                    fontSize: TAMANOS.xl
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
                          color: COLORES_SECCION.farmacia
                        }}
                      />
                      {farmacia.referencia}
                    </p>

                    <p>
                      <FaClock
                        style={{
                          marginRight: "6px",
                          color: COLORES_SECCION.farmacia
                        }}
                      />
                      {farmacia.horarioSemanal}
                    </p>
                  </div>
                )}
              </Tarjeta>
            ))}
      </Seccion>

{/*// ======================================================
// TRANSPORTES
//
// Centraliza la información de movilidad de la comuna.
//
// Módulos:
//
// • Taxis.
// • Buses.
//
// Arquitectura:
// El cálculo de horarios depende del Motor de Tiempo,
// mientras que la información proviene de los módulos
// transportes_taxis.js y transportes_buses.js.
// ====================================================== */}
          <Seccion
                id="transportes"
                refSeccion={transportesRef}
                titulo="Transportes"
                color={COLORES_SECCION.transporte}
                icono={<FaBus style={{ color: COLORES_SECCION.transporte }} />}
              >
        <h3>
          <FaTaxi style={{ color: COLORES_SECCION.transporte }} /> Taxis
        </h3>
 {/* // ------------------------------------------------------
// TAXIS
//
// Presenta los servicios de taxi disponibles,
// priorizando el acceso telefónico inmediato.
// ------------------------------------------------------ */}
        {taxis.map((taxi) => (
          <div
            key={taxi.id}
            style={{
              backgroundColor: COLORES.fondo,
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "12px",
              borderTop: `4px solid ${COLORES_SECCION.transporte}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
             {/* // Genera una tarjeta por cada servicio de taxi registrado.*/}
            <strong>{taxi.nombre}</strong>            
              <p>
                <a
                  href={`tel:${taxi.telefono}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <FaPhoneAlt style={{ color: COLORES_SECCION.transporte }}/> {taxi.telefono}
                </a>
              </p>
             
            
          </div>
        ))}
        {/* TERMINO BLOQUE TAXIS */}

{/* // ------------------------------------------------------
// BUSES
//
// Presenta los recorridos interurbanos disponibles.
//
// Arquitectura:
//
// Utiliza el Motor de Tiempo para:
//
// • determinar el día actual;
// • calcular la próxima salida;
// • calcular el tiempo restante.
//
// Cada recorrido mantiene sus propios horarios,
// organizados por tipo de día.
// ------------------------------------------------------*/}
       <h3 style={{ marginTop: "25px" }}>
          <FaBus style={{ color: COLORES_SECCION.transporte }} /> Buses
        </h3>
        {buses.map((bus) => (
          <div
            key={bus.id}
            style={{
              backgroundColor: COLORES.fondo,
              padding: "15px",
              marginBottom: "15px",              
              borderRadius: "12px",
              borderTop: `4px solid ${COLORES_SECCION.transporte}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}          
          >
            <strong
            style={{
                fontSize: TAMANOS.lg,
                color: COLORES_SECCION.transporte,
                display: "block",
                marginBottom: "8px"
              }}
          >
 {/*// ------------------------------------------------------
// DETALLE DEL RECORRIDO
//
// Permite consultar:
//
// • Próxima salida.
// • Tiempo restante.
// • Horarios de ida.
// • Horarios de vuelta.
// • Horarios de otros días.
// ------------------------------------------------------ */}
            {bus.nombre} 
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
                      backgroundColor: COLORES.fondo_destacado,
                      padding: "10px",
                      borderRadius: "10px",
                      marginBottom: "12px"
                    }}
                    >
                      ⭐ Hoy: {nombreDiaActual} 
{/*// Horarios de días no vigentes.
// Se muestran bajo demanda para reducir la carga visual. */}
                    </strong>
                  </p>
                  <div
                      style={{
                        backgroundColor: COLORES.fondoSalidaBus,
                        padding: "12px",
                        borderRadius: "16px",
                        marginTop: "12px",
                        marginBottom: "12px"
                      }}
                    >
                      <strong>🕒 Próxima salida:</strong>

                      <div
                        style={{
                          fontSize: TAMANOS.xl,
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
                            fontSize: TAMANOS.sm,
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
 </Seccion>   
  {/*este seccion se queda, es de arriba, no de buses */}  
              
{/*// ======================================================
// MENÚ SECUNDARIO
//
// Presenta accesos rápidos a módulos de menor frecuencia
// de uso que no forman parte de la navegación principal.
//
// UX:
// Permite mantener una barra inferior simple sin perder
// acceso a funcionalidades adicionales.
//
// Arquitectura:
// El contenido del menú podrá crecer conforme se
// incorporen nuevos módulos.
// ====================================================== */}
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
                   {/*// Acceso directo al módulo Farmacias. */}  
                  <p
                  onClick={() => {navegarASeccion("farmacias");
                                  setMostrarMas(false);
                                }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      margin: "8px 0"
                    }}
                  >
                    <FaMedkit style={{ color: COLORES_SECCION.farmacia }} />
                    Farmacias
                  </p>
                   {/*// Acceso directo al módulo Transportes. */}  
                  <p
                  onClick={() => {
                                  navegarASeccion("transportes");
                                  setMostrarMas(false);
                                }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "8px 0"
                    }}                  
                  >
                      <FaTaxi style={{color: COLORES_SECCION.transporte}}/> Transportes
                  </p>
                  {/*// Acceso reservado para el módulo Eventos. */}  
                  <p
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: "8px 0"
                      }}><FaGlassCheers style={{color: COLORES_SECCION.evento}}/> Eventos
                  </p>
                </div>
              )}

{/* // ======================================================
// BARRA DE NAVEGACIÓN PRINCIPAL
//
// Principal mecanismo de navegación de QUILLÓN AHORA.
//
// UX:
//
// Mantiene acceso permanente a los módulos principales
// desde cualquier punto de la aplicación.
//
// Arquitectura:
//
// La navegación se realiza mediante desplazamiento suave
// hacia las secciones correspondientes.
//
// Mobile First:
// Diseñada prioritariamente para teléfonos móviles.
// ====================================================== */}
            <div            
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: COLORES.fondo,
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
                {/*// Inicio */} 
              <div
                onClick={() => navegarASeccion("inicio")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: TAMANOS.ovz
                       }}
                ><FaHome color="#1976D2"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: TAMANOS.md,
                  }}
                >
                  Inicio
                </p>
              </div>
              {/*// Emergencias */} 
              <div
                onClick={() => navegarASeccion("emergencias")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: TAMANOS.ovz
                       }}      
                
                ><FaExclamationTriangle color="#D32F2F"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: TAMANOS.md,
                  }}
                >
                  Emergencias
                </p>
                </div>
              
              {/*// Comercios */} 
              <div
                onClick={() => navegarASeccion("comercios")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: TAMANOS.ovz
                       }}        
                ><FaStore style={{ marginRight: "6px", color:COLORES_SECCION.comercio}}/>
                <p
                  style={{
                    margin: 0,
                    fontSize: TAMANOS.md,
                  }}
                >
                  Comercio
                </p>
              </div>
              {/*// Lugares */} 
              <div
                onClick={() => navegarASeccion("lugares")}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: TAMANOS.ovz
                       }}                  
                ><FaMapMarkedAlt color="#26A69A"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: TAMANOS.md,
                  }}
                >
                  Lugares
                </p>
              </div>
              
              {/*// Más */} 
                <div
                onClick={() => {
                        setMostrarMas(prev => !prev);
                      }}
                style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: TAMANOS.ovz
                       }}      
                
                ><FaBars  color="#000000"/>
                <p
                  style={{
                    margin: 0,
                    fontSize: TAMANOS.md,
                  }}
                >
                  Más
                </p>
                </div>
              </div>

 {/*// ======================================================
// BRÚJULA
//
// Botón flotante contextual.
//
// UX:
//
// Permite acceder rápidamente al elemento principal de la
// sección actualmente visible.
//
// Arquitectura:
//
// El contenido mostrado depende del Observador de
// Navegación y del contexto activo.
//
// Futuro:
//
// Evolucionará hacia un sistema de navegación contextual
// inteligente.
// ======================================================*/} 
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
                      backgroundColor: COLORES_SECCION.evento,
                      color: "white",
                      borderRadius: "30px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: brujulaContraida ? "0px" : "8px",
                      width: brujulaContraida ? "20px" : "auto",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                      fontWeight: "600",
                      transition:
                        "width 300ms ease, gap 300ms ease, padding 300ms ease"
                    }}
                  >
{/*// Muestra el elemento destacado correspondiente
// a la sección actualmente activa.*/}
                    <FaCompass
                        size={20}
                        style={{
                          color: "white",
                          minWidth: "20px",
                          flexShrink: 0
                        }}
                      />                    
                  
                   
                      <span
                        style={{
                              opacity: brujulaContraida ? 0 : 1,
                              transition: "opacity 180ms ease",
                              overflow: "hidden"
                          }}
                      >{textoBrujula()}</span>
                    
                  </div>
              </div>


{/*// ======================================================
// FOOTER
//
// Cierre institucional de QUILLÓN AHORA.
//
// Contenido:
//
// • Canal oficial de contacto.
// • Invitación a colaborar reportando errores.
// • Aviso legal.
// • Versión de la aplicación.
//
// UX:
// Finaliza la experiencia manteniendo un canal abierto
// de comunicación con la comunidad.
// ======================================================*/}
              
              <footer
                style={{
                  marginTop: "40px",
                  padding: "20px",
                  textAlign: "center",
                  fontSize: TAMANOS.sm, 
                  paddingBottom: "120px",
                  color: "#666"
                }}
              >

{/*// Canal oficial de contacto.
//
// Arquitectura:
// Centraliza la recepción de sugerencias, correcciones
// y comentarios enviados por los usuarios. */} 
                <a
                    href="mailto:contacto@quillonahora.cl"
                    style={{
                      color: "inherit"
                    }}
                  >
                   📧 quillonahora@gmail.com
                  </a>

{/*// Invitación a la participación ciudadana.
//
// Filosofía:
//
// QUILLÓN AHORA evoluciona continuamente gracias a la
// colaboración de la comunidad. */} 
                <p>
                  ¿Encontraste información incorrecta o tienes una sugerencia?
                  Escríbenos.
                </p>
{/*// Aviso legal.
//
// Los nombres comerciales y marcas pertenecen a sus
// respectivos propietarios y se utilizan únicamente con
// fines informativos. */} 
                <p
                style={{
                    fontSize: TAMANOS.xs,
                    color: "#777",
                    fontStyle: "italic",
                    marginTop: "15px"}}
                  >Los nombres comerciales y marcas mencionados pertenecen 
                  a sus respectivos propietarios y se utilizan únicamente 
                  con fines informativos y de orientación para la comunidad.</p>
{/*// Identificación de la versión actualmente desplegada.
//
// TODO Arquitectura:
// En futuras versiones deberá obtenerse desde una
// constante global (config/version.js) para evitar
// actualizaciones manuales. */} 
                <p>
                  QUILLÓN AHORA v0.4.0 Beta
                </p>
              </footer>
    </div>
  );
}

export default App;