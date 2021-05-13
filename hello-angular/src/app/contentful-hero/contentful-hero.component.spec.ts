import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentfulHeroComponent } from './contentful-hero.component';

describe('ContentfulHeroComponent', () => {
  let component: ContentfulHeroComponent;
  let fixture: ComponentFixture<ContentfulHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentfulHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentfulHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
