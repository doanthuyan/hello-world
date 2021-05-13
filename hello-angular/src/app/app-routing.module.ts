import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';
import { ContentfulService } from './contentful.service';
import { ContentfulHeroComponent } from './contentful-hero/contentful-hero.component';
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'detail/:id', component: HeroDetailComponent },
  { path: 'contentfulHeros', component: ContentfulHeroComponent },
];

@NgModule({
  imports: [
	CommonModule,
	RouterModule.forRoot(routes)
	],
  providers: [
    ContentfulService
  ],
	declarations: [],
  	exports: [RouterModule]
})
export class AppRoutingModule { }
