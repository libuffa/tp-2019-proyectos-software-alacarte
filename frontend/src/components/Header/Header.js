import React from 'react'
import '../estilos.scss';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import { Sidenav } from '../Sidenav/Sidenav';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Notifications from '@material-ui/icons/Notifications';
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';
import { ControllerDeSesion } from '../../controller/ControllerDeSesion';

function Header(props) {
  const [open, setOpen] = React.useState(false);
  const { location, history, empleado, opcionesMenu } = props;

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  function irALogin() {
    if (!location.pathname.includes("login")) {
      history.push('/login');
    } else {
      history.push('/escanear/qr');
    }
  }

  function irAMesas() {
    history.push('/mesas');
  }

  return (
    <div>
      <AppBar elevation={0} position="static">
        <Toolbar>
          {
            (opcionesMenu) &&
            (<IconButton
              className="menuButton"
              color="inherit"
              aria-label="Menu"
              onClick={handleClickOpen}>
              <MenuIcon />
            </IconButton>)
          }
          <Typography className="title" variant="h6">
            À la carte
          </Typography>
          {
            !ControllerDeEmpleado.getSesionActiva() &&
            !ControllerDeSesion.getSesionActiva() &&
            <IconButton edge="end" color="inherit" onClick={() => irALogin()}>
              <AccountCircle />
            </IconButton>
          }
          {
            empleado &&
            empleado.tipoEmpleado === "Mozo" &&
            <IconButton edge="end" color={empleado.notificaciones ? "secondary" : "inherit"} onClick={() => irAMesas()}>
              <Notifications />
            </IconButton>
          }
        </Toolbar>
      </AppBar>
      <Sidenav
        open={open}
        history={history}
        handlers={{ onChange: handleClose }}
        empleado={empleado}
        opcionesMenu={opcionesMenu} />
    </div>
  );
};

export default withRouter(Header);