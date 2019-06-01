package ar.unsam.pds.alacarte.domain.empleado;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import org.eclipse.xtend.lib.annotations.Accessors;
import org.eclipse.xtext.xbase.lib.Pure;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Accessors
@SuppressWarnings("all")
public abstract class Empleado {
  @Id
  @GeneratedValue
  private Long id;
  
  @Column(name = "Usuario")
  private String nombreUsuario;
  
  @Column(length = 100)
  private String contraseña;
  
  @Column(length = 100)
  private String email;
  
  @Column(length = 100)
  private String nombre;
  
  @Column(length = 100)
  private String apellido;
  
  @Pure
  public Long getId() {
    return this.id;
  }
  
  public void setId(final Long id) {
    this.id = id;
  }
  
  @Pure
  public String getNombreUsuario() {
    return this.nombreUsuario;
  }
  
  public void setNombreUsuario(final String nombreUsuario) {
    this.nombreUsuario = nombreUsuario;
  }
  
  @Pure
  public String getContraseña() {
    return this.contraseña;
  }
  
  public void setContraseña(final String contraseña) {
    this.contraseña = contraseña;
  }
  
  @Pure
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(final String email) {
    this.email = email;
  }
  
  @Pure
  public String getNombre() {
    return this.nombre;
  }
  
  public void setNombre(final String nombre) {
    this.nombre = nombre;
  }
  
  @Pure
  public String getApellido() {
    return this.apellido;
  }
  
  public void setApellido(final String apellido) {
    this.apellido = apellido;
  }
}
