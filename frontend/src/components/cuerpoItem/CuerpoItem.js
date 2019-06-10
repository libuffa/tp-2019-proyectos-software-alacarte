import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider, FormControl } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import './CuerpoItem.scss';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
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

export default function CuerpoItem(props) {
  const { itemCarta, cantidad, handlersCantidad, handlersComentario } = props;
  const classes = useStyles();

  const [value, setValue] = React.useState("");

  function handleChange(event, newValue) {
    console.log("Se va a mandar a guardar el texto: " + String(newValue))
    setValue(newValue);
    handlersComentario.onChange(newValue)
  }

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
            <Typography variant="h5" >
              {itemCarta.subCategoria.replace('_', ' ')}
            </Typography>
          </Grid>
          <Grid className={classes.divider} item xs={12}><Divider variant="fullWidth"></Divider></Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {itemCarta.descripcion}
            </Typography>
          </Grid>
          <Grid className={classes.divider} item xs={12}><Divider variant="fullWidth"></Divider></Grid>
          <Grid item xs={9} >
            <Typography variant="h6">
              Precio:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <div className="precio">
              <Typography variant="h6">
                ${itemCarta.precioUnitario}
              </Typography>
            </div>
          </Grid>
          <Grid className={classes.divider} item xs={12}><Divider variant="fullWidth"></Divider></Grid>
          <Grid item xs={4}>
            <Paper elevation={0} className={classes.button}>
              <Fab disabled={cantidad === 1 ? true : false} color="secondary" onClick={() => handlersCantidad.onChange(-1)}>
                <Typography variant="h5">-</Typography>
              </Fab>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} className={classes.paper}>{cantidad}</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} className={classes.button}>
              <Fab color="primary" onClick={() => handlersCantidad.onChange(1)}>
                <Typography variant="h5">+</Typography>
              </Fab>
            </Paper>
          </Grid>
          <Grid className={classes.divider} item xs={12}><Divider variant="fullWidth"></Divider></Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Aclaración</Typography>
          </Grid>
          <Grid className={classes.divider} item xs={12}>
            <FormControl fullWidth noValidate autoComplete="off">
              <TextField
                id="comentario"
                multiline
                rows={4}
                placeholder="Ej: Sin Sal"
                value={value}
                onChange={handleChange}
                className={classes.text}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}