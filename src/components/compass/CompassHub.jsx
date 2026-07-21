import "./Compass.css";
import { FaCompass } from "react-icons/fa";
import RadialButton from "../Radial/RadialButton";

function CompassHub({ x, y, onClick }) {

    return (

        <div
            className="compass-hub"
            style={{
                left: x,// - 6,
                top: y // - 6
            }}
        >

            <RadialButton
                
                icono={FaCompass}
                color="#2E7D32"
                iconSize={34}
                onClick={onClick}
            />

        </div>

    );

}

export default CompassHub;