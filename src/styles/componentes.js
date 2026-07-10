import { ESPACIADO } from "./espaciado";

// --------------------------------------------------
// RADIOS
// --------------------------------------------------

export const RADIO = {

   sm: "8px",
  md: "12px",
  lg: "14px",
  xl: "20px",

};

// --------------------------------------------------
// SOMBRAS
// --------------------------------------------------

export const SOMBRAS = {
  tarjeta: "0 4px 12px rgba(0,0,0,0.08)",
  hover: "0 6px 12px rgba(0,0,0,0.15)",


  

};

// --------------------------------------------------
// TRANSICIONES
// --------------------------------------------------

export const TRANSICIONES = {

  rapida: "all 0.2s ease",

  normal: "all 0.3s ease",

  despliegue: "all 0.4s ease"

};

// --------------------------------------------------
// CAPAS (Z-INDEX)
// --------------------------------------------------

export const CAPAS = {

  menu: 100,

  modal: 1000,

};

// --------------------------------------------------
// ESTILOS DE CADA SECCION
// --------------------------------------------------

export const ESTILO_SECCION = {
  padding: ESPACIADO.md,
  marginBottom: ESPACIADO.md,
  borderRadius: RADIO.lg,
  textAlign: "left",
};

// --------------------------------------------------
// ESTILOS DE CADA TARJETA
// --------------------------------------------------

export const ESTILO_TARJETA = {
  padding: ESPACIADO.md,
  marginBottom: ESPACIADO.md,
  marginLeft: "1px",
  borderRadius: RADIO.lg,
  textAlign: "left",
};