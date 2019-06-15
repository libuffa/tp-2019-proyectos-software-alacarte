export const ControllerDeSesion = {
  getSesionActiva: () => {
    return sessionStorage.getItem('userLoggedIn')
  },

  getSesionEmpleadoActiva: () => {
    return sessionStorage.getItem('employeeLoggedIn')
  },

  setSesionActiva: (sesion) => {
    sessionStorage.setItem('userLoggedIn', sesion)
  },

  setSesionEmpleadoActiva: (empleado) => {
    sessionStorage.setItem('employeeLoggedIn', empleado)
  },

}
