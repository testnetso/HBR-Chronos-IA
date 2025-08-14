import React, { useEffect, useRef } from 'react';
import '../../styles/Menu.css';

const SideMenu = ({ isOpen, onClose }) => {
  const drawerRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside ref={drawerRef} className={`drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <header className="drawer-header">
          <h2>Navegación</h2>
          <button className="close-btn" onClick={onClose}>Cerrar</button>
        </header>
        <nav className="menu">
          <div className="section">Analisis</div>
          <a href="#">Crypto</a>
          <a href="#">Forex</a>
          <a href="#">Syntetico</a>
          <div className="section">Creditos</div>
          <a href="#">Comprar Creditos</a>
          <a href="#">Ofertas</a>
          <a href="#">Sobre Nosotros</a>
          <div className="section">Cuenta</div>
          <a href="#">Acceder</a>
          <a href="#">Registrarse</a>
        </nav>
      </aside>
    </>
  );
};

export default SideMenu;
