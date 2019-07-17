import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
  },
}));

export default function CuadroDeTexto(props) {
  const classes = useStyles();
  const { handlers, comentarioPrevio, disabled } = props;
  const [value, setValue] = React.useState({
    comentario: comentarioPrevio,
  });

  const handleChange = comentario => event => {
    if (event.target.value.length <= 250) {
      setValue({ ...value, [comentario]: event.target.value });
      handlers.onChange(event.target.value)
    }
  };

  return (
    <form className={classes.textField} autoComplete="off">
      <TextField
        id="comentario"
        disabled={disabled}
        value={value.comentario}
        onChange={handleChange('comentario')}
        multiline
        rows="4"
        placeholder="Ej: Sin Sal"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
}