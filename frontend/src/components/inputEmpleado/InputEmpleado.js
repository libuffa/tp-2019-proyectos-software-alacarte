import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
  const { type, help, handlers, previo, disabled, atributo, maxLength, label } = props;
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
      <FormControl className={classes.formControl} fullWidth >
        <InputLabel htmlFor="component-helper">{label}</InputLabel>
        <Input
          value={value}
          onChange={handleChange}
          aria-describedby="component-helper-text"
          disabled={disabled}
          type={type}
        />
        <FormHelperText id="component-helper-text">{help}</FormHelperText>
      </FormControl>
    </div>
  );
}