import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

export default function ItemMesa({ mesa }) {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt={mesa.id} src="https://indiancreeknaturecenter.org/wp-content/uploads/2018/01/Farm-to-Table-Dinner-7.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={"Mesa Nº " + mesa.id}
        secondary={"Estado: " + mesa.estado}
      />
    </ListItem>
  )
}
