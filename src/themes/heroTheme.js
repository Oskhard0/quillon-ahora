// =====================================================
// HERO VISUAL THEME
// =====================================================
//
// Responsabilidad
// ----------------
// Este archivo describe la apariencia visual del Hero.
//
// NO contiene lógica.
// NO conoce horarios.
// NO sabe qué tema está activo.
//
// Su única responsabilidad es definir cómo debe verse
// cada momento del día.
//
// El motor del Hero (heroConfig.js) decidirá qué tema
// utilizar según la hora actual.
//
// Hero.jsx será el encargado de unir ambos mundos.
//
// =====================================================

import {

    HERO_COLORES,
    HERO_SOMBRAS

} from "../styles/colores";

export const HERO_THEME = {

    // =================================================
    // MAÑANA
    // =================================================

    manana: {

        saludo: {

            colorTitulo: HERO_COLORES.tituloCalido,

            colorSubtitulo: HERO_COLORES.subtituloClaro,

            sombraTexto: HERO_SOMBRAS.media

        },

        // Reservado para futuras versiones
        overlay: {},

        logo: {},

        fondo: {}

    },

    // =================================================
    // TARDE
    // =================================================

    tarde: {

        saludo: {

            colorTitulo: HERO_COLORES.tituloClaro,

            colorSubtitulo: HERO_COLORES.subtituloCalido,

            sombraTexto: HERO_SOMBRAS.fuerte

        },

        overlay: {},

        logo: {},

        fondo: {}

    },

    // =================================================
    // NOCHE
    // =================================================

    noche: {

        saludo: {

            colorTitulo: HERO_COLORES.tituloNocturno,

            colorSubtitulo: HERO_COLORES.subtituloNocturno,

            sombraTexto: HERO_SOMBRAS.noche

        },

        overlay: {},

        logo: {},

        fondo: {}

    }

};