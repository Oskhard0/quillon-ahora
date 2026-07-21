import tranqueViejo from "../assets/editorial/comercios/tranque_viejo.jfif";
import gelateriaSabores from "../assets/editorial/comercios/gelateria_saboresdelvalle.webp";
import libreriaQuillon from "../assets/editorial/comercios/libreria_quillon.jfif";
import repuestosTorresriquelme from "../assets/editorial/comercios/torres_riquelme.jfif";
import veterinariaCayumanqui from "../assets/editorial/comercios/veterinaria_cayumanqui.webp";

const comercios = [
  {
    id: 1,
    nombre: "Posada Tranque Viejo",
    categoria: "Restaurante",
    referencia: "Por la carretera, frente a supermercado unimarc",
    direccion: "O'higgins 489",
    telefono: "+56912345678",
    destacado : true,
    imagen: tranqueViejo,
    prioridad: 2,
     horario: {
            lunes: [{abre: "09:00", cierra: "01:30"}],
            martes: [{abre: "09:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "01:30" }],
            jueves: [{ abre:"09:00", cierra: "01:30"}],
            viernes: [{abre: "09:00", cierra: "01:30"}],
            sabado: [{abre: "09:00", cierra: "01:00" }],
            domingo: [{abre: "10:00", cierra: "18:00" }]
          }
  },
  {
    id: 2,
    nombre: "Viejo Amor",
    categoria: "Restaurante",
    referencia: "Llegando a la curva de la laguna, cerca de poblacion San Francisco",
    direccion: "O'higgins 2001",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "01:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 3,
    nombre: "Trattoria de la Palo",
    categoria: "Restaurante",
    referencia: "Frente a la plaza, a metros de Caja los Heroes",
    direccion: "San Martin 267",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 4,
    nombre: "Hornito Cordobés",
    categoria: "Pizzeria",
    referencia: "Ex esquina Padre Juan, a una cuadra de la iglesia catolica",
    direccion: "18 de septiembre 399",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 5,
    nombre: "Ferreteria El Quillay",
    categoria: "Ferreteria",
    referencia: "A dos cuadras del cruce a nueva aldea, cerca de poblacion Patricio Navarrete",
    direccion: "Gabriela mistral 167",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 6,
    nombre: "Samuelito",
    categoria: "Carniceria",
    referencia: "Casi llegando a Tienda Yo, Any",
    direccion: "El Roble 500",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 7,
    nombre: "La Veguita",
    categoria: "Verduleria",
    referencia: "Camino al cementerio, una cuadra antes",
    direccion: "Carmen 690",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 8,
    nombre: "Florería y Bazar Jardin de Sarita",
    categoria:  "Floreria • Floristeria",
    referencia: "a pasos de chilexpress",
    direccion: "caupolican 175",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 9,
    nombre: "Más Migas",
    categoria: "Panaderia",
    referencia: "A metros de esquina san martin, llegando a la plaza",
    direccion: "El Roble 325",
    telefono: "+56912345678",
    whatsapp: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },
  {
    id: 10,
    nombre: "Los Copihues",
    categoria: "Almacen",
    referencia: "A una cuadra del Liceo Luis Cruz Martinez",
    direccion: "Arturo Prat 725",
    telefono: "+56912345678",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 11,
    nombre: "food truck Bavajo",
    categoria: "FastFood",
    referencia: "Frente a la hosteria, por las malvinas",
    direccion: "Las malvinas 26",
    telefono: null,
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 12,
    nombre: "Bajon urbano Negrita sabrosona",
    categoria: "FastFood",
    referencia: "Frente a la hosteria, casi en la esquina de diego portales",
    direccion: "Cayumanqui 715",
    telefono: null,
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 13,
    nombre: "Restaurante El nuevo paso",
    categoria: "Restaurante",
    referencia: "Casi llegando a cayumanqui, al lado de los estacionamientos",
    direccion: "Diego Portales 121",
    telefono: "42 2581607",
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 24,
    nombre: "Comercializadora y Distribuidora El Galpon",
    categoria: "Distribuidora • Comercializadora",
    referencia: "Al costado de iglesia evangelica",
    direccion: "Diego Portales 121 B",
    telefono: null,
    destacado : false,
    prioridad: 2,
     horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 14,
    nombre: "Manitas Mara",
    categoria: "Cuberteria",
    referencia: "En la esquina de la  hosteria, al costado de Radiotaxi Cayumanqui",
    direccion: "Cayumanqui 687",
    telefono: null,
    destacado : false,
    prioridad: 2,    
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
         },         

  {
    id: 15,
    nombre: "Multisep",
    categoria: "Bazar • Libreria",
    referencia: "En la esquina de la  hosteria, al costado de Radiotaxi Cayumanqui",
    direccion: "Cayumanqui 687",
    telefono: "986421943",
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 16,
    nombre: "El café de la palo",
    categoria: "Cafeteria • Restaurante",
    referencia: null,
    direccion: "Cayumanqui 642",
    telefono: "984433523",
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 17,
    nombre: "El pollo huaso",
    categoria: "Carniceria",
    referencia: "Frente a copelec, al costado de ganga",
    direccion: "Cayumanqui 593",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 23,
    nombre: "Santiamen",
    categoria: "Bar • Cafeteria • Restaurante",
    referencia: "Frente a copelec, por caupolican",
    direccion: "Cayumanqui 593",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "01:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 18,
    nombre: "Botilleria Cayumanqui",
    categoria: "Botilleria",
    referencia: "Al costado de farmacia sur",
    direccion: "Cayumanqui 558",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 19,
    nombre: "Carniceria los chicos de naranjo",
    categoria: "Carniceria",
    referencia: "Debajo de radio cayumanqui",
    direccion: "Cayumanqui 545",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "01:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 20,
    nombre: "Floreria Primavera",
    categoria: "Floreria • Floristeria",
    referencia: "Cayumanqui esquina jacinto sepulveda a pasos del unimarc",
    direccion: "Cayumanqui 507",
    telefono: "996252746",
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 21,
    nombre: "Carniceria los arrieros",
    categoria: "Carniceria",
    referencia: "Boulevard plaza frente al unimarc",
    direccion: "Jacinto Sepulveda 73",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },

    {
    id: 22,
    nombre: "Fruteria La Vega Chica",
    categoria: "Verduleria • Fruteria",
    referencia: "Cayumanqui esquina Jacinto Sepulveda a pasos del unimarc",
    direccion: "Cayumanqui 501",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 25,
    nombre: "Multitienda Makal",
    categoria: "Multitienda",
    referencia: "Cayumanqui esquina Jacinto Sepulveda",
    direccion: "Jacinto Sepulveda 179",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 26,
    nombre: "Diacmed Eirl",
    categoria: "Material sanitario",
    referencia: "Junto a Multitienda Makal, casi en la esquina",
    direccion: "Jacinto Sepulveda 110",
    telefono: "422429702",
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
  {
    id: 27,
    nombre: "Librería Quillón",
    categoria: "Libreria",
    referencia: "Justo donde es la sucursal de chilexpress",
    direccion: "Jacinto Sepulveda 126",
    telefono: "422429702",
    destacado : true,
    imagen: libreriaQuillon,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },

    {
    id: 28,
    nombre: "Comercializadora Todo Barato",
    categoria: "Comercializadora",
    referencia: "Al costado del unimarc por cayumanqui",
    direccion: "Cayumanqui 441",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },

    {
    id: 29,
    nombre: "Veterinaria Cayumanqui ",
    categoria: "Veterinaria",
    referencia: "a una cuadra de panaderia chaco",
    direccion: "Carrera 600",
    telefono: null,
    whatsapp: 56985796870,
    destacado : true,
    imagen: veterinariaCayumanqui,
    prioridad: 1,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:00"}],
            martes: [{abre: "08:00", cierra: "21:00"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:00" }],
            jueves: [{ abre:"08:00", cierra: "21:00"}],
            viernes: [{abre: "08:00", cierra: "21:00"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
  },

    {
    id: 30,
    nombre: "Repuestos Torres Riquelme ",
    categoria: "Repuestos automotrices",
    referencia: "Frente a verduleria Quintana",
    direccion: "Roble 365",   
    telefono: null,
    destacado : true,
    imagen: repuestosTorresriquelme,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "09:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },

    {
    id: 31,
    nombre: "Taller JyC ",
    categoria: "Taller Mecanico",
    referencia: "ex taller de Osorio, frente a la entra del camino viejo al olivar",
    direccion: "Camino a cerro negro km 1",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "08:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },

    {
    id: 32,
    nombre: "Gelateria Sabores del Valle",
    categoria: "Heladeria",
    referencia: "Frente a la plaza, al lado de la sra mauda",
    direccion: "El roble 269",    
    telefono: null,
    destacado : true,
    imagen: gelateriaSabores,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "08:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
    {
    id: 33,
    nombre: "Oky Sushi",
    categoria: "Sushi",
    referencia: "Diagonal a la plaza, frente a banco estado",
    direccion: "El Roble 187,",
    telefono: null,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "08:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },

    {
    id: 34,
    nombre: "Delicias Caseras Montserrat",
    categoria: "Panaderia • Pasteleria",
    referencia: "En poblacion Tenesse, cerca de curva de la laguna",
    direccion: "O'Higgins 1670",
    telefono: 56945561626,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "08:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
    {
    id: 35,
    nombre: "Grua pluma Quillón",
    categoria: "Grua • Traslado",
    referencia: "A dos cuadras de la plaza, cerca del camino a cerro negro",
    direccion: "Carmen 252",
    telefono: 958055234,
    destacado : false,
    prioridad: 2,
    horario: {
            lunes: [{abre: "08:00", cierra: "21:30"}],
            martes: [{abre: "08:00", cierra: "21:30"}],
            miercoles: [{ abre: "08:00", cierra: "13:00" },{ abre: "15:00", cierra: "21:30" }],
            jueves: [{ abre:"08:00", cierra: "21:30"}],
            viernes: [{abre: "08:00", cierra: "21:30"}],
            sabado: [{abre: "09:00", cierra: "14:00" }],
            domingo: []
          }
    },
];

export default comercios;