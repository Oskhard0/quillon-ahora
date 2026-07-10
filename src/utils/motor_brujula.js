// ======================================================
// MOTOR DE BRÚJULA
//
// Resuelve el destino actual utilizado por la Brújula.
//
// Arquitectura:
//
// Obtiene la configuración definida en
// knowledge/brujula.js y la transforma en una entidad
// completa lista para ser utilizada por la interfaz.
//
// Responsabilidades:
//
// • Obtener el destino activo.
// • Resolver la entidad.
// • Entregar el destino listo para navegar.
//
// No realiza navegación.
// No modifica estados.
// No renderiza componentes.
//
// ======================================================
import { DESTINOS_BRUJULA } from "../knowledge/brujula";
import { resolverEntidad } from "./motor_entidades";

export function obtenerDestinoBrujula() {

    const destino =
        DESTINOS_BRUJULA.find(d => d.activo);

    if (!destino) return null;

    return resolverEntidad(destino);
}