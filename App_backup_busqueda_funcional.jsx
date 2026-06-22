import { useState } from "react";
import comercios from "./data/comercios";
  
function App() {

  const [detalleAbierto, setDetalleAbierto] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const abiertos = comercios.filter(c => c.abierto);

  const toggleDetalle = (id) => {
    if (detalleAbierto === id) {
      setDetalleAbierto(null);
    } else {
      setDetalleAbierto(id);}
  };

  const comerciosFiltrados = comercios.filter(comercio =>
  comercio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  comercio.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
  comercio.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
  comercio.referencia.toLowerCase().includes(busqueda.toLowerCase())
);

 
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <header
        style={{
          backgroundColor: "#2E7D32",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h1>📍 Quillón Ahora</h1>
        <p>La información útil de Quillón en un solo lugar</p>
      </header>

      <div
        style={{
          marginTop: "20px",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Buscar comercio, evento o lugar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
          }}
        />
      </div>

      {busqueda && (
        <div
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h3>🔍 Resultados</h3>
        {comerciosFiltrados.length === 0 && (
          <p>No se encontraron comercios con ese criterio.</p>
        )}

          {comerciosFiltrados.map(comercio => (
            <div
              key={comercio.id}
              style={{
                backgroundColor: "#f8f8f8",
                padding: "10px",
                maxWidth: "350px",
                margin: "0 auto 10px auto",
                borderRadius: "10px",
                marginBottom: "15px",
                textAlign: "left",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                borderLeft: comercio.abierto
                ? "5px solid #2E7D32"
                : "5px solid #C62828",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              <strong>{comercio.nombre}</strong>

              <p>📍 {comercio.direccion}</p>
              <p>📍 {comercio.referencia}</p>
              <p>🍽️ {comercio.categoria}</p>

              <p>
              {comercio.abierto
                ? "🟢 Abierto"
                : "🔴 Cerrado"}
              </p>
               <button
                onClick={() => toggleDetalle(comercio.id)}
              >
                {detalleComercio === comercio.id
                  ? "Ocultar detalles"
                  : "Ver detalles"}
              </button>

              {detalleComercio === comercio.id && (
                <div>
                  <p>📞 {comercio.telefono}</p>
                  <p>⏰ {comercio.horario}</p>
                </div>
              )}  
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          🟢 <strong>Qué está abierto ahora</strong>
          <p>{abiertos.length} comercios abiertos</p>

          {abiertos.map(comercio => (
            <div
              key={comercio.id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}

                onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
              }}

              style={{
                    backgroundColor: "#f8f8f8",
                    padding: "10px",
                    maxWidth: "350px",
                    margin: "0 auto 10px auto",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    textAlign: "left",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    borderLeft: "5px solid #2E7D32",
                    transition: "all 0.2s ease",
                    cursor: "pointer"
         }}
  >
    <strong>{comercio.nombre}</strong>

    <p>{comercio.categoria}</p>
         
    <p>📍 {comercio.direccion}</p>

    <p>🧭 {comercio.referencia}</p>
    <button onClick={() => toggleDetalleComercio(comercio.id)}>
          {detalleComercio === comercio.id
          ? "Ocultar detalles"
          : "Ver detalles"}   
    </button>
      {detalleComercio=== comercio.id && (
      <div>
        <p>📞 {comercio.telefono}</p>
        <p>⏰ {comercio.horario}</p>
      </div>
)}


  </div>
))}
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          💊 <strong>Farmacia de turno</strong>
          <p>Farmacia Central</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          🎉 <strong>Eventos de hoy</strong>
          <p>Fiesta de la Vendimia</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          📞 <strong>Emergencias</strong>
          <p>Bomberos - Carabineros - Cesfam</p>
        </div>
      </div>
    </div>
  );
}

export default App;