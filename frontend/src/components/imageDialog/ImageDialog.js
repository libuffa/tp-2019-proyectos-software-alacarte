import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

function SimpleDialog(props) {
  const { valor, imagen, onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <img src={valor} alt="" className="imagen" />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};

export default function ImageDialog(props) {
  const { imagen, abrir, cerrar } = props
  const [open, setOpen] = React.useState(abrir);

  const handleClose = () => {
    setOpen(false);
    cerrar.onChange()
  };

  return (
    <div>
      <SimpleDialog valor={imagen} open={open} onClose={handleClose} />
    </div>
  );
}