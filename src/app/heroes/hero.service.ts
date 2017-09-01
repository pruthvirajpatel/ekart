import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

export class Hero {
  constructor(public id: number, public name: string) { }
}

let HEROES = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta'),
  new Hero(16, 'RubberMan')
];

let heroesPromise = Promise.resolve(HEROES);

interface ItemsResponse {
  results: string[];
}

@Injectable()
export class HeroService {
  constructor(private http: Http) {
  }

  getHeroes() { return heroesPromise; }

  getHero(id: number | string) {
    return heroesPromise
      // (+) before `id` turns the string into a number
      .then(heroes => heroes.find(hero => hero.id === +id));
  }

  getList = (): Observable<ItemsResponse> => {
    return this.http.get("assets/api/items.json").map(res => {
      console.log(res);
     return res.json()
    });
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/