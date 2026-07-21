/**
 * -------------------------------------------------------------------
 * Sabores Locales
 * -------------------------------------------------------------------
 * Configuración de la experiencia "Sabores Locales".
 *
 * Este archivo NO contiene lógica.
 * Sólo define el contenido editorial de la experiencia.
 * -------------------------------------------------------------------
 */

import heroSabores from "../../assets/hero/sabores_socales.png";

const saboresLocales = {

    hero: {

        titulo: "Sabores Locales",

        subtitulo:
            "Descubre los sabores, productos y experiencias gastronómicas que hacen único a Quillón.",

        imagen: heroSabores

    },

    categorias: [

        {
            id: "restaurantes",
            icono: "🍽",
            nombre: "Restaurantes"
        },

        {
            id: "sushi",
            icono: "🍣",
            nombre: "Sushi"
        },

        {
            id: "pizzerias",
            icono: "🍕",
            nombre: "Pizzerías"
        },

        {
            id: "comida-rapida",
            icono: "🍔",
            nombre: "Comida rápida"
        },

        {
            id: "cafeterias",
            icono: "☕",
            nombre: "Cafeterías"
        },

        {
            id: "bar-pub",
            icono: "🍻",
            nombre: "Bar / Pub"
        },

        {
            id: "cervecerias",
            icono: "🍺",
            nombre: "Cervecerías"
        },

        {
            id: "pastelerias",
            icono: "🍰",
            nombre: "Pastelerías"
        },

        {
            id: "heladerias",
            icono: "🍦",
            nombre: "Heladerías"
        },

        {
            id: "panaderias",
            icono: "🥖",
            nombre: "Panaderías"
        },

        {
            id: "carnicerias",
            icono: "🥩",
            nombre: "Carnicerías"
        },

        {
            id: "fruterias",
            icono: "🍎",
            nombre: "Fruterías"
        },

        {
            id: "vinas",
            icono: "🍇",
            nombre: "Viñas y degustaciones"
        },

        {
            id: "enoturismo",
            icono: "🍷",
            nombre: "Enoturismo"
        }

    ]

};

export default saboresLocales;