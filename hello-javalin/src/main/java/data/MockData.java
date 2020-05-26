package data;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class MockData {
	private static MockData mock;
	private ArrayList<Hero> mockHeroes;
	private DateTimeFormatter  dateFormatter;
	private int sequence = 1;

	public static MockData getInstance() {
		if (mock == null) {
			mock = new MockData();
		}
		return mock;
	}

	private MockData() {
		dateFormatter = DateTimeFormatter.ofPattern ("dd/MM/yyyy");
		mockHeroes = new ArrayList<Hero>();

		mockHeroes.add(new Hero(sequence ++, "Hydra", LocalDate.parse("12/12/1980", dateFormatter)));
		mockHeroes.add(new Hero(sequence ++, "Aquaman", LocalDate.parse("12/12/1981", dateFormatter)));
		mockHeroes.add(new Hero(sequence ++, "Antman", LocalDate.parse("01/01/1982", dateFormatter)));
		mockHeroes.add(new Hero(sequence ++, "Speedy", LocalDate.parse("03/02/1979", dateFormatter)));
		mockHeroes.add(new Hero(sequence ++, "Bombarto", LocalDate.parse("19/09/1939", dateFormatter)));
		mockHeroes.add(new Hero(sequence ++, "Firefiesta", LocalDate.parse("23/12/1981", dateFormatter)));
		mockHeroes.add(new Hero(sequence ++, "Spotify", LocalDate.parse("11/04/1990", dateFormatter)));
	}
	public void createNewHero(Hero newHero) {
		
		newHero.setId(sequence ++);
		mockHeroes.add(newHero);
	}
	public ArrayList<Hero> getAllHeroes() {
		return mockHeroes;
	}
	public Hero getHero(int id) {
		
		return mockHeroes.stream().filter(hero -> id == hero.getId())
				.findAny()
				.orElse(null);
		
	}
	public void deleteHero(Hero toDelete) {
		mockHeroes.remove(toDelete);
	}
}
