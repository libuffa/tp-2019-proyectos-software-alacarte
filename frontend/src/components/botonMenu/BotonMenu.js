import React from 'react';
import '../estilos.scss'
import { Typography } from '@material-ui/core';

export default function BotonMenu(props) {
  const { texto, handlers } = props;

  return (
    <button className="botonMenu" onClick={() => handlers.onChange(texto)}>
      <Typography variant="h6" >
        {texto.toUpperCase().replace("_", " ")}
      </Typography>
    </button>
  );
}