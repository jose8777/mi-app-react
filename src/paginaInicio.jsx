import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import FondoEstrellas from './FondoEstrellas';

const PaginaInicio = () => {
  const [criptos, setCriptos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 1. CARGA INICIAL (Solo una vez para traer nombres e imágenes)
  useEffect(() => {
    const cargarListaInicial = async () => {
      try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false';
        const respuesta = await axios.get(url);
        setCriptos(respuesta.data);
        setCargando(false);
      } catch (error) {
        console.error("Error inicial:", error);
      }
    };
    cargarListaInicial();
  }, []);

  // 2. TIEMPO REAL (WebSocket de Binance)
  useEffect(() => {
    if (criptos.length === 0) return;

    // Creamos la conexión para las 25 monedas a la vez
    // Binance usa minúsculas y añade 'usdt' (ej: btcusdt)
    const streams = criptos.map(c => `${c.symbol.toLowerCase()}usdt@ticker`).join('/');
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

  

    socket.onmessage = (event) => {
      const datos = JSON.parse(event.data);
      const symbolRecibido = datos.s.replace('USDT', '').toLowerCase();
      const nuevoPrecio = parseFloat(datos.c);

      // Actualizamos solo el precio de la moneda que cambió en el estado
      setCriptos((prevCriptos) => 
        prevCriptos.map((c) => 
          c.symbol.toLowerCase() === symbolRecibido 
            ? { ...c, current_price: nuevoPrecio } 
            : c
        )
      );
    };

    return () => socket.close();
  }, [cargando]); // Se activa cuando termina de cargar la lista inicial

  const agregarAFavoritos = (crypto) => {
    const favoritosActuales = JSON.parse(localStorage.getItem('mis_favoritos')) || [];
    const yaExiste = favoritosActuales.find(item => item.id === crypto.id);
    if (!yaExiste) {
      localStorage.setItem('mis_favoritos', JSON.stringify([...favoritosActuales, crypto]));
      alert("¡Añadida!");
    }
  };

  if (cargando) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Conectando con el mercado...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <FondoEstrellas></FondoEstrellas>
      <h1 style={{ color: '#fbfbfb' }}>⚡ Mercado Actual</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#888' }}>
            <th>Moneda</th>
            <th>Precio Actual (USD)</th>
            <th></th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {criptos.map((coin) => (
            <tr key={coin.id} style={{ borderBottom: '1px solid #f9f9f9', height: '60px' }}>
              <td style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '60px' }}>
                <img src={coin.image} alt="" style={{ width: '25px' }} />
                <strong>{coin.name}</strong>
              </td>
              <td style={{ fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.3s' }}>
                ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
              <td>
              </td>
              <td>
                <button onClick={() => agregarAFavoritos(coin)} style={{ cursor: 'pointer' }}>⭐</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaginaInicio;