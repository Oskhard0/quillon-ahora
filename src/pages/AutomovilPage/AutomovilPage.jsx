import "./AutomovilPage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import Hero from "../../components/ui/Hero/Hero";
import Seccion from "../../components/sections/Seccion";

import {
    FaCar,
    FaTools,
    FaGasPump
} from "react-icons/fa";

import automovilYMovilidad from "../../data/experiencias/automovilYMovilidad";

export default function AutomovilPage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="automovil-page">

                <ExperienceFrame>

                    <FloatingBackButton onClick={volver} />

                    <Hero hero={automovilYMovilidad.hero} />

                    <Seccion
                        titulo="Talleres Mecánicos"
                        color="#1976D2"
                        icono={<FaTools />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Repuestos y Accesorios"
                        color="#1976D2"
                        icono={<FaCar />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Servicios Automotrices"
                        color="#1976D2"
                        icono={<FaGasPump />}>
                        Contenido temporal
                    </Seccion>

                </ExperienceFrame>

            </main>

        </ExperienceOverlay>

    );

}