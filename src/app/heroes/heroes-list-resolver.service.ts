import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Hero, HeroService } from './hero.service';

@Injectable()
export class CrisisDetailResolver implements Resolve<Hero> {
  constructor(private hs: HeroService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Hero> {
    let id = route.paramMap.get('id');

    return this.hs.getHero(id).then(hero => {
      if (hero) {
        return hero;
      } else { // id not found
        this.router.navigate(['/heroes']);
        return null;
      }
    });
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/