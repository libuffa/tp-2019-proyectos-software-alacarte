import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Switch } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import '../estilos.scss';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
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
}));

export default function CuerpoItemMozo(props) {
  const { itemCarta, disableFunction, estado } = props;
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} square className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} >
            <Typography variant="h4" color={estado ? "textPrimary" : "textSecondary"} >
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
            <Typography variant="h6" color={estado ? "textPrimary" : "textSecondary"}>
              {itemCarta.descripcion}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={9} >
            <Typography variant="h6" color={estado ? "textPrimary" : "textSecondary"}>
              Precio:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <div className="precio">
              <Typography variant="h6" color={estado ? "textPrimary" : "textSecondary"}>
                ${itemCarta.precioUnitario}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={9} >
            <Typography variant="h6" color={estado ? "textPrimary" : "textSecondary"}>
              Habilitado:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <div className="precio">
              <Switch onChange={() => disableFunction.onChange()} checked={estado} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}