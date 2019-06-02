import React from 'react';
import List from '@material-ui/core/List';
import ItemMesa from './ItemMesa/ItemMesa';

export default function VisualizarMesa({ mesas }) {
  return (
    <List>
      {mesas && mesas.map(mesa => <ItemMesa key={mesa.id} mesa={mesa} />)}
    </List>
  )
}
