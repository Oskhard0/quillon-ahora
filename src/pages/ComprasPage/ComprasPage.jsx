import "./ComprasPage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import Hero from "../../components/ui/Hero/Hero";
import Seccion from "../../components/sections/Seccion";

import {
    FaShoppingBag,
    FaStore,
    FaTools
} from "react-icons/fa";

import comprasYServicios from "../../data/experiencias/comprasYServicios";

export default function ComprasPage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="compras-page">

                <ExperienceFrame>

                    <FloatingBackButton onClick={volver} />

                    <Hero hero={comprasYServicios.hero} />

                    <Seccion
                        titulo="Tiendas"
                        color="#5E35B1"
                        icono={<FaStore />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Servicios"
                        color="#5E35B1"
                        icono={<FaTools />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Compras Locales"
                        color="#5E35B1"
                        icono={<FaShoppingBag />}>
                        Contenido temporal
                    </Seccion>

                </ExperienceFrame>

            </main>

        </ExperienceOverlay>

    );

}