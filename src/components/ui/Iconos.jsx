// =====================================================
// IMPORTS
// =====================================================

import {
  FaUtensils,
  FaTools,
  FaClinicMedical,
  FaShoppingCart,
  FaStore,
  FaBeer,
  FaWineBottle,
  FaCoffee,
  FaShoppingBag,
  FaBoxOpen,
  FaTruck,
  FaHamburger,
  FaBook,
  FaHospital,
  FaBuilding,
  FaDog,
  FaCross,
  FaCarSide,
  FaWrench,
  FaCog,
  FaCut,

  // UI
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaClock,
  FaCompass,
  FaStar,
  FaChevronDown,
  FaChevronUp

} from "react-icons/fa";

import {
  GiFlowerPot,
  GiBread,
  GiMeat,
  GiFruitBowl,
  GiTomato,
  GiPizzaSlice
} from "react-icons/gi";

// =====================================================
// ICONOS DE CATEGORÍAS
// =====================================================

export const ICONOS_CATEGORIA = {

  restaurante: FaUtensils,
  ferreteria: FaTools,
  floreria: GiFlowerPot,
  floristeria: GiFlowerPot,
  farmacia: FaClinicMedical,
  supermercado: FaShoppingCart,
  panaderia: GiBread,
  verduleria: GiTomato,
  carniceria: GiMeat,
  pizzeria: GiPizzaSlice,
  almacen: FaStore,
  bar: FaBeer,
  botilleria: FaWineBottle,
  cafeteria: FaCoffee,
  bazar: FaShoppingBag,
  comercializadora: FaBoxOpen,
  cuberteria: FaUtensils,
  distribuidora: FaTruck,
  fastfood: FaHamburger,
  fruteria: GiFruitBowl,
  libreria: FaBook,
  "material sanitario": FaHospital,
  multitienda: FaBuilding,
  veterinaria: FaDog,
  funeraria: FaCross,
  vulcanizacion: FaCarSide,
  "taller mecanico": FaWrench,
  peluqueria: FaCut,
  "repuestos automotrices": FaCog

};

// =====================================================
// ICONOS DE INTERFAZ (UI)
// =====================================================

export const ICONOS_UI = {

  mapa: FaMapMarkedAlt,
  ubicacion: FaMapMarkerAlt,
  telefono: FaPhoneAlt,
  horario: FaClock,
  referencia: FaCompass,
  destacado: FaStar,
  chevronDown: FaChevronDown,
  chevronUp: FaChevronUp

};

// =====================================================
// FUNCIÓN AUXILIAR
// =====================================================

export function obtenerIconoCategoria(categoria) {

  const Icono =
    ICONOS_CATEGORIA[categoria.toLowerCase()] ??
    FaMapMarkerAlt;

  return <Icono />;

}

// =====================================================
// ICONOS DE CATEGORÍAS
// =====================================================

// =====================================================
// ICONOS DE ACCIONES (Próximamente)
// =====================================================

// =====================================================
// ICONOS DE ESTADO (Próximamente)
// =====================================================