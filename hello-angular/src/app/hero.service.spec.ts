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
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  heroService = new HeroService(<any> httpClientSpy,<any> httpClientSpy);
});

it('should return expected heroes (HttpClient called once)', () => {
  const expectedHeroes: Hero[] =
    [{ id: 1, name: 'A' ,birthDate:'13/12/1999'}, { id: 2, name: 'B',birthDate:'13/12/1999' }];

  httpClientSpy.get.and.returnValue(of(expectedHeroes));

  heroService.getHeroes().subscribe(
    heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
    fail
  );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
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