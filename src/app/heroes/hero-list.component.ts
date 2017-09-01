// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Hero, HeroService } from './hero.service';

@Component({
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})

export class HeroListComponent implements OnInit {
  heroes: Observable<Hero[]>;
  films: Object;
  results: string[];
  private selectedId: number;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.heroes = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getHeroes();
      });
//.map(data => data.json())
    this.http.get('http://ghibliapi.herokuapp.com/films').subscribe(data => {
      // Read the result field from the JSON response.
      this.films = data;
      console.log(data);
    });

    // this.http.get('assets/api/items.json').map((res: any) => res).subscribe(data => {
    //   // Read the result field from the JSON response.
    //   this.results = data['results'];
    //   console.log(data);
    // });
  this.service.getList().retry(3).subscribe((res) => {
    console.log(res.results);
  },
    (err: HttpErrorResponse) => {
    //console.log('Something went wrong!', err);
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    });
  }

  isSelected(hero: Hero) { return hero.id === this.selectedId; }

  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/