import { async, ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { Component, OnInit,Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hero } from '../hero';
import { HeroService }  from '../hero.service';
describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let service: HeroService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [
        RouterTestingModule,
		FormsModule,
		HttpClientTestingModule,
      ],
	providers: [{provide: HeroService, useClass: HeroService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	service = TestBed.get(HeroService);
  });

  it('should create', inject([HeroService], (service: HeroService) => {
    expect(component).toBeTruthy();
  }));
});
