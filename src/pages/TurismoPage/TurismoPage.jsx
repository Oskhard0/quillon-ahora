import "./TurismoPage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import Hero from "../../components/ui/Hero/Hero";
import Seccion from "../../components/sections/Seccion";

import {
    FaCampground,
    FaHotel,
    FaMapSigns
} from "react-icons/fa";

import turismoYEstadia from "../../data/experiencias/turismoYEstadia";

export default function TurismoPage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="turismo-page">

                <ExperienceFrame>

                    <FloatingBackButton onClick={volver} />

                    <Hero hero={turismoYEstadia.hero} />

                    <Seccion
                        titulo="Alojamiento"
                        color="#2E7D32"
                        icono={<FaHotel />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Camping y Cabañas"
                        color="#2E7D32"
                        icono={<FaCampground />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Panoramas Turísticos"
                        color="#2E7D32"
                        icono={<FaMapSigns />}>
                        Contenido temporal
                    </Seccion>

                </ExperienceFrame>

            </main>

        </ExperienceOverlay>

    );

}