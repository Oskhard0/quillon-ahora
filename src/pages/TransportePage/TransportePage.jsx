import "./TransportePage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import Hero from "../../components/ui/Hero/Hero";
import Seccion from "../../components/sections/Seccion";

import {
    FaBus,
    FaTaxi,
    FaClock
} from "react-icons/fa";

import transporte from "../../data/experiencias/transporte";

export default function TransportePage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="transporte-page">

                <ExperienceFrame>

                    <FloatingBackButton onClick={volver} />

                    <Hero hero={transporte.hero} />

                    <Seccion
                        titulo="Horarios de Buses"
                        color="#F9A825"
                        icono={<FaBus />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Taxis y Transporte"
                        color="#F9A825"
                        icono={<FaTaxi />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion
                        titulo="Próximas Salidas"
                        color="#F9A825"
                        icono={<FaClock />}>
                        Contenido temporal
                    </Seccion>

                </ExperienceFrame>

            </main>

        </ExperienceOverlay>

    );

}