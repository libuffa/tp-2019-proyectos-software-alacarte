import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
  },
}));

export default function OutlinedTextFields(props) {
  const classes = useStyles();
  const { handlers } = props;
  const [value, setValue] = React.useState({
    comentario: "",
  });

  const handleChange = comentario => event => {
    setValue({ ...value, [comentario]: event.target.value });
    handlers.onChange(event.target.value)
  };

  return (
    <form className={classes.textField} autoComplete="off">
      <TextField
        id="comentario"
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