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
  const imagenesPorDefecto = ["https://media.istockphoto.com/vectors/knife-plate-and-fork-cutlery-vector-retro-illustration-of-a-hand-vector-id871919954", "https://media.istockphoto.com/vectors/knife-plate-and-fork-cutlery-vector-retro-illustration-of-a-hand-vector-id871919954", "https://media.istockphoto.com/vectors/knife-plate-and-fork-cutlery-vector-retro-illustration-of-a-hand-vector-id871919954"];
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  if (imagenes.length === 0) {
    imagenes = imagenesPorDefecto;
  }

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} spacing={0} cols={1}>
        {imagenes.map((imagen) => (
          <GridListTile key={Math.random()} >
            <img onClick={openDialog} src={imagen} alt={imagen} />
            <div className="anulador">
              {open && <ImageDialog abrir={open} imagen={imagen} cerrar={{ onChange: closeDialog }} />}
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
