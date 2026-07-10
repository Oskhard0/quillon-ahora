/**
 * =====================================================
 * MOTOR DE INTENCIONES
 *
 * Responsabilidad:
 * Interpretar el texto ingresado por el usuario e
 * identificar si corresponde a alguna intención conocida.
 *
 * Este motor NO genera recomendaciones.
 * NO consulta comercios.
 * NO conoce horarios.
 *
 * Su única función es reconocer la intención del usuario.
 * =====================================================
 */

import { INTENCIONES } from "../knowledge/intenciones";



/**
 * Busca una intención conocida dentro del texto
 * ingresado por el usuario.
 *
 * @param {string} texto
 * @returns {object|null}
 */
export function buscarIntencion(texto) {

    const textoNormalizado = (texto ?? "")
        .toLowerCase()
        .trim();

    for (const intencion of INTENCIONES) {

        for (const frase of intencion.frases) {

            if (textoNormalizado.includes(frase)) {
                return intencion;
            }

        }

    }

    return null;

}

