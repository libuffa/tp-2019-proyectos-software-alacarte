export const ControllerDeEmpleado = {
    getSesionActiva: () => {
      return sessionStorage.getItem('employeeLoggedIn')
    },
  
    setSesionActiva: (empleado) => {
      sessionStorage.setItem('employeeLoggedIn', empleado)
    },
  
  }