import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"

export default function ItemPedido({ pedido }) {
    return (
        <ListItem button>
            <ListItemAvatar>
                <Avatar alt={pedido.id} src="https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={pedido.itemCarta.titulo}
            />
            <ListItemText 
                secondary={pedido.estado}
            />
            <ListItemText 
                secondary={pedido.cantidad}
            />
            <ListItemText 
                primary={
                    <DeleteIcon />
                }
            />
        </ListItem>
    )
}