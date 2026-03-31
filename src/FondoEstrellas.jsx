import React, { useEffect, useRef } from 'react';

const FondoEstrellas = () => {
  const canvasRef = useRef(null); // Usamos un Ref para el Canvas

  useEffect(() => {
    // === Aquí pegas TODO tu código JS original del fondo ===
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let estrellas = [];

    // Ajustamos el tamaño al de la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // (Ejemplo rápido de lógica de estrellas)
    for (let i = 0; i < 200; i++) {
      estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: Math.random() * 0.5 // velocidad
      });
    }

    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      estrellas.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1, 0, Math.PI * 2);
        ctx.fill();
        e.y += e.v; // movimiento
        if (e.y > canvas.height) e.y = 0;
      });
      requestAnimationFrame(animar);
    }
    animar();
    // ========================================================

    // Limpieza si el componente se desmonta
    return () => {
      // (Aquí deberías detener la animación si tu script lo requiere)
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} // Vinculamos el Ref
      style={{
        position: 'fixed', // Fijo detrás de todo
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Detrás del contenido
        backgroundColor: 'black' // Fondo base
      }}
    />
  );
};

export default FondoEstrellas;