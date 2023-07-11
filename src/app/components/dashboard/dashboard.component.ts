import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/interface/hero';
import { ComponentServiceService } from 'src/app/services/component-service/component-service.service';
import { HeroService } from 'src/app/services/hero/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [ComponentServiceService],
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private componentService: ComponentServiceService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}