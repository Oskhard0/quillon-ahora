// ======================================================
// BRÚJULA · CONOCIMIENTO
//
// Define los destinos recomendados por la Brújula.
//
// Arquitectura:
//
// Este archivo almacena únicamente conocimiento del
// dominio. No contiene lógica de negocio ni consultas.
//
// Los destinos aquí definidos representan la
// recomendación editorial de QUILLÓN AHORA y pueden
// corresponder a comercios, lugares, eventos u otras
// entidades de la aplicación.
//
// La lógica para resolver, validar o navegar hacia estos
// destinos pertenece exclusivamente al Motor de Brújula.
//
// Filosofía:
//
// La Brújula debe comportarse como "el vecino que sabe":
// recomienda un destino, no una categoría.
//
// ======================================================
export const DESTINOS_BRUJULA = [
  {
    // Identificador interno del destino.
    id: "bienvenida",

    // Tipo de entidad recomendada.
    tipo: "comercio",

    // Identificador de la entidad.
    entidadId: 4,

    // Motivo mostrado al usuario.
    motivo: "Recomendado por QA",

    // Permite habilitar o deshabilitar temporalmente
    // este destino sin eliminarlo.
    activo: true
}
];