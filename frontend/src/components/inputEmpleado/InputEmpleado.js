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
  const { type, help, handlers, previo, disabled, atributo, maxLength, label, error } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(previo);

  function handleChange(event) {
    if (type === "number") {
      const num = event.target.value.slice(-1)[0]
      if (event.target.value.length <= maxLength) {
        if ((["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(num) && event.target.value >= 0) || event.target.value === "") {
          setValue(event.target.value);
          handlers.onChange(atributo, event.target.value)
        }
      }
    } else {
      if (event.target.value.length <= maxLength) {
        setValue(event.target.value);
        handlers.onChange(atributo, event.target.value)
      }
    }
  }

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl} fullWidth error={error ? error : false}>
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