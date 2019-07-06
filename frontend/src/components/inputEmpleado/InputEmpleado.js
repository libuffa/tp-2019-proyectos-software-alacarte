import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  textField: {
    width: '100%',
  },
  input: {
    paddingTop: '5px',
    paddingBottom: '5px',
  }
});

export default function InputEmpleado(props) {
  const { type, placeholder, handlers, previo, disabled, atributo, maxLength } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState({
    input: previo,
  });

  const handleChange = input => event => {
    if (event.target.value.length <= maxLength) {
      setValue({ ...value, [input]: event.target.value });
      handlers.onChange(atributo, event.target.value)
    }
  };

  return (
    <form className={classes.textField} autoComplete="off">
      <TextField
        disabled={disabled}
        value={value.input}
        onChange={handleChange('input')}
        placeholder={placeholder}
        className={classes.input}
        variant="outlined"
        fullWidth
        type={type}
      />
    </form>
  );
}