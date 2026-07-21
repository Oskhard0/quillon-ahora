// =====================================================
// HERO
// =====================================================
//
// Responsabilidad
// ----------------
// Hero es el componente orquestador del encabezado.
//
// Se encarga de:
//
// • Obtener el contenido desde heroConfig.
// • Obtener la apariencia desde heroTheme.
// • Entregar ambos a los componentes hijos.
//
// No contiene reglas de negocio.
// No calcula horarios.
// No decide colores.
//
// =====================================================

import "./Hero.css";
import { useEffect, useState } from "react";

import {
    obtenerHeroActual,
    obtenerSaludoActual
} from "../../utils/heroConfig";

import { HERO_THEME } from "../../themes/heroTheme";

import HeroBackground from "./HeroBackground";
import HeroLogo from "./HeroLogo";
import HeroGreeting from "./HeroGreeting";

function Hero() {

    //--------------------------------------------------
    // MOVIMIENTO AMBIENTAL
    //--------------------------------------------------

    const [respirando, setRespirando] = useState(false);

    useEffect(() => {

        const intervalo = setInterval(() => {

            setRespirando(true);

            setTimeout(() => {

                setRespirando(false);

            }, 1200);

        }, 5000); // 1 minuto (modo pruebas) //obtenerTiempoAleatorio(8, 12) instruccion correcta definitiva

        return () => clearInterval(intervalo);

    }, []);

    //--------------------------------------------------
    // CONTENIDO
    //--------------------------------------------------

    const hero = obtenerHeroActual();

    const saludo = obtenerSaludoActual();

    //--------------------------------------------------
    // APARIENCIA
    //--------------------------------------------------

    const theme = HERO_THEME[saludo.key];

    return (

        <section className="hero">

            <HeroBackground
                background={hero.background}
            />

            <div className="hero-overlay">

                <HeroLogo />

                <HeroGreeting

                    saludo={saludo.saludo}

                    subtitulo={saludo.subtitulo}

                    estilo={theme.saludo}

                    respirando={respirando}

                />

            </div>

        </section>

    );

}

export default Hero;