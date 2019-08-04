import React from 'react';
import { Dialog, DialogContent, Button, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';

export default function DialogConfirmacion(props) {
  const { titulo, descripcion, handlers, open } = props;

  return (
    <Dialog
      open={open}  >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{descripcion}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlers.open} color="primary" autoFocus>Cancelar</Button>
        <Button onClick={handlers.onChange} color="primary">Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
}