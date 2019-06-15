import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';
import { Sidenav } from '../Sidenav/Sidenav';
import { ServiceLocator } from '../../services/ServiceLocator';

function getEmpleado(id) {
  ServiceLocator.EmpleadoService.getEmpleado(id)
    .then((empleado) => {
        return empleado
      })
      .catch((error) => { return error })
}

function getMenuEmpleado(id) {
  ServiceLocator.EmpleadoService.getMenuEmpleado(id)
    .then((menu) => {
        return menu
      })
      .catch((error) => { return error })
}

function Header(props) {
  const [open, setOpen] = React.useState(false);
  const { location, history } = props;

  let pageName = location.pathname.replace(/\//g, '').toLowerCase();
  pageName = pageName.replace(/[0-9]/g, '').toLowerCase();
  if (pageName.length > 0)
    pageName = pageName[0].toUpperCase() + pageName.substr(1);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className="menuButton"
            color="inherit"
            aria-label="Menu"
            onClick={handleClickOpen}>
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6">
            A la Carte{" - " + pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidenav open={open} history={history} handlers={{ onChange: handleClose }} />
    </div>
  );
};

export default withRouter(Header);