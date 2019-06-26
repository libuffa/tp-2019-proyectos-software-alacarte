import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';
import { Sidenav } from '../Sidenav/Sidenav';
// import { ServiceLocator } from '../../services/ServiceLocator';
// import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';



// async function getMenuEmpleado() {
//   if (ControllerDeEmpleado.getSesionActiva()) {
//     try {
//       const res = await ServiceLocator.EmpleadoService.getMenuEmpleado()
//       return res
//     } catch (error) {
//       console.error({ error })
//     }
//   }
// }

function Header(props) {
  const [open, setOpen] = React.useState(false);
  const { location, history, empleado, opcionesMenu } = props;

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
            A la Carte{" - " + pageName}
          </Typography>
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