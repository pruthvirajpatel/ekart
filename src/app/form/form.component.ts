import { Component } from '@angular/core';

import { Form } from './form';

import { List } from './list';

interface IShape {
  area(): number;
}


interface EnumServiceItem {
  id: number; label: string; key: any
}

interface EnumServiceItems extends Array<EnumServiceItem> { }


// Option A 
var result: EnumServiceItem[] = [
  { id: 0, label: 'CId', key: 'contentId' },
  { id: 1, label: 'Modified By', key: 'modifiedBy' },
  { id: 2, label: 'Modified Date', key: 'modified' },
  { id: 3, label: 'Status', key: 'contentStatusId' },
  { id: 4, label: 'Status > Type', key: ['contentStatusId', 'contentTypeId'] },
  { id: 5, label: 'Title', key: 'title' },
  { id: 6, label: 'Type', key: 'contentTypeId' },
  { id: 7, label: 'Type > Status', key: ['contentTypeId', 'contentStatusId'] }
];

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.css']
})
export class FormComponent implements IShape {
  powers: Array<string>
  list: Array<object>
  userList: Array<EnumServiceItem>
  submitted: boolean = false;
  constructor(private length: number, private breadth: number) {
    this.powers = ['Really Smart', 'Super Flexible','Super Hot', 'Weather Changer'];
    this.list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  this.length = 1;//'qwqw';
  this.breadth = 1;
    console.log(this.area());
  this.userList = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')):[{name:'sdsd'}];
  }

  area(): number {
    return this.length * this.breadth;
  }
  model = new Form(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  onSubmit() { this.submitted = true; }

  newHero() {
    this.model = new Form(42, '', '');
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}