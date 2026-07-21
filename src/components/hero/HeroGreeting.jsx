// =====================================================
// HERO GREETING
// =====================================================
//
// Responsabilidad
// ----------------
// Renderiza el saludo principal del Hero.
//
// Este componente no conoce horarios ni temas.
// Recibe el contenido y el estilo desde Hero.jsx.
//
// =====================================================

import "./HeroGreeting.css";

function HeroGreeting({

    saludo,

    subtitulo,

    estilo,

    respirando

}) {

    return (

        <div

         className={`hero-greeting ${respirando ? "breathing" : ""}`}

        >

            <h2

                style={{

                    color: estilo.colorTitulo,

                    textShadow: estilo.sombraTexto

                }}

            >

                {saludo}

            </h2>

            <p

                style={{

                    color: estilo.colorSubtitulo

                }}

            >

                {subtitulo}

            </p>

        </div>

    );

}

export default HeroGreeting;