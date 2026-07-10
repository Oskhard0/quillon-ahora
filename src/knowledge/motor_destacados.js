// ======================================================
// MOTOR DE DESTACADOS
//
// Resuelve las entidades utilizadas por el sistema
// "Destacados Ahora".
//
// Arquitectura:
//
// Este motor transforma las referencias definidas en
// knowledge/destacados.js en entidades completas listas
// para ser utilizadas por la interfaz.
//
// Responsabilidades:
//
// • Resolver referencias.
// • Validar que las entidades existan.
// • Entregar entidades listas para mostrar.
//
// No selecciona destacados.
// No modifica datos.
// No renderiza componentes.
//
// ======================================================
import { DESTACADOS_AHORA } from "../knowledge/destacados";
import { resolverEntidad } from "../utils/motor_entidades";
// ------------------------------------------------------
// Colecciones disponibles.
//
// Arquitectura:
//
// Relaciona cada tipo de entidad con la colección de
// datos correspondiente.
//
// Esta constante es de uso interno del motor.
//
// ------------------------------------------------------
// ------------------------------------------------------
// Funciones públicas
// ------------------------------------------------------

// ------------------------------------------------------
// Obtiene la definición de los destacados configurados.
//
// Arquitectura:
//
// Devuelve las referencias definidas en
// knowledge/destacados.js.
//
// No resuelve entidades.
//
// ------------------------------------------------------

// ------------------------------------------------------
// Funciones privadas
//
// Arquitectura:
//
// Resuelven referencias internas del motor.
//
// No son accesibles desde otros módulos.
//
// ------------------------------------------------------

export function obtenerDestacados() {

    return DESTACADOS_AHORA
        .map(resolverEntidad)
        .filter(Boolean);

}

// ------------------------------------------------------
// Funciones privadas
//
// Arquitectura:
//
// Resuelven referencias internas utilizadas por el
// Motor de Destacados.
//
// ------------------------------------------------------
