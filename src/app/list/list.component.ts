import { Injectable } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/do';

import { List } from './list'
import { ListService} from './list.service'

@Injectable()
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.css'],
  providers:[ListService]
})
export class ListComponent implements OnInit {
  private doctors: Array<List> = [];
  // private doctors: List[];
  constructor(private service:ListService) {
  }

  ngOnInit() {
    this.service.getList().subscribe((data: List) => {
      this.doctors.push(data);
    });
  }
}