import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ImageDialog from '../imageDialog/ImageDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
}));

export default function PasadorDeImagenes(props) {
  var { imagenes } = props;
  const classes = useStyles();
  const imagenesPorDefecto = ["/imagenes/default.jpg"];
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState("");

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  function seleccionarImagen(imagen) {
    setImage(imagen);
    openDialog();
  }

  if (imagenes.length === 0) {
    imagenes = imagenesPorDefecto;
  }

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} spacing={0} cols={1}>
        {imagenes.map((imagen) => (
          <GridListTile key={Math.random()} >
            <img onClick={() => seleccionarImagen(imagen)} src={imagen} alt={imagen} />
          </GridListTile>
        ))}
      </GridList>
      <div className="anulador">
        {open && <ImageDialog abrir={open} imagen={image} cerrar={{ onChange: closeDialog }} />}
      </div>
    </div>
  );
}
