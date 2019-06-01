package ar.unsam.pds.alacarte.repository;

import ar.unsam.pds.alacarte.domain.carta.Categoria;
import ar.unsam.pds.alacarte.domain.carta.ItemCarta;
import ar.unsam.pds.alacarte.repository.AbstractRepo;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Root;
import org.eclipse.xtend.lib.annotations.Accessors;

@Accessors
@SuppressWarnings("all")
public class Carta extends AbstractRepo<ItemCarta> {
  private static Carta instance;
  
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
  
  public Class<ItemCarta> getEntityType() {
    return ItemCarta.class;
  }
  
  public void generateWhere(final CriteriaBuilder criteria, final CriteriaQuery<ItemCarta> query, final Root<ItemCarta> campos, final ItemCarta t) {
    String _titulo = t.getTitulo();
    boolean _tripleNotEquals = (_titulo != null);
    if (_tripleNotEquals) {
      query.where(criteria.equal(campos.<Object>get("titulo"), t.getTitulo()));
    }
  }
  
  public ItemCarta searchById(final long _id) {
    ItemCarta _xblockexpression = null;
    {
      final EntityManager entityManager = this.generateEntityManager();
      ItemCarta _xtrycatchfinallyexpression = null;
      try {
        ItemCarta _xblockexpression_1 = null;
        {
          final CriteriaBuilder criteria = entityManager.getCriteriaBuilder();
          final CriteriaQuery<ItemCarta> query = criteria.<ItemCarta>createQuery(this.getEntityType());
          final Root<ItemCarta> camposItemCarta = query.<ItemCarta>from(this.getEntityType());
          camposItemCarta.<Object, Object>fetch("imagenes", JoinType.LEFT);
          query.select(camposItemCarta);
          query.where(criteria.equal(camposItemCarta.<Object>get("id"), Long.valueOf(_id)));
          _xblockexpression_1 = entityManager.<ItemCarta>createQuery(query).getSingleResult();
        }
        _xtrycatchfinallyexpression = _xblockexpression_1;
      } finally {
        if (entityManager!=null) {
          entityManager.close();
        }
      }
      _xblockexpression = _xtrycatchfinallyexpression;
    }
    return _xblockexpression;
  }
  
  public List<ItemCarta> searchByCategoria(final Categoria categoria) {
    List<ItemCarta> _xblockexpression = null;
    {
      final EntityManager entityManager = this.generateEntityManager();
      List<ItemCarta> _xtrycatchfinallyexpression = null;
      try {
        List<ItemCarta> _xblockexpression_1 = null;
        {
          final CriteriaBuilder criteria = entityManager.getCriteriaBuilder();
          final CriteriaQuery<ItemCarta> query = criteria.<ItemCarta>createQuery(this.getEntityType());
          final Root<ItemCarta> camposItemCarta = query.<ItemCarta>from(this.getEntityType());
          camposItemCarta.<Object, Object>fetch("imagenes", JoinType.LEFT);
          query.select(camposItemCarta);
          query.where(criteria.equal(camposItemCarta.<Object>get("categoria"), categoria));
          _xblockexpression_1 = entityManager.<ItemCarta>createQuery(query).getResultList();
        }
        _xtrycatchfinallyexpression = _xblockexpression_1;
      } finally {
        if (entityManager!=null) {
          entityManager.close();
        }
      }
      _xblockexpression = _xtrycatchfinallyexpression;
    }
    return _xblockexpression;
  }
}
