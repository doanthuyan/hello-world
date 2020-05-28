import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hero } from '../hero';
import { HeroService }  from '../hero.service';
import { MessageService } from '../message.service';
import { HttpClientModule } from '@angular/common/http';
import {  of } from 'rxjs';
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
describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
	providers: [{ provide: HeroService, useClass: FakeApiService }, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	
  });

  it('should create', inject([HeroService], (service: HeroService) => {
    expect(component).toBeTruthy();
  }));
});
