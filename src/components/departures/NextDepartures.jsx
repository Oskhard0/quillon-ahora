import "./Departure.css";
import DepartureCard from "./DepartureCard";

function NextDepartures({

    salidas,

    onDestinoClick

}) {

    return (

        <section className="next-departures">

            {salidas.map((salida) => (

                <DepartureCard
                    key={salida.destino}
                    {...salida}
                    onClick={() => onDestinoClick?.(salida.destino)}
                />

            ))}

        </section>

    );

}

export default NextDepartures;