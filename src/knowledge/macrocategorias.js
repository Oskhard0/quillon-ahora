import { COLORES_RADIAL } from "../styles/colores";

import {
    FaCar,
    FaCampground,
    FaHeart,
    FaAmbulance,
    FaBus,
    FaMapMarkedAlt,
    FaUtensils,
    FaShoppingBag
} from "react-icons/fa";

export const MACROCATEGORIAS = [

    {
        id: "movilidad",
        nombre: "Automóvil y Movilidad",
        icono: FaCar,
        color: "#1976D2"
    },

    {
        id: "turismo",
        nombre: "Turismo y Estadía",
        icono: FaCampground,
        color: "#2E7D32"
    },

    {
        id: "bienestar",
        nombre: "Bienestar y Vida Comunitaria",
        icono: FaHeart,
        color: "#EC407A"
    },

    {
        id: "emergencias",
        nombre: "Emergencias",
        icono: FaAmbulance,
        color: "#D32F2F"
    },

    {
        id: "transporte",
        nombre: "Transporte",
        icono: FaBus,
        color: "#F9A825"
    },

    {
        id: "destinos",
        nombre: "Fiestas y Lugares",
        icono: FaMapMarkedAlt,
        color: "#00897B"
    },

    {
        id: "sabores",
        nombre: "Sabores Locales",
        icono: FaUtensils,
        color:"#FF9800"
    },

    {
        id: "compras",
        nombre: "Compras y Servicios",
        icono: FaShoppingBag,
        color: "#5E35B1"
    }

];