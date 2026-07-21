// ======================================================
// EXPERIENCE ROUTER
//
// Responsable exclusivo de la navegación entre las
// experiencias principales de QUILLÓN AHORA.
//
// FILOSOFÍA
//
// El Home nunca desaparece.
//
// Las experiencias se muestran como un Overlay
// sobre el Home, preservando el contexto del usuario.
//
// ======================================================

import { useState } from "react";

import App from "../App";

import AutomovilPage from "../pages/AutomovilPage/AutomovilPage";
import BienestarVidaPage from "../pages/BienestarVidaPage/BienestarVidaPage";
import ComprasPage from "../pages/ComprasPage/ComprasPage";
import EmergenciasFarmPage from "../pages/EmergenciasFarmPage/EmergenciasFarmPage";
import FiestasPage from "../pages/FiestasPage/FiestasPage";
import SaboresLocalesPage from "../pages/SaboresLocalesPage/SaboresLocalesPage";
import TransportePage from "../pages/TransportePage/TransportePage";
import TurismoPage from "../pages/TurismoPage/TurismoPage";

// ======================================================
// MAPA DE EXPERIENCIAS
//
// Relaciona el id recibido desde el menú radial
// con el componente que debe mostrarse.
//
// ======================================================

const EXPERIENCIAS = {

    movilidad: AutomovilPage,
    turismo: TurismoPage,
    bienestar: BienestarVidaPage,
    emergencias: EmergenciasFarmPage,
    transporte: TransportePage,
    destinos: FiestasPage,
    sabores: SaboresLocalesPage,
    compras: ComprasPage

};

export default function ExperienceRouter() {

    //--------------------------------------------------
    // EXPERIENCIA ACTIVA
    //--------------------------------------------------

    const [experienciaAbierta, setExperienciaAbierta] = useState(null);

    //--------------------------------------------------
    // COMPONENTE ACTIVO
    //--------------------------------------------------

    const PaginaActiva = EXPERIENCIAS[experienciaAbierta];

    console.log("Experiencia abierta:", experienciaAbierta);

    //--------------------------------------------------
    // HOME + EXPERIENCIAS
    //--------------------------------------------------

    return (

        <>

            {/* ------------------------------------------
                HOME

                Permanece siempre montado.

                Conserva:
                • Scroll
                • Buscador
                • Estado interno
                • Carruseles
                • Animaciones

            ------------------------------------------ */}

            <App navegar={setExperienciaAbierta} />

            {/* ------------------------------------------
                EXPERIENCIA ACTIVA

                Se muestra como Overlay sobre el Home.
            ------------------------------------------ */}

            {PaginaActiva && (

                <PaginaActiva
                    volver={() => setExperienciaAbierta(null)}
                />

            )}

        </>

    );

}