package ar.unsam.pds.alacarte;

import ar.unsam.pds.alacarte.domain.carta.Categoria;
import ar.unsam.pds.alacarte.domain.carta.ItemCarta;
import ar.unsam.pds.alacarte.repository.Carta;
import java.util.List;
import org.eclipse.xtext.xbase.lib.Functions.Function1;
import org.eclipse.xtext.xbase.lib.InputOutput;
import org.eclipse.xtext.xbase.lib.ListExtensions;
import org.eclipse.xtext.xbase.lib.ObjectExtensions;
import org.eclipse.xtext.xbase.lib.Procedures.Procedure1;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

@SuppressWarnings("all")
public class TestCarta {
  private ItemCarta antiPasto;
  
  private ItemCarta milanesa;
  
  private ItemCarta pizza;
  
  @Before
  public void init() {
    ItemCarta _itemCarta = new ItemCarta();
    final Procedure1<ItemCarta> _function = new Procedure1<ItemCarta>() {
      public void apply(final ItemCarta it) {
        it.setTitulo("Antipasto");
        it.setDescripcion("Quesito, salame y otros");
        it.setCategoria(Categoria.Entrada);
        it.setPrecioUnitario(Double.valueOf(Integer.valueOf(80).doubleValue()));
        it.setHabilitado(Boolean.valueOf(true));
      }
    };
    ItemCarta _doubleArrow = ObjectExtensions.<ItemCarta>operator_doubleArrow(_itemCarta, _function);
    this.antiPasto = _doubleArrow;
    ItemCarta _itemCarta_1 = new ItemCarta();
    final Procedure1<ItemCarta> _function_1 = new Procedure1<ItemCarta>() {
      public void apply(final ItemCarta it) {
        it.setTitulo("Milanesa con fritas");
        it.setDescripcion("Lomo empanada con papas a la francesa");
        it.setCategoria(Categoria.PlatoPrincipal);
        it.setPrecioUnitario(Double.valueOf(Integer.valueOf(100).doubleValue()));
        it.setHabilitado(Boolean.valueOf(true));
      }
    };
    ItemCarta _doubleArrow_1 = ObjectExtensions.<ItemCarta>operator_doubleArrow(_itemCarta_1, _function_1);
    this.milanesa = _doubleArrow_1;
    ItemCarta _itemCarta_2 = new ItemCarta();
    final Procedure1<ItemCarta> _function_2 = new Procedure1<ItemCarta>() {
      public void apply(final ItemCarta it) {
        it.setTitulo("Pizza de muzzarella");
        it.setDescripcion("Pizza con tomate y queso muzzarella");
        it.setCategoria(Categoria.PlatoPrincipal);
        it.setPrecioUnitario(Double.valueOf(Integer.valueOf(300).doubleValue()));
        it.setHabilitado(Boolean.valueOf(true));
      }
    };
    ItemCarta _doubleArrow_2 = ObjectExtensions.<ItemCarta>operator_doubleArrow(_itemCarta_2, _function_2);
    this.pizza = _doubleArrow_2;
    Carta.getInstance().create(this.antiPasto);
    Carta.getInstance().create(this.milanesa);
    Carta.getInstance().create(this.pizza);
  }
  
  @Test
  public void probarTamanioCarta() {
    Assert.assertEquals(1, Carta.getInstance().allInstances().size());
  }
  
  @Test
  public void probarPrecioMilanesa() {
    Assert.assertEquals(100, (Carta.getInstance().searchById(1).getPrecioUnitario()).doubleValue(), 0.01);
  }
  
  @Test
  public void probarPedirPedido() {
    Assert.assertEquals(
      "Sin sal por favor", 
      Carta.getInstance().searchById(1).pedirItem(Integer.valueOf(2), "Sin sal por favor").getComentarios());
  }
  
  @Test
  public void probarSearchByCategoria() {
    final List<ItemCarta> carta = Carta.getInstance().searchByCategoria(Categoria.PlatoPrincipal);
    InputOutput.<List<ItemCarta>>println(carta);
    final Function1<ItemCarta, Categoria> _function = new Function1<ItemCarta, Categoria>() {
      public Categoria apply(final ItemCarta item) {
        return item.getCategoria();
      }
    };
    Assert.assertEquals(Categoria.PlatoPrincipal, ListExtensions.<ItemCarta, Categoria>map(carta, _function).get(0));
  }
}
