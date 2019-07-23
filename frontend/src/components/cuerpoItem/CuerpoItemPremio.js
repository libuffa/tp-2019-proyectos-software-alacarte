import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CuadroDeTexto from '../../components/cuadroDeTexto/CuadroDeTexto.js';
import '../estilos.scss';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  divider: {
    padding: theme.spacing(2, 0),
  },
  paper: {
    height: '100%',
    padding: '8px',
    textAlign: 'center',
    fontSize: 30,
  },
  button: {
    height: '100%',
    padding: '5px',
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    width: '100%',
  },
}));

export default function CuerpoItemPremio(props) {
  const { itemCarta, handlersComentario, comentario, disabled } = props;
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} square className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} >
            <Typography variant="h4">
              {itemCarta.titulo}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography color="textSecondary" variant="h5" >
              {itemCarta.subCategoria.replace('_', ' ')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {itemCarta.descripcion}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Aclaración</Typography>
          </Grid>
          <Grid item xs={12}>
            <CuadroDeTexto disabled={disabled} comentarioPrevio={comentario} handlers={handlersComentario} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}