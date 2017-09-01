import { Injectable } from '@angular/core';

export class Crisis {
  constructor(public id: number, public name: string) { }
}

const CRISES = [
  new Crisis(1, 'Dragon Burning Cities'),
  new Crisis(2, 'Sky Rains Great White Sharks'),
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Procrastinators Meeting Delayed Again'),
];
let crisisPromise = Promise.resolve(CRISES);

@Injectable()
export class CrisisService {
  getCrises() { return crisisPromise; }

  getCrisis(id: number | string) {
    return crisisPromise
      // (+) before `id` turns the string into a number
      .then(crises => crises.find(crises => crises.id === +id));
  }
}