import heroAmanecer from "../assets/hero/quillon_hiper_amanecer.webp";
import heroDia from "../assets/hero/quillon_hiper_mediodia.png";
import heroAtardecer from "../assets/hero/quillon_hiper_atardecer.png";
import heroNoche from "../assets/hero/quillon_hiper_noche.png";

export const HERO_THEMES = {
    amanecer: {
        background: heroAmanecer
    },

    dia: {
        background: heroDia
    },

    atardecer: {
        background: heroAtardecer
    },

    noche: {
        background: heroNoche
    }
};

// =====================================================
// CONFIGURACIÓN DE SALUDOS
// =====================================================
//
// Cada saludo representa el contenido textual que será
// mostrado en el Hero.
//
// Este archivo NO define estilos visuales.
//
// La apariencia del Hero es responsabilidad exclusiva
// de heroTheme.js.
//
// =====================================================

export const HERO_GREETINGS = {

    manana: {

        saludo: "Buenos días",

        subtitulo: "Comencemos un nuevo día en Quillón."

    },

    tarde: {

        saludo: "Buenas tardes",

        subtitulo: "Aún queda mucho por descubrir."

    },

    noche: {

        saludo: "Buenas noches",

        subtitulo: "Disfruta Quillón con tranquilidad."

    }

};

export const HERO_SCHEDULE = {

    imagenes: [

        {
            key: "amanecer",
            desde: "06:00",
            hasta: "11:59"
        },

        {
            key: "dia",
            desde: "12:00",
            hasta: "17:59"
        },

        {
            key: "atardecer",
            desde: "18:00",
            hasta: "20:59"
        },

        {
            key: "noche",
            desde: "21:00",
            hasta: "05:59"
        }

    ],

    saludos: [

        {
            key: "manana",
            desde: "06:00",
            hasta: "11:59"
        },

        {
            key: "tarde",
            desde: "12:00",
            hasta: "19:59"
        },

        {
            key: "noche",
            desde: "20:00",
            hasta: "05:59"
        }

    ]

};

function convertirHoraAMinutos(horaTexto) {

    const [hora, minuto] = horaTexto.split(":").map(Number);

    return (hora * 60) + minuto;

}

export function obtenerHeroActual() {

    const ahora = new Date();

    const minutosActuales =
        (ahora.getHours() * 60) + ahora.getMinutes();

    for (const periodo of HERO_SCHEDULE.imagenes) {

        const desde = convertirHoraAMinutos(periodo.desde);
        const hasta = convertirHoraAMinutos(periodo.hasta);

        // Caso normal (06:00 - 18:00)

        if (desde <= hasta) {

            if (minutosActuales >= desde && minutosActuales <= hasta) {

                return HERO_THEMES[periodo.key];

            }

        }

        // Caso que cruza medianoche (20:00 - 05:59)

        else {

            if (
                minutosActuales >= desde ||
                minutosActuales <= hasta
            ) {

                return HERO_THEMES[periodo.key];

            }

        }

    }

    // Nunca debería llegar aquí, pero por seguridad...

    return HERO_THEMES.dia;

}


// =====================================================
// OBTENER SALUDO ACTUAL
// =====================================================
//
// Determina el saludo correspondiente según la hora.
//
// Además del contenido textual, devuelve la clave del
// período (manana, tarde o noche), permitiendo que
// Hero.jsx pueda obtener el tema visual sin volver a
// calcular la hora.
//
// =====================================================

export function obtenerSaludoActual() {

    const ahora = new Date();

    const minutosActuales =
        (ahora.getHours() * 60) + ahora.getMinutes();

    for (const periodo of HERO_SCHEDULE.saludos) {

        const desde = convertirHoraAMinutos(periodo.desde);

        const hasta = convertirHoraAMinutos(periodo.hasta);

        // Período normal
        if (desde <= hasta) {

            if (
                minutosActuales >= desde &&
                minutosActuales <= hasta
            ) {

                return {

                    key: periodo.key,

                    ...HERO_GREETINGS[periodo.key]

                };

            }

        }

        // Período que cruza medianoche
        else {

            if (
                minutosActuales >= desde ||
                minutosActuales <= hasta
            ) {

                return {

                    key: periodo.key,

                    ...HERO_GREETINGS[periodo.key]

                };

            }

        }

    }

    //--------------------------------------------------
    // Respaldo de seguridad
    //--------------------------------------------------

    return {

        key: "manana",

        ...HERO_GREETINGS.manana

    };

}