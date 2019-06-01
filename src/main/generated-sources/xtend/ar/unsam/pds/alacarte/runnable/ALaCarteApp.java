package ar.unsam.pds.alacarte.runnable;

import ar.unsam.pds.alacarte.controller.CartaController;
import ar.unsam.pds.alacarte.runnable.ALaCarteBootstrap;
import org.uqbar.xtrest.api.XTRest;

@SuppressWarnings("all")
public class ALaCarteApp {
  public static void main(final String[] args) {
    new ALaCarteBootstrap().run();
    XTRest.start(9000, CartaController.class);
  }
}
