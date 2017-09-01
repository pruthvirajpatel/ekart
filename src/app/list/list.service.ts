import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { List } from './list';

@Injectable()
export class ListService {
  constructor(private http:Http) {
  }
  getList = (): Observable<List> => {
    return this.http.get('http://jsonplaceholder.typicode.com/photos').flatMap((data) => data.json());
  }
}