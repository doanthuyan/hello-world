import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
/*	selectedHero: Hero = {
    id: 1,
    name: 'Windstorm',
	birthDate: new Date(1990, 5,12)
  };
*/	  
	selectedHero: Hero;
	myHeroList : Hero[];
	
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
	this.getHeroList();
  }
	onSelectHero(hero: Hero): void {
	  this.selectedHero = hero;
	this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
	}
	
	getHeroList(): void {
	  //this.myHeroList = this.heroService.getHeroes();
		this.heroService.getHeroes().subscribe(result => this.myHeroList = result);
	}
	addHero(name: string): void {
	  name = name.trim();
	  if (!name) { return; }
	  this.heroService.addHero({ name } as Hero)
	    .subscribe(hero => {
	      this.myHeroList.push(hero);
	    });
	}
	deleteHero(hero: Hero): void {
	  this.myHeroList = this.myHeroList.filter(h => h !== hero);
	  this.heroService.deleteHero(hero).subscribe();
	}
}
