import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import './CuerpoItemCocina.scss';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  divider: {
    padding: theme.spacing(1, 0),
  },
  paper: {
    height: '100%',
    padding: '8px',
    textAlign: 'center',
    fontSize: 30,
  },
  separadorTextos: {
    padding: theme.spacing(0, 1),
  },
  cantidad: {
    padding: theme.spacing(1, 0),
    display: 'flex',
  },
  aclaracion: {
    padding: theme.spacing(1, 0),
    display: 'flex',
    border: '1px',
  },
}));

export default function CuerpoItemCocina(props) {
  const { itemCarta, cantidad, comentario } = props;
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} square className={classes.root}>
        <Grid container spacing={0}>
          <div className="titulos" >
            <Grid item xs={12} >
              <Typography variant="h4">
                {itemCarta.titulo}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="h5" >
                {itemCarta.subCategoria.replace('_', ' ')}
              </Typography>
            </Grid>
          </div>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
          <Grid item xs={12} >
            <div className="cantidad">
              <Typography variant="h5">
                {"Cantidad:  "}
              </Typography>
              <Typography className={classes.separadorTextos} color="textSecondary" variant="h5">
                {cantidad}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="aclaracion">
              <Typography variant="h5" >
                {"Aclaración:  "}
              </Typography>
              <Typography className={classes.separadorTextos} color="textSecondary" variant="h5" >
                {comentario ? comentario : "-"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="divider" />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}