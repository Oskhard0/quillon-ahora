import "./radial.css";

function RadialButton({

    icono: Icono,
    color,
    onClick,
    className = "",
    style = {},
    iconSize = 28

}) {

    return (

        <button

            className={`radial-button ${className}`}

            style={{

                backgroundColor: color,
                ...style

            }}

            onClick={onClick}

        >

            <Icono
                className="radial-icon"
                size={iconSize}
            />

        </button>

    );

}

export default RadialButton;