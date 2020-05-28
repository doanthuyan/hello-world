import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {  of } from 'rxjs';
import { HeroSearchComponent } from './hero-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
class FakeApiService {
	mockHeroList = [
	     {id: 1, name: 'SpiderDude', birthDate: '12/1/1998'},
	     {id: 2, name: 'Wonderful Woman', birthDate: '12/11/1990'},
	     {id: 3, name: 'SuperDude', birthDate: '1/1/1948'}
	   ];
  // Implement the methods you want to overload here
  getHeroes() {
    return of(this.mockHeroList ); // * mocks the return of the real method
  }
	getHero(id:number){return of(this.mockHeroList[0] );}
	updateHero(h:Hero){}
	deleteHero(h:Hero){}
	searchHeroes(){return of(this.mockHeroList[0] );}
}
describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports: [
        RouterTestingModule,
      ],
	  providers: [
        { provide: HeroService, useClass: FakeApiService },
      ],
	  schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
