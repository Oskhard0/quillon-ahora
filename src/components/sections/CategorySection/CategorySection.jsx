/**
 * -------------------------------------------------------------------
 * CategorySection
 * -------------------------------------------------------------------
 *
 * Representa visualmente una subcategoría dentro de un CategoryLayout.
 *
 * Este componente únicamente define la estructura de presentación.
 *
 * NO conoce:
 * - comercios
 * - destacados
 * - horarios
 * - filtros
 * - lógica de negocio
 *
 * En futuras etapas recibirá la información mediante props.
 * -------------------------------------------------------------------
 */

import "./CategorySection.css";

function CategorySection({ icono, nombre }) {
    return (
        <section className="category-section">

            <header className="category-header">
                <h2>
                    <span>{icono}</span> {nombre}
                </h2>
            </header>

            <div className="category-featured">

                <h3>⭐ Destacados</h3>

                <div className="featured-grid">

                    <div className="featured-placeholder">
                        Próximamente
                    </div>

                    <div className="featured-placeholder">
                        Próximamente
                    </div>

                </div>

            </div>

            <button
                className="category-more"
                type="button"
            >
                <span className="category-more-icon">▼</span>
                <span>Ver Más</span> {nombre.toLowerCase()}
            </button>

        </section>
    );
}

export default CategorySection;