/**
 * -------------------------------------------------------------------
 * CategoryLayout
 * -------------------------------------------------------------------
 *
 * Layout reutilizable para experiencias organizadas por categorías.
 *
 * Recibe un arreglo de categorías mediante props y renderiza una
 * CategorySection por cada una.
 *
 * NO conoce:
 * - comercios
 * - destacados
 * - horarios
 * - filtros
 * - lógica de negocio
 * -------------------------------------------------------------------
 */

import "./CategoryLayout.css";

import CategorySection from "../../sections/CategorySection/CategorySection";

function CategoryLayout({ categorias = [] }) {

    return (

        <section className="category-layout">

            {categorias.map((categoria) => (

                <CategorySection
                    key={categoria.id}
                    icono={categoria.icono}
                    nombre={categoria.nombre}
                />

            ))}

        </section>

    );

}

export default CategoryLayout;