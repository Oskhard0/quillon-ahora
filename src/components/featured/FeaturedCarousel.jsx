import "./Featured.css";
import FeaturedCard from "./FeaturedCard";

function FeaturedCarousel({ destacados }) {

    return (

        <section className="featured-carousel">

            {destacados.map((item) => (

                <FeaturedCard
                    key={item.id}
                    {...item}
                />

            ))}

        </section>

    );

}

export default FeaturedCarousel;