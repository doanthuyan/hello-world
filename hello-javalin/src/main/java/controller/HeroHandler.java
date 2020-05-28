package controller;

import java.util.ArrayList;
import java.util.stream.Collectors;

import data.Hero;
import data.MockData;
import io.javalin.http.Context;
import io.javalin.plugin.openapi.annotations.HttpMethod;
import io.javalin.plugin.openapi.annotations.OpenApi;
import io.javalin.plugin.openapi.annotations.OpenApiContent;
import io.javalin.plugin.openapi.annotations.OpenApiParam;
import io.javalin.plugin.openapi.annotations.OpenApiRequestBody;
import io.javalin.plugin.openapi.annotations.OpenApiResponse;
public class HeroHandler {
	
	@OpenApi(
			path = "/heroes", 
			summary = "Get all heroes", 
			queryParams= {@OpenApiParam(name = "name", type = String.class, description = "The hero name")},
			tags = { "Hero" }, method = HttpMethod.GET,
			responses = { @OpenApiResponse(status = "200", content = @OpenApiContent(from = Hero[].class)) }

	)
	public void getAllHeroes(Context ctx) {
		String param = ctx.queryParam("name");
		if( param != null) {
			ctx.json(MockData.getInstance().getAllHeroes().stream()
			.filter(hero -> hero.getName().toLowerCase().indexOf(param.toLowerCase())>=0)
			.collect(Collectors.toList()));
		}else {
			ctx.json(MockData.getInstance().getAllHeroes());
		}
	}
	@OpenApi(
			path = "/heroes/:heroId", 
			summary = "Get hero with ID", 
			tags = { "Hero" },
			method = HttpMethod.GET,
			pathParams = {@OpenApiParam(name = "heroId", type = Integer.class, description = "The hero ID")},
			responses = { @OpenApiResponse(status = "200", content = @OpenApiContent(from = Hero[].class)) }

	)
	public void getHero(Context ctx) {
		Hero h = MockData.getInstance().getHero(validPathParamHeroId(ctx));
		if (h== null) {
			ctx.status(404);
		}else {	
			ctx.json(h);
		}
	}
	private int validPathParamHeroId(Context ctx) {
        return ctx.pathParam("heroId", Integer.class).check(id -> id > 0).get();
    }
	@OpenApi(
			path = "/heroes", 
			summary = "Update hero with ID", 
			tags = { "Hero" },
			method = HttpMethod.PUT,
			requestBody = @OpenApiRequestBody(content = {@OpenApiContent(from = Hero.class)}),
			responses = {
                    @OpenApiResponse(status = "204"),
                    @OpenApiResponse(status = "400", content = {@OpenApiContent(type = "String")}),
                    @OpenApiResponse(status = "404", content = {@OpenApiContent(type = "String")})
            }
	)
	public void updateHero(Context ctx) {
		
		Hero h = ctx.bodyAsClass(Hero.class);
		
		if(h == null) {
			ctx.status(400);
			return;
		}
		Hero data = MockData.getInstance().getHero(h.getId());
		if (data == null) {
			ctx.status(404);
			return;
		}
		data.update(h);
	}
	@OpenApi(
            summary = "Create hero",
            operationId = "createNewHero",
            path = "/heroes",
            method = HttpMethod.POST,
            tags = {"Hero"},
            requestBody = @OpenApiRequestBody(content = {@OpenApiContent(from = Hero.class)}),
            responses = {
                    @OpenApiResponse(status = "201" ),
                    @OpenApiResponse(status = "400", content = {@OpenApiContent(from = Hero.class)})
            }
    )
    public void createNewHero(Context ctx) {
		Hero h = ctx.bodyAsClass(Hero.class);
        MockData.getInstance().createNewHero(h);
        String locUrl = ctx.fullUrl() +"/"+h.getId();
        ctx.status(201);
        ctx.header("Location", locUrl);
        ctx.json(h);
    }
	@OpenApi(
			path = "/heroes/:heroId", 
			summary = "Delete hero with ID", 
			tags = { "Hero" },
			method = HttpMethod.DELETE,
			
			responses = {
                    @OpenApiResponse(status = "204"),
                    @OpenApiResponse(status = "400", content = {@OpenApiContent(type = "String")}),
                    @OpenApiResponse(status = "404", content = {@OpenApiContent(type = "String")})
            }
	)
	public void deleteHero(Context ctx) {
		
		Hero h = MockData.getInstance().getHero(validPathParamHeroId(ctx));
		
		if(h == null) {
			ctx.status(404);
			return;
		}
		MockData.getInstance().deleteHero(h);
		ctx.status(204);
	}
}
