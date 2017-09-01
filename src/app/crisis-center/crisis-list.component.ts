// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crisis: Observable<Crisis[]>;

  private selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.crisis = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
    return this.service.getCrises();
      });
  }

  isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

  // onSelect(crisis: Crisis) {
  //   this.router.navigate(['/crisis-center', crisis.id]);
  // }

  onSelect(crisis: Crisis) {
    this.selectedId = crisis.id;
    // Navigate with relative link
    this.router.navigate([crisis.id], { relativeTo: this.route });
  }

}