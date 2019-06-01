package ar.unsam.pds.alacarte.runnable;

import ar.unsam.pds.alacarte.domain.carta.Categoria;
import ar.unsam.pds.alacarte.domain.carta.ItemCarta;
import ar.unsam.pds.alacarte.repository.Carta;
import java.util.Collections;
import org.eclipse.xtext.xbase.lib.CollectionLiterals;
import org.eclipse.xtext.xbase.lib.ObjectExtensions;
import org.eclipse.xtext.xbase.lib.Procedures.Procedure1;
import org.uqbar.arena.bootstrap.CollectionBasedBootstrap;

@SuppressWarnings("all")
public class ALaCarteBootstrap extends CollectionBasedBootstrap {
  private ItemCarta antiPasto;
  
  private ItemCarta milanesa;
  
  private ItemCarta pizza;
  
  public void run() {
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
        it.setImagenes(Collections.<String>unmodifiableList(CollectionLiterals.<String>newArrayList("https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg")));
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
}
