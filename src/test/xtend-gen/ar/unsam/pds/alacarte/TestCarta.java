package ar.unsam.pds.alacarte;

import ar.unsam.pds.alacarte.domain.carta.Carta;
import ar.unsam.pds.alacarte.domain.carta.ItemCarta;
import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("all")
public class TestCarta {
  private final ItemCarta milanesa /* Skipped initializer because of errors */;
  
  @Test
  public void probarClubDeLaPelea() {
    Assert.assertEquals(1, Carta.getInstance().getItemsCarta().size());
  }
}
