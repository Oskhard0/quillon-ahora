import { FaImage } from "react-icons/fa";

function FeaturedCard({

    nombre,
    categoria,
    descripcion,
    imagen

}) {

    return (

        <div className="featured-card">

            <div className="featured-image">

                <img
                    src={imagen}
                    alt={nombre}
                />

                <div className="featured-overlay">

                    <h3>{nombre}</h3>

                </div>

            </div>       

        </div>

    );

}

export default FeaturedCard;