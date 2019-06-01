package ar.unsam.pds.alacarte.domain.carta;

import java.util.ArrayList;
import java.util.List;
import org.eclipse.xtend.lib.annotations.Accessors;
import org.eclipse.xtext.xbase.lib.Pure;

@Accessors
@SuppressWarnings("all")
public class ItemCarta {
  private String titulo;
  
  private String descripcion;
  
  private Long categoria;
  
  private List<String> imagesURLs = new ArrayList<String>();
  
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
  public Long getCategoria() {
    return this.categoria;
  }
  
  public void setCategoria(final Long categoria) {
    this.categoria = categoria;
  }
  
  @Pure
  public List<String> getImagesURLs() {
    return this.imagesURLs;
  }
  
  public void setImagesURLs(final List<String> imagesURLs) {
    this.imagesURLs = imagesURLs;
  }
}
