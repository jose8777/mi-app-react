import React, { useState, useEffect } from 'react';
import FondoEstrellas from './FondoEstrellas';

const PaginaFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  // 1. Cargar favoritos al abrir la página
  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('mis_favoritos')) || [];
    setFavoritos(datosGuardados);
  }, []);

  // 2. Función para eliminar un favorito
  const eliminarFavorito = (id) => {
    const nuevaLista = favoritos.filter(coin => coin.id !== id);
    setFavoritos(nuevaLista);
    localStorage.setItem('mis_favoritos', JSON.stringify(nuevaLista));
  };

  return (
    <div style={{ padding: '20px' }}>
      <FondoEstrellas/>
      <h1 style={{color:'#f5f2f2'}}>⭐ Mis Criptos Favoritas</h1>
      
      {favoritos.length === 0 ? (
        <p style={{ color: '#888', marginTop: '20px' }}>
          Aún no tienes favoritos. ¡Ve al inicio y añade algunos!
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th>Moneda</th>
              <th>Precio Actual</th>
              <th>24h %</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {favoritos.map((coin) => (
              <tr key={coin.id} style={{ borderBottom: '1px solid #f0f0f0', height: '60px' }}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '60px' }}>
                  <img src={coin.image} alt={coin.name} style={{ width: '25px' }} />
                  <strong>{coin.name}</strong>
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td style={{ color: coin.price_change_percentage_24h > 0 ? '#02c076' : '#f84960' }}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td>
                  <button 
                    onClick={() => eliminarFavorito(coin.id)}
                    style={{ 
                      backgroundColor: '#ff4d4d', 
                      color: 'white', 
                      border: 'none', 
                      padding: '5px 10px', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaginaFavoritos;