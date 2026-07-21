// ======================================================
// HERO
//
// Componente visual reutilizable para las experiencias
// principales de QUILLÓN AHORA.
//
// RESPONSABILIDADES
// ✔ Mostrar una imagen principal.
// ✔ Mostrar el título.
// ✔ Mostrar el subtítulo.
// ✔ Aplicar la composición visual del Hero.
//
// NO DEBE HACER
// ✘ Navegar.
// ✘ Consultar datos.
// ✘ Gestionar estado.
// ✘ Conocer la experiencia actual.
//
// Todo el contenido es recibido mediante props.
// ======================================================

import "./Hero.css";

export default function Hero({ hero }){

    return (

        <section
            className="hero"
            style={{
                backgroundImage: `url(${hero.imagen})`
            }}
        >

            <div className="hero-overlay">

                <h1>{hero.titulo}</h1>

                <p>{hero.subtitulo}</p>

            </div>

        </section>

    );

}