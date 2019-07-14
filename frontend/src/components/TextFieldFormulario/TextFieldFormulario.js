import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TextField, InputLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(0.8, 0),
  },
}));

export default function InputEmpleado(props) {
  const { type, help, handlers, previo, disabled, atributo, maxLength, label, error } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(previo);

  function handleChange(event) {
    if (event.target.value.length <= maxLength) {
      setValue(event.target.value);
      handlers.onChange(atributo, event.target.value)
    }
  }

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl} fullWidth error={error ? error : false}>
        <InputLabel htmlFor="component-helper">{label}</InputLabel>
        <TextField
            id="descripcion"
            value={value}
            onChange={handleChange}
            multiline
            rows="4"
            placeholder="Ingresar comentarios"
            margin="normal"
            variant="outlined"
            disabled={disabled}
            type={type}
        />
        <FormHelperText id="component-helper-text">{help}</FormHelperText>
      </FormControl>
    </div>
  );
}