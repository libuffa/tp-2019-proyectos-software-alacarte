import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(0.8, 0),
    minWidth: 120,
  },
}));

export default function SelectorPuesto(props) {
  const { help, handlers, previo, disabled, atributo, label } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(previo);

  function handleChange(event) {
    setValue(event.target.value);
    handlers.onChange(atributo, event.target.value)
  }

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor="age-simple">{label}</InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          inputProps={{
            name: 'puesto',
          }}
          disabled={disabled}
          fullWidth
          defaultValue={1}
          defaultChecked={1}
        >
          <MenuItem value={""}>-</MenuItem>
          <MenuItem value={"Administrador"}>Administrador</MenuItem>
          <MenuItem value={"Mozo"}>Mozo</MenuItem>
          <MenuItem value={"Cocinero"}>Cocinero</MenuItem>
        </Select>
        <FormHelperText id="component-helper-text">{help}</FormHelperText>
      </FormControl>
    </div>
  );
}