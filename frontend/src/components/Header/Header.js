import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';
import { Sidenav } from '../Sidenav/Sidenav';
import { ServiceLocator } from '../../services/ServiceLocator';

function getEmpleado() {
  ServiceLocator.EmpleadoService.getEmpleado()
    .then((empleado) => {
      return empleado
    })
    .catch((error) => { return error })
}

function getMenuEmpleado() {
  ServiceLocator.EmpleadoService.getMenuEmpleado()
    .then((opcionesMenu) => {
      return opcionesMenu
    })
    .catch((error) => { return error })
}

function Header(props) {
  const [open, setOpen] = React.useState(false);
  const { location, history, sidenav } = props;
  const [state, setState] = React.useState({
    empleado: getEmpleado(),
    opcionesMenu:  getMenuEmpleado(),
    open: false,
  });

  // if(sidenav) {
  //   setState({
  //     empleado: getEmpleado(),
  //     opcionesMenu: getMenuEmpleado()
  //   })
  // }

  let pageName = location.pathname.replace(/\//g, ' ').toLowerCase();
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
          {(sidenav) &&
            (<IconButton
              className="menuButton"
              color="inherit"
              aria-label="Menu"
              onClick={handleClickOpen}>
              <MenuIcon empleado={state.empleado} opcionesMenu={state.opcionesMenu} />
            </IconButton>)
          }
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