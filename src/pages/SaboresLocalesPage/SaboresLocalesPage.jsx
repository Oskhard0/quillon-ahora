// ======================================================
// SABORES LOCALES PAGE
//
// Primera experiencia independiente de QUILLÓN AHORA.
//
// Esta pantalla reunirá toda la navegación relacionada
// con la gastronomía local.
//
// RESPONSABILIDADES
// ✔ Definir el contenido de la experiencia Sabores Locales.
// ✔ Configurar el Hero de la experiencia.
// ✔ Organizar los módulos propios de Sabores.
//
// NO DEBE HACER
// ✘ Implementar el overlay.
// ✘ Gestionar transiciones.
// ✘ Gestionar la navegación global.
// ✘ Contener lógica reutilizable.
// ✘ Consultar directamente otros módulos.
//
// El contenedor visual (ExperienceOverlay)
// es un componente reutilizable compartido por
// todas las experiencias principales.

import "./SaboresLocalesPage.css";

import ExperienceOverlay from "../../components/ui/ExperienceOverlay/ExperienceOverlay";
import Hero from "../../components/ui/Hero/Hero";
import CategoryLayout from "../../components/layout/CategoryLayouts/CategoryLayout";
import FloatingBackButton from "../../components/ui/FloatingBackButton/FloatingBackButton";
import ExperienceFrame from "../../components/ui/ExperienceFrame/ExperienceFrame";

import saboresLocales from "../../data/experiencias/saboresLocales";

export default function SaboresLocalesPage({ volver }) {

    return (

        <ExperienceOverlay>

            <main className="sabores-page">

                <ExperienceFrame>
                <FloatingBackButton onClick={volver} />

                <Hero hero={saboresLocales.hero} />

                <CategoryLayout
                    categorias={saboresLocales.categorias}
                />

                </ExperienceFrame>

                <button onClick={volver}>
                    ← Volver al inicio
                </button>

                


            </main>

        </ExperienceOverlay>

    );

}