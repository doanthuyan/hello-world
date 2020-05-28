import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpErrorResponse} from '@angular/common/http';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';


describe('Hero Service', () => {

  let httpClientSpy: { get: jasmine.Spy };
	let heroService: HeroService;
	
beforeEach(() => {
	TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService, MessageService]
    });
  // TODO: spy on other methods too
	httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
  
  heroService = TestBed.get(HeroService);
});

it('should return expected heroes (HttpClient called once)', () => {
  
  heroService.getHeroes().subscribe(
    heroes => expect(heroes.length).toBe(3, 'expected heroes count'),
    fail
  );
  
});
it('should be created', () => {
    expect(heroService).toBeTruthy();
  });
it('should return an error when the server returns a 404', () => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  httpClientSpy.get.and.returnValue(of(errorResponse));

  heroService.getHeroes().subscribe(
    heroes => fail('expected an error, not heroes'),
    error  => expect(error.message).toContain('test 404 error')
  );
});
});