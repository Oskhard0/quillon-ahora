import "./EmergenciasFarmPage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import Hero from "../../components/ui/Hero/Hero";
import Seccion from "../../components/sections/Seccion";
import {
    FaClinicMedical,
    FaPhoneAlt,
    FaPills
} from "react-icons/fa";

import emergencias from "../../data/experiencias/emergencias";

export default function EmergenciasFarmPage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="emergencias-page">

                <ExperienceFrame>

                    <FloatingBackButton onClick={volver} />

                    <Hero hero={emergencias.hero} />

                    <Seccion titulo="Farmacia de Turno"
                             color="#C62828"
                             icono={<FaClinicMedical />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion titulo="Números de Emergencia"
                             color="#C62828"
                             icono={<FaPhoneAlt />}>
                        Contenido temporal
                    </Seccion>

                    <Seccion titulo="Otras Farmacias"
                             color="#C62828"
                            icono={<FaPills />}>
                        
                        Contenido temporal
                        
                    </Seccion>

                </ExperienceFrame>

            </main>

        </ExperienceOverlay>

    );

}