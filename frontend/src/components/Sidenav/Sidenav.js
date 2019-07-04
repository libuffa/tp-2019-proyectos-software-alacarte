import React from 'react'
import { Typography, Drawer, List, ListItem, AppBar, Divider, ListItemAvatar, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonPin'
import CartIcon from '@material-ui/icons/LocalLibrary';
import PedidoIcon from '@material-ui/icons/RestaurantMenu';
import MesaIcon from '@material-ui/icons/Layers';
import Lock from '@material-ui/icons/Lock'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import '../estilos.scss'
import { ControllerDeEmpleado } from '../../controller/ControllerDeEmpleado';
import DialogConfirmacion from '../Dialog/DialogConfirmacion';
import { ServiceLocator } from '../../services/ServiceLocator';

export function Sidenav(props) {
  const { open, history, handlers, empleado, opcionesMenu } = props;
  const [openDialog, setOpenDialog] = React.useState(false);

  function handleClickOpen() {
    setOpenDialog(true);
  }

  const handleClose = value => {
    setOpenDialog(false);
  };

  const optionSwitch = (opcionesMenu) => {
    if (opcionesMenu) {
      switch (opcionesMenu) {
        case 'carta':
          return {
            onClick: '/carta',
            description: 'Carta',
            icon: (<CartIcon fontSize="large" color="primary" />)
          }
        case 'pedidos':
          return {
            onClick: '/pedido/cocina',
            description: 'Pedidos',
            icon: (<PedidoIcon fontSize="large" color="primary" />)
          }
        case 'mesas':
          return {
            onClick: '/mesas',
            description: 'Mesas',
            icon: (<MesaIcon fontSize="large" color="primary" />)
          }
        case 'administrar_mesas':
          return {
            onClick: '/mesas/admin',
            description: 'Administrar Mesas',
            icon: (<MesaIcon fontSize="large" color="primary" />)
          }
        case 'empleados':
          return {
            onClick: '/empleados',
            description: 'Empleados',
            icon: (<PersonIcon fontSize="large" color="primary" />)
          }
        default:
          return {
            onClick: '/carta',
            description: 'Carta',
            icon: (<CartIcon fontSize="large" color="primary" />)
          }
      }
    }
  }

  const logOut = () => {
    ControllerDeEmpleado.cerrarSesionActiva()
    ServiceLocator.EmpleadoService.cerrarSesion({ idEmpleado: empleado.id })
    window.location.reload();
  }

  return (
    <div>
      <Drawer open={open} onClose={handlers.onChange}>
        <div tabIndex={0} role="button" onClick={handlers.onChange}>
          <div className="side-nav">
            <AppBar position="static">
              <br />
              <ListItem>
                <ListItemAvatar>
                  <PersonIcon fontSize="large" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography color="inherit" variant="body2" gutterBottom >
                      {((empleado) && empleado.nombre) + ' ' + ((empleado) && empleado.apellido)}
                    </Typography>
                  }
                />
              </ListItem>
              <br />
            </AppBar>
            <List>
              {(opcionesMenu) && opcionesMenu.map((opcion) => {
                const menu = optionSwitch(opcion)
                return (
                  <div key={menu.description}>
                    <ListItem button onClick={() => history.push(menu.onClick)}>
                      <ListItemAvatar>
                        {menu.icon}
                      </ListItemAvatar>
                      <ListItemText primary={
                        <Typography variant="subtitle2" color="primary">
                          {menu.description}
                        </Typography>
                      } />
                    </ListItem>
                  </div>
                )
              })}
            </List>
          </div>
          <footer >
            <Divider />
            <List>
              <ListItem button onClick={() => history.push('/cambiar/contraseña')}>
                <ListItemAvatar>
                  <Lock fontSize="large" />
                </ListItemAvatar>
                <ListItemText primary={
                  <Typography variant="subtitle2">
                    {" Cambiar Contraseña"}
                  </Typography>}
                />
              </ListItem>
              <ListItem button onClick={handleClickOpen}>
                <ListItemAvatar>
                  <PowerSettingsNew fontSize="large" />
                </ListItemAvatar>
                <ListItemText primary={
                  <Typography variant="subtitle2">
                    {" Cerrar Sesión"}
                  </Typography>}
                />
              </ListItem>
            </List>
          </footer>
        </div>
      </Drawer>
      <DialogConfirmacion
        titulo={"Cerrar sesión"}
        descripcion={"¿Estas seguro que deseas cerrar tu sesión?"}
        handlers={{ onChange: logOut, open: handleClose }}
        open={openDialog}
      />
    </div>

  );
};
