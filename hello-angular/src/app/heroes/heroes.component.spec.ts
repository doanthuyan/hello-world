import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {  of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
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
describe('HeroesComponent', () => {
	let component: HeroesComponent;
	let fixture: ComponentFixture<HeroesComponent>;
	beforeEach(async(() => {
	TestBed.configureTestingModule({
      declarations: [ HeroesComponent],
      imports: [
        RouterTestingModule, FormsModule
      ],
	  providers: [
        { provide: HeroService, useClass: FakeApiService },
      ],
	  schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
	fixture = TestBed.createComponent(HeroesComponent);
	component = fixture.componentInstance; // The component instantiation 

  }));
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
	it('should set heroes correctly from the service', () => {
       //mockHeroService.getHeroes.and.returnValue(of(mockHeroList));
       fixture.detectChanges();
       expect(fixture.componentInstance.myHeroList.length).toBe(3);
   })
});

