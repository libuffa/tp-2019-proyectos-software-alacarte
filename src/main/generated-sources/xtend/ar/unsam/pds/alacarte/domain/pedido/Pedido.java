package ar.unsam.pds.alacarte.domain.pedido;

import ar.unsam.pds.alacarte.domain.carta.ItemCarta;
import ar.unsam.pds.alacarte.domain.pedido.Estado;
import org.eclipse.xtend.lib.annotations.Accessors;
import org.eclipse.xtext.xbase.lib.Pure;

@Accessors
@SuppressWarnings("all")
public class Pedido {
  private ItemCarta itemCarta;
  
  private Integer cantidad;
  
  private String comentarios;
  
  private Estado estado;
  
  @Pure
  public ItemCarta getItemCarta() {
    return this.itemCarta;
  }
  
  public void setItemCarta(final ItemCarta itemCarta) {
    this.itemCarta = itemCarta;
  }
  
  @Pure
  public Integer getCantidad() {
    return this.cantidad;
  }
  
  public void setCantidad(final Integer cantidad) {
    this.cantidad = cantidad;
  }
  
  @Pure
  public String getComentarios() {
    return this.comentarios;
  }
  
  public void setComentarios(final String comentarios) {
    this.comentarios = comentarios;
  }
  
  @Pure
  public Estado getEstado() {
    return this.estado;
  }
  
  public void setEstado(final Estado estado) {
    this.estado = estado;
  }
}
