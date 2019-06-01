package ar.unsam.pds.alacarte.controller;

import ar.unsam.pds.alacarte.domain.carta.Categoria;
import ar.unsam.pds.alacarte.domain.carta.ItemCarta;
import ar.unsam.pds.alacarte.repository.Carta;
import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.server.Request;
import org.eclipse.xtend.lib.annotations.Accessors;
import org.eclipse.xtext.xbase.lib.Extension;
import org.eclipse.xtext.xbase.lib.Pure;
import org.uqbar.xtrest.api.Result;
import org.uqbar.xtrest.api.annotation.Controller;
import org.uqbar.xtrest.api.annotation.Get;
import org.uqbar.xtrest.json.JSONUtils;
import org.uqbar.xtrest.result.ResultFactory;

@Controller
@Accessors
@SuppressWarnings("all")
public class CartaController extends ResultFactory {
  @Extension
  private JSONUtils _jSONUtils = new JSONUtils();
  
  @Get("/carta/:categoria")
  public Result usuario(final String categoria, final String target, final Request baseRequest, final HttpServletRequest request, final HttpServletResponse response) {
    Result _xblockexpression = null;
    {
      final Categoria _categoria = Categoria.valueOf(categoria);
      final List<ItemCarta> items = Carta.getInstance().searchByCategoria(_categoria);
      _xblockexpression = ResultFactory.ok(this._jSONUtils.toJson(items));
    }
    return _xblockexpression;
  }
  
  public void handle(final String target, final Request baseRequest, final HttpServletRequest request, final HttpServletResponse response) throws IOException, ServletException {
    {
    	Matcher matcher = 
    		Pattern.compile("/carta/(\\w+)").matcher(target);
    	if (request.getMethod().equalsIgnoreCase("Get") && matcher.matches()) {
    		// take parameters from request
    		
    		// take variables from url
    		String categoria = matcher.group(1);
    		
            // set default content type (it can be overridden during next call)
            response.setContentType("application/json");
    		
    	    Result result = usuario(categoria, target, baseRequest, request, response);
    	    result.process(response);
    	    
    		response.addHeader("Access-Control-Allow-Origin", "*");
    	    baseRequest.setHandled(true);
    	    return;
    	}
    }
    //this.pageNotFound(baseRequest, request, response);
  }
  
  @Pure
  public JSONUtils get_jSONUtils() {
    return this._jSONUtils;
  }
  
  public void set_jSONUtils(final JSONUtils _jSONUtils) {
    this._jSONUtils = _jSONUtils;
  }
}
