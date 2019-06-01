package ar.unsam.pds.alacarte.domain.carta;

import ar.unsam.pds.alacarte.domain.carta.ItemCarta;
import java.util.ArrayList;
import java.util.List;
import org.eclipse.xtend.lib.annotations.Accessors;
import org.eclipse.xtext.xbase.lib.Pure;

@Accessors
@SuppressWarnings("all")
public class Carta {
  private static Carta instance;
  
  private static final Long PLATO_PRINCIPAL = new Long(1);
  
  private Carta() {
  }
  
  public static Carta getInstance() {
    Carta _xifexpression = null;
    if ((Carta.instance == null)) {
      Carta _carta = new Carta();
      _xifexpression = Carta.instance = _carta;
    } else {
      _xifexpression = Carta.instance;
    }
    return _xifexpression;
  }
  
  private List<ItemCarta> itemsCarta = new ArrayList<ItemCarta>();
  
  @Pure
  public List<ItemCarta> getItemsCarta() {
    return this.itemsCarta;
  }
  
  public void setItemsCarta(final List<ItemCarta> itemsCarta) {
    this.itemsCarta = itemsCarta;
  }
}
