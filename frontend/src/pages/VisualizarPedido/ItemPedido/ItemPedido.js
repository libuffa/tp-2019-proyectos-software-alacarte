import React, { Component } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText, List } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"

export default class ItemPedido extends Component {

    render() {
        return (
            <List >
                <ListItem button alignItems="flex-end">
                    <ListItemAvatar>
                        <Avatar alt={this.props.pedido.itemCarta} src={this.props.pedido.itemCarta.imagenes[0]} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.pedido.itemCarta.titulo}
                    />
                    <ListItemText
                        secondary={this.props.pedido.estado}
                    />
                    <ListItemText
                        secondary={this.props.pedido.cantidad}
                    />
                    <ListItemText
                        primary={
                            <DeleteIcon />
                        }
                    />
                </ListItem>
            </List>
        )
    }
}
