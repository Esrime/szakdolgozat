import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../base.service';
import { Class } from './class.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  class: Class = null;
  tests = []

  constructor(private route: ActivatedRoute, private bs: BaseService) {
    this.bs.getClass(this.route.snapshot.params['id'])
      .subscribe(c => {
        this.class = c;
        for (const key in c.tests) {
          this.tests.push({ ...this.class.tests[key], id: key })
        }
      })
  }
}
