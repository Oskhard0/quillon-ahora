// ------------------------------------------------------
// MOTOR DE ACCIONES
//
// Responsabilidad:
//
// Centralizar las acciones que modifican la navegación
// de la aplicación.
//
// Este motor NO modifica estados de React.
//
// Su responsabilidad consiste únicamente en describir
// la acción que la aplicación debe ejecutar.
//
// App.jsx continúa siendo el orquestador y decide
// cómo ejecutar cada acción.
//
// Arquitectura:
//
// knowledge/      -> Qué sabe la aplicación
// utils/
//    horarios      -> Calcula horarios
//    motor_intenciones   -> Detecta intenciones
//    motor_acciones      -> Describe acciones
//
// components/     -> Representación visual
// ------------------------------------------------------

export const ACCIONES = {

    ABRIR_CATEGORIA: "ABRIR_CATEGORIA",

    ABRIR_COMERCIO: "ABRIR_COMERCIO",

    IR_A_SECCION: "IR_A_SECCION"

};

// ------------------------------------------------------
// Solicita abrir una categoría.
//
// No abre nada.
// Solo devuelve una acción estructurada.
// ------------------------------------------------------

export function abrirCategoria(categoria) {

    return {

        accion: ACCIONES.ABRIR_CATEGORIA,

        categoria

    };

}