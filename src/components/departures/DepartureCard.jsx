import { MdDirectionsBus } from "react-icons/md";

function DepartureCard({

    titulo,
    tiempo,
    minutos,    
    onClick

}) 

{

    let colorEstado = "#43A047";

if (minutos < 10) {

    colorEstado = "#E53935";

} else if (minutos <= 20) {

    colorEstado = "#FBC02D";

}
const sinSalidas =
    tiempo === null ||
    tiempo === undefined ||
    tiempo === "Pronto";

const textoEstado = sinSalidas
    ? "Hasta mañana"
    : minutos >= 60
        ? `En ${Math.floor(minutos / 60)} h${minutos % 60 ? ` ${minutos % 60} min` : ""}`
        : `En ${minutos} min`;



    return (

        <button
            className="departure-card"
            style={{
                borderTop: `6px solid ${colorEstado}`
            }}
            onClick={onClick}
        >

            <div className="departure-icon">
                <MdDirectionsBus />
            </div>

            <div className="departure-destination">
                {titulo}
            </div>
        

            <div className="departure-hour">

                {tiempo}

            </div>

            <div
                className={`departure-time ${sinSalidas ? "sin-salidas" : ""}`}
            >

                {textoEstado}

            </div>

        </button>

    );

}

export default DepartureCard;