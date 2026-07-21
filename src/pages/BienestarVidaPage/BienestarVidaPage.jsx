import "./BienestarVidaPage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import Hero from "../../components/ui/Hero/Hero";
import Seccion from "../../components/sections/Seccion";

import {
    FaHeartbeat,
    FaPaw,
    FaLeaf
} from "react-icons/fa";

import bienestar from "../../data/experiencias/bienestar";

export default function BienestarVidaPage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="bienestar-page">

                <ExperienceFrame>

                    <FloatingBackButton onClick={volver} />

                    <Hero hero={bienestar.hero} />

                    <Seccion
                        titulo="Salud y Bienestar"
                        color="#EC407A"
                        icono={<FaHeartbeat />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Veterinarias"
                        color="#EC407A"
                        icono={<FaPaw />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Vida Comunitaria"
                        color="#EC407A"
                        icono={<FaLeaf />}>
                        Contenido temporal
                    </Seccion>

                </ExperienceFrame>

            </main>

        </ExperienceOverlay>

    );

}