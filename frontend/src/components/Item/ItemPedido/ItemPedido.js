import React from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"

export default function ItemPedido(props) {
    const { pedido, disabled, handlers } = props;

    return (
        <ListItem button disabled={disabled} >
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <ListItemAvatar>
                        <Avatar src={pedido.itemCarta.imagenes[0]} />
                    </ListItemAvatar>
                </Grid>
                <Grid item xs={5}>
                    <ListItemText
                        primary={pedido.itemCarta.titulo}
                        secondary={"Cantidad: " + pedido.cantidad}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ListItemText
                        secondary={pedido.estado.replace('_', ' ')}
                    />
                </Grid>
                <Grid item xs={1}>
                    <ListItemText
                        primary={
                            <DeleteIcon
                                onClick={() => {
                                    handlers.onChange(pedido)
                                }} />
                        }
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
}
