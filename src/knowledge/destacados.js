// ======================================================
// DESTACADOS AHORA · CONOCIMIENTO
//
// Define los elementos mostrados en la tarjeta
// "Destacados Ahora".
//
// Arquitectura:
//
// Este archivo contiene únicamente referencias a las
// entidades que deben aparecer destacadas.
//
// No almacena datos de los comercios ni contiene lógica
// de selección.
// No duplica información existente.
//
// La responsabilidad de resolver estas referencias
// pertenece exclusivamente al Motor de Destacados.
//
// Los destacados representan una selección editorial
// independiente del sistema de publicidad y de la
// Brújula.
// La resolución de estas referencias corresponde
// exclusivamente al Motor de Destacados.
//
// ======================================================
export const DESTACADOS_AHORA = [
 {
    // Tipo de entidad.
    tipo: "comercio",

    // Identificador de la entidad.
    entidadId: 1,

    // Orden de aparición.
    orden: 1,

    // Permite activar o desactivar temporalmente
    // este destacado.
    activo: true
},
{
    tipo: "lugar",

    entidadId: 2,

    orden: 2,

    activo: true
}
];