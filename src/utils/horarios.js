// =====================================================
// MOTOR DE HORARIOS - QUILLÓN AHORA
// =====================================================

// Días de la semana
const DIAS = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado"
];

//------------------------------------------------------
// Convierte "15:30" -> 930
//------------------------------------------------------

function horaAMinutos(hora) {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
}

//------------------------------------------------------
// Devuelve el nombre del día
//------------------------------------------------------

function obtenerDia(fecha) {
    return DIAS[fecha.getDay()];
}

//------------------------------------------------------
// Devuelve el día anterior
//------------------------------------------------------

function obtenerDiaAnterior(fecha) {
    return DIAS[(fecha.getDay() + 6) % 7];
}

//------------------------------------------------------
// Hora actual en minutos
//------------------------------------------------------

function obtenerMinutosActuales(fecha) {
    return fecha.getHours() * 60 + fecha.getMinutes();
}

//------------------------------------------------------
// ¿El tramo cruza la medianoche?
//------------------------------------------------------

function cruzaMedianoche(abre, cierra) {
    return horaAMinutos(cierra) < horaAMinutos(abre);
}

//------------------------------------------------------
// Evalúa un tramo normal
//------------------------------------------------------

function estaDentroDelTramo(minutosActuales, abre, cierra) {

    const inicio = horaAMinutos(abre);
    const fin = horaAMinutos(cierra);

    if (!cruzaMedianoche(abre, cierra)) {
        return minutosActuales >= inicio && minutosActuales < fin;
    }

    // Ej: 20:00 -> 02:00
    return minutosActuales >= inicio || minutosActuales < fin;
}

//======================================================
// FUNCIÓN PRINCIPAL
//======================================================

export function estaAbierto(horario, fecha = new Date()) {

    const hoy = obtenerDia(fecha);
    const ayer = obtenerDiaAnterior(fecha);

    const minutosActuales = obtenerMinutosActuales(fecha);

    //--------------------------------------------------
    // Revisar horarios del día actual
    //--------------------------------------------------

    const tramosHoy = horario[hoy] ?? [];

    

    for (const tramo of tramosHoy) {

        if (
            estaDentroDelTramo(
                minutosActuales,
                tramo.abre,
                tramo.cierra
            )
        ) {
            return true;
        }

    }




    //--------------------------------------------------
    // Revisar horarios del día anterior
    // (solo los que cruzan medianoche)
    //--------------------------------------------------

    const tramosAyer = horario[ayer] ?? [];

    for (const tramo of tramosAyer) {

        if (!cruzaMedianoche(tramo.abre, tramo.cierra)) {
            continue;
        }

        if (
            estaDentroDelTramo(
                minutosActuales,
                tramo.abre,
                tramo.cierra
            )
        ) {
            return true;
        }

    }

    return false;
    }


    //======================================================
// ESTADO DEL COMERCIO
//======================================================

export function obtenerEstadoHorario(horario, fecha = new Date()) {

    const hoy = obtenerDia(fecha);
    const minutosActuales = obtenerMinutosActuales(fecha);

    const tramos = horario[hoy] ?? [];

    for (const tramo of tramos) {

        const inicio = horaAMinutos(tramo.abre);
        const fin = horaAMinutos(tramo.cierra);

        if (estaDentroDelTramo(minutosActuales, tramo.abre, tramo.cierra)) {

        return {
            abierto: true,
            texto: `Abierto hasta las ${tramo.cierra}`
        };

        }

        }

    // Buscar si aún queda algún tramo por abrir hoy

    for (const tramo of tramos) {

        const inicio = horaAMinutos(tramo.abre);

        if (minutosActuales < inicio) {

            return {
                abierto: false,
                texto: `Abre a las ${tramo.abre}`
            };

        }

    }

    // Hoy ya no quedan más horarios

     //--------------------------------------------------
    // Buscar el próximo día con horario
    //--------------------------------------------------

    const nombres = [
        "domingo",
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado"
    ];

    const nombresTexto = {
        domingo: "domingo",
        lunes: "lunes",
        martes: "martes",
        miercoles: "miércoles",
        jueves: "jueves",
        viernes: "viernes",
        sabado: "sábado"
    };

    const indiceHoy = fecha.getDay();

    for (let i = 1; i <= 7; i++) {

        const indice = (indiceHoy + i) % 7;
        const dia = nombres[indice];

        const tramosDia = horario[dia] ?? [];

        if (tramosDia.length === 0) {
            continue;
        }

        const primerTramo = tramosDia[0];

        return {
            abierto: false,
            texto:
                i === 1
                    ? `Abre mañana a las ${primerTramo.abre}`
                    : `Abre el ${nombresTexto[dia]} a las ${primerTramo.abre}`
        };

    }

    //--------------------------------------------------
    // Nunca abre
    //--------------------------------------------------

    return {
        abierto: false,
        texto: "Sin horario disponible"
    };

}
//======================================================
// FORMATEA EL HORARIO DEL DÍA ACTUAL
//======================================================

export function formatearHorarioHoy(horario, fecha = new Date()) {

    const hoy = obtenerDia(fecha);
    const tramos = horario[hoy] ?? [];

    if (tramos.length === 0) {
        return "Cerrado";
    }

    return tramos
    .map(tramo => `${tramo.abre}–${tramo.cierra}`)
    .join("\n");

}

//======================================================
// FORMATEADOR DE HORARIOS
//======================================================

export function formatearHorario(horario) {

    const dias = [
        { clave: "lunes", texto: "Lun" },
        { clave: "martes", texto: "Mar" },
        { clave: "miercoles", texto: "Mié" },
        { clave: "jueves", texto: "Jue" },
        { clave: "viernes", texto: "Vie" },
        { clave: "sabado", texto: "Sáb" },
        { clave: "domingo", texto: "Dom" }
    ];

    return dias.map(({ clave, texto }) => {

        const tramos = horario[clave] ?? [];

        if (tramos.length === 0) {
            return `${texto}: Cerrado`;
        }

        const horarioTexto = tramos
            .map(tramo => `${tramo.abre}–${tramo.cierra}`)
            .join(" / ");

        return `${texto}: ${horarioTexto}`;

    });
}
