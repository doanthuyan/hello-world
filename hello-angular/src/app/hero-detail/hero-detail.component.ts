import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

   
import { HeroService }  from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
	@Input() myHero: Hero;
  constructor(
	private route: ActivatedRoute,
	  private heroService: HeroService,
	  private location: Location
	) { }

  ngOnInit(): void {
	this.getHero();
  }
	getHero(): void {
	  const id = +this.route.snapshot.paramMap.get('id');
	  this.heroService.getHero(id)
	    .subscribe(hero => this.myHero = hero);
	}
	saveHero(): void {
	  this.heroService.updateHero(this.myHero)
	    .subscribe(() => this.goBack());
	}
	goBack(): void {
	  this.location.back();
	}
	parseDate(value: any): Date | null {
	    if ((typeof value === 'string') && (value.includes('/'))) {
	      const str = value.split('/');
	
	      const year = Number(str[2]);
	      const month = Number(str[1]) - 1;
	      const date = Number(str[0]);
	
	      return new Date(year, month, date);
	    } else if((typeof value === 'string') && value === '') {
	      return new Date();
	    }
	    const timestamp = typeof value === 'number' ? value : Date.parse(value);
	    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}
