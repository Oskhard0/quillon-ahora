// ======================================================
// EXPERIENCE OVERLAY
//
// Capa reutilizable utilizada por todas las experiencias
// principales de QUILLÓN AHORA.
//
// RESPONSABILIDADES
// ✔ Mostrar una experiencia sobre Home.
// ✔ Oscurecer el fondo.
// ✔ Aplicar blur.
// ✔ Animar entrada y salida.
// ✔ Mantener visible el Home debajo.
//
// NO DEBE HACER
// ✘ Conocer comercios.
// ✘ Conocer categorías.
// ✘ Tener lógica de negocio.
// ✘ Consultar motores.
//
// Todo el contenido se recibe mediante children.
//
// ======================================================

import "./ExperienceOverlay.css";

function ExperienceOverlay({ children }) {

    return (

        <div className="experience-overlay">

            <div className="experience-backdrop" />

            <div className="experience-content">

                {children}

            </div>

        </div>

    );

}

export default ExperienceOverlay;