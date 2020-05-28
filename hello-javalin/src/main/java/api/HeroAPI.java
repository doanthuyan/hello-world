package api;

import controller.HeroHandler;
import io.javalin.Javalin;
import io.javalin.plugin.openapi.OpenApiOptions;
import io.javalin.plugin.openapi.OpenApiPlugin;
import io.javalin.plugin.openapi.ui.SwaggerOptions;
import io.swagger.v3.oas.models.info.Info;


public class HeroAPI {
	public static void main(String[] args) {
		HeroHandler  heroController = new HeroHandler();
        Javalin app = Javalin.create(
        	config ->{
        		config.addStaticFiles("public");
        		config.enableCorsForAllOrigins();
        		config.registerPlugin(new OpenApiPlugin(getOpenApiOptions()));
        	}).start(7000);
        
        app.get("/", ctx -> ctx.result("Hello Hero World"));
        app.get("/heroes", ctx -> {heroController.getAllHeroes(ctx);});
        app.get("/heroes/:heroId", ctx -> {heroController.getHero(ctx);});
        app.put("/heroes", ctx -> {heroController.updateHero(ctx);});
        app.post("/heroes", ctx -> {heroController.createNewHero(ctx);});
        app.delete("/heroes/:heroId", ctx -> {heroController.deleteHero(ctx);});
        
    }
	private static OpenApiOptions getOpenApiOptions() {
	    Info applicationInfo = new Info()
	        .version("1.0")
	        .description("mock API for Angular hero app");
	    return new OpenApiOptions(applicationInfo).path("/swagger-docs")
	    		.swagger(new SwaggerOptions("/swagger").title("My Swagger Documentation"));
	}
}
