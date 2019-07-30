import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Chip } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Restaurant from '@material-ui/icons/Restaurant';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import LocalBar from '@material-ui/icons/LocalBar';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    marginTop: '7px',
  },
  paper: {
    height: '100%',
    padding: '8px',
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    width: '100%',
  },
  mesaOcupada: {
    color: '#ff0000bf',
  },
  mesaLibre: {
    color: '#03a524bf',
  },
  boton: {
    width: '13rem',
  },
  separadorTextos: {
    padding: theme.spacing(0, 1),
  },
  chip: {
    margin: theme.spacing(0, 0.5, 0.5, 0.5),
  }
}));

export default function CuerpoMesa(props) {
  const { mesa, mozo, verPedido, mostrarQR, sesionMesa, entregarPedido, verItemPedido } = props;
  const classes = useStyles();

  function verMesa(idSesion) {
    ControllerDeSesion.setSesionActiva(idSesion)
    verPedido.onChange(idSesion)
  }

  return (
    <div>
      <Paper elevation={0} square className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} >
            <div className="cantidad">
              <Typography className={classes.separadorTextos} variant="h5">
                {"Estado:"}
              </Typography>
              <Typography className={mesa.sesion ? classes.mesaOcupada : classes.mesaLibre} variant="h5">
                {mesa.sesion ? "Ocupada" : "Disponible"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <div className="cantidad">
              <Typography className={classes.separadorTextos} variant="h5">
                {"Mozo:"}
              </Typography>
              <Typography color="textSecondary" variant="h5">
                {mozo ? mozo.nombre : "-"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <div className="cantidad">
              <Typography className={classes.separadorTextos} variant="h5">
                {"Avisos:"}
              </Typography>
              <div className="full ">
                {mesa.sesion ?
                  mesa.sesion.pedidos.filter((pedido) => (pedido.estado === "Finalizado" && !pedido.cancelado) || (pedido.itemCarta.categoria === "Bebida" && pedido.estado !== "Entregado" && !pedido.cancelado)).map((pedido) => {
                    return (
                      <Chip icon={pedido.itemCarta.categoria === "Bebida" ? <LocalBar /> : <Restaurant />} className={classes.chip} color="secondary" key={pedido.id} onClick={() => { verItemPedido.onChange(pedido) }} onDelete={() => entregarPedido.onChange(pedido.id)} label={pedido.estado === "Finalizado" ? "Retirar pedido listo" : "Bebidas solicitadas"} />
                    )
                  }) :
                  "-"}
                {mesa.sesion ? mesa.sesion.pideCuenta ? <Chip icon={<MoneyIcon />} className={classes.chip} color="secondary" label="Solicita cuenta" /> : "" : ""}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={() => { verMesa(mesa.sesion.id) }} disabled={mesa.sesion ? false : true} variant="contained" color="primary">
              <Typography variant="overline">
                {"Ver pedido"}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth disabled={mesa.sesion ? false : true} variant="contained" color="primary" onClick={() => mostrarQR.onChange()}>
              <Typography variant="overline">
                {"Mostrar QR"}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={() => sesionMesa.onChange()}>
              <Typography variant="overline">
                {mesa.sesion ? "desasignar" : "Asignar"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}