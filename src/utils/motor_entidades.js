// ======================================================
// MOTOR DE ENTIDADES
//
// Resuelve referencias del dominio y devuelve las
// entidades completas utilizadas por la aplicación.
//
// Arquitectura:
//
// Este motor centraliza la resolución de entidades
// utilizadas por distintos motores del sistema.
//
// Responsabilidades:
//
// • Resolver referencias.
// • Validar existencia.
// • Entregar entidades completas.
//
// No toma decisiones.
// No aplica reglas de negocio.
// No renderiza componentes.
//
// ======================================================

import  comercios  from "../data/comercios";
import  lugaresInteres  from "../data/lugares_de_interes";
import  taxis  from "../data/transportes_taxis";
import  buses  from "../data/transportes_buses";
import { TIPO_ENTIDAD } from "../knowledge/tipos_entidad";

const COLECCIONES = {
    [TIPO_ENTIDAD.COMERCIO]: comercios,
    [TIPO_ENTIDAD.LUGAR]: lugaresInteres,
    [TIPO_ENTIDAD.TRANSPORTE]: taxis
    // ...las demás que ya tengas importadas
};

 export function resolverEntidad(destacado) {
    const coleccion = COLECCIONES[destacado.tipo];
    if (!coleccion) return null;

    

  const entidad = coleccion.find(
        item => item.id === destacado.entidadId
    );

    if (!entidad) return null;

return {
    ...destacado,
    entidad
};
}