import "./FiestasPage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import Hero from "../../components/ui/Hero/Hero";
import Seccion from "../../components/sections/Seccion";

import {
    FaMapMarkedAlt,
    FaCalendarAlt,
    FaMusic
} from "react-icons/fa";

import fiestasYLugares from "../../data/experiencias/fiestasYLugares";

export default function FiestasPage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="fiestas-page">

                <ExperienceFrame>

                    <FloatingBackButton onClick={volver} />

                    <Hero hero={fiestasYLugares.hero} />

                    <Seccion
                        titulo="Fiestas Costumbristas"
                        color="#00897B"
                        icono={<FaCalendarAlt />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Lugares de Interés"
                        color="#00897B"
                        icono={<FaMapMarkedAlt />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Panoramas y Eventos"
                        color="#00897B"
                        icono={<FaMusic />}>
                        Contenido temporal
                    </Seccion>

                </ExperienceFrame>

            </main>

        </ExperienceOverlay>

    );

}