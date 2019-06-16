export const ControllerDeSesion = {
  getSesionActiva: () => {
    return sessionStorage.getItem('userLoggedIn')
  },

  setSesionActiva: (sesion) => {
    sessionStorage.setItem('userLoggedIn', sesion)
  },

  cerrarSesionActiva: () => {
    sessionStorage.removeItem('userLoggedIn')
  }

}
