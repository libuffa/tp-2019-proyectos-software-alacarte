package ar.unsam.pds.alacarte.domain.carta;

import ar.unsam.pds.alacarte.domain.carta.Categoria;
import ar.unsam.pds.alacarte.domain.pedido.Estado;
import ar.unsam.pds.alacarte.domain.pedido.Pedido;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import org.eclipse.xtend.lib.annotations.Accessors;
import org.eclipse.xtext.xbase.lib.ObjectExtensions;
import org.eclipse.xtext.xbase.lib.Procedures.Procedure1;
import org.eclipse.xtext.xbase.lib.Pure;

@Entity
@Accessors
@SuppressWarnings("all")
public class ItemCarta {
  @Id
  @GeneratedValue
  private Long id;
  
  @Column(length = 50)
  private String titulo;
  
  @Column(length = 100)
  private String descripcion;
  
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private Categoria categoria;
  
  @Column
  private Double precioUnitario;
  
  @Column
  private Boolean habilitado;
  
  @ElementCollection
  @CollectionTable(name = "imagenes", joinColumns = @JoinColumn(name = "itemCarta_Id"))
  @Column(name = "imagenes")
  private List<String> imagenes = new ArrayList<String>();
  
  public Pedido pedirItem(final Integer cantidad, final String comentarios) {
    Pedido _pedido = new Pedido();
    final Procedure1<Pedido> _function = new Procedure1<Pedido>() {
      public void apply(final Pedido it) {
        it.setItemCarta(ItemCarta.this);
        it.setCantidad(cantidad);
        it.setComentarios(comentarios);
        it.setEstado(Estado.Creado);
      }
    };
    return ObjectExtensions.<Pedido>operator_doubleArrow(_pedido, _function);
  }
  
  @Pure
  public Long getId() {
    return this.id;
  }
  
  public void setId(final Long id) {
    this.id = id;
  }
  
  @Pure
  public String getTitulo() {
    return this.titulo;
  }
  
  public void setTitulo(final String titulo) {
    this.titulo = titulo;
  }
  
  @Pure
  public String getDescripcion() {
    return this.descripcion;
  }
  
  public void setDescripcion(final String descripcion) {
    this.descripcion = descripcion;
  }
  
  @Pure
  public Categoria getCategoria() {
    return this.categoria;
  }
  
  public void setCategoria(final Categoria categoria) {
    this.categoria = categoria;
  }
  
  @Pure
  public Double getPrecioUnitario() {
    return this.precioUnitario;
  }
  
  public void setPrecioUnitario(final Double precioUnitario) {
    this.precioUnitario = precioUnitario;
  }
  
  @Pure
  public Boolean getHabilitado() {
    return this.habilitado;
  }
  
  public void setHabilitado(final Boolean habilitado) {
    this.habilitado = habilitado;
  }
  
  @Pure
  public List<String> getImagenes() {
    return this.imagenes;
  }
  
  public void setImagenes(final List<String> imagenes) {
    this.imagenes = imagenes;
  }
}
