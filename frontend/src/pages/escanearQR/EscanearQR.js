import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(false);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Card>
      <CardHeader title="Escanea el código QR para poder empezar a pedir!"/>
      <CardMedia className={classes.media} image={value}/>
      <CardActions><input value={value} onChange={handleChange} type="file" name="foto" id="foto" class="SubirFoto" accept="image/*" capture="camera" /></CardActions>
    </Card>
  );
}