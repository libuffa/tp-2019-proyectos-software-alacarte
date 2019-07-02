import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  },
}));

export default function InputSesion(props) {
  const classes = useStyles();
  const { handlerSesion } = props;
  const [value, setValue] = React.useState({
    sesion: "",
  });

  const handleChange = sesion => event => {
    setValue({ ...value, [sesion]: event.target.value });
    handlerSesion.onChange(event.target.value)
  };

  return (
    <form className={classes.textField} autoComplete="off">
      <TextField
        id="sesion"
        value={value.sesion}
        onChange={handleChange('sesion')}
        placeholder="Ej: 75"
        className={classes.textField}
        margin="none"
        variant="outlined"
      />
    </form>
  );
}