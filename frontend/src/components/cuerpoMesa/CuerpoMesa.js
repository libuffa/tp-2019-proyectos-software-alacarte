import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

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
}));

export default function CuerpoMesa(props) {
  const { mesa, mozo, verPedido, mostrarQR } = props;
  const classes = useStyles();

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
              <Typography color="textSecondary" variant="h5">
                {mesa.sesion ? mesa.sesion.notificaciones ? mesa.sesion.notificaciones.map((notificacion) => {
                  return (
                    <div>{notificacion}</div>
                  )
                }) : "-" : "-"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => verPedido.onChange(mesa.sesion.id)} className={classes.boton} disabled={mesa.sesion ? false : true} variant="contained" color="primary">
              <Typography color="inherit" variant="h6">
                {"Ver pedido"}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.boton} disabled={mesa.sesion ? false : true} variant="contained" color="primary">
              <Typography color="inherit" variant="h6" onClick={ () => mostrarQR.onChange(mesa.id) }>
                {"Mostrar QR"}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.boton} variant="contained" color="primary">
              <Typography color="inherit" variant="h6">
                {mesa.sesion ? "desasignar" : "Asignar"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}