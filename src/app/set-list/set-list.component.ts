import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent {
  public setList;
  isAuthenthicated = false;

  constructor(private bs: BaseService) {
    this.bs.getSets().subscribe(sets => this.setList = sets);
    this.bs.user.subscribe(user => {
      this.isAuthenthicated = !!user;
    })
  }

}
