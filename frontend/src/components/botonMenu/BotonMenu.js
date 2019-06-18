import React from 'react';
import './BotonMenu.scss'

export default function BotonMenu(props) {
  const { texto, handlers } = props;

  return (
    <button className="botonMenu" onClick={() => handlers.onChange(texto)}>
      {texto.toUpperCase()}
    </button>
  );
}