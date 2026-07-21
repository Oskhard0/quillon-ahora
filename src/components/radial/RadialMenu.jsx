import "./radial.css";

import RadialButton from "./RadialButton";
import CompassHub from "../compass/CompassHub";

import { MACROCATEGORIAS } from "../../knowledge/macrocategorias";

// ======================================================
// RADIAL MENU
//
// Muestra las ocho macrocategorías principales.
//
// RESPONSABILIDADES
// ✔ Dibujar la distribución radial.
// ✔ Informar qué categoría seleccionó el usuario.
//
// NO DEBE HACER
// ✘ Navegar.
// ✘ Consultar comercios.
// ✘ Conocer ExperienceRouter.
// ✘ Cambiar estados globales.
//
// La navegación siempre será solicitada mediante
// la función "navegar" recibida por props.
//
// ======================================================

function RadialMenu({ navegar }) {

    const TAM_CONTENEDOR = 352;
    const TAM_BOTON = 72;

    const CENTRO_X = TAM_CONTENEDOR / 2;
    const CENTRO_Y = TAM_CONTENEDOR / 2;
    const RADIO = 130;

    return (

        <div className="radial-menu">

            <div className="radial-container">

                <CompassHub
                    x={CENTRO_X}
                    y={CENTRO_Y}
                />

                {MACROCATEGORIAS.map((categoria, index) => {

                    const angulo = (-90 + index * 45) * Math.PI / 180;

                    const left =
                        CENTRO_X +
                        RADIO * Math.cos(angulo) -
                        TAM_BOTON / 2;

                    const top =
                        CENTRO_Y +
                        RADIO * Math.sin(angulo) -
                        TAM_BOTON / 2;

                    return (

                        <RadialButton
                            key={categoria.id}
                            icono={categoria.icono}
                            color={categoria.color}
                            className="absolute"
                            style={{
                                left,
                                top
                            }}

                            // ----------------------------------
                            // Informa qué categoría fue elegida.
                            // No realiza la navegación.
                            // ----------------------------------

                            onClick={() => {

                                console.log("CLICK:", categoria.id);
                                console.log("navegar:", navegar);

                                if (navegar) {
                                    navegar(categoria.id);
                                }

                            }}

                        />

                    );

                })}

            </div>

        </div>

    );

}

export default RadialMenu;