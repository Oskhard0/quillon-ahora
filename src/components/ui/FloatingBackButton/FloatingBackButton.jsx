import "./FloatingBackButton.css";

function FloatingBackButton({ onClick }) {

    return (

        <button
            className="floating-back-button"
            onClick={onClick}
            aria-label="Volver al inicio"
        >
            ←
        </button>

    );

}

export default FloatingBackButton;