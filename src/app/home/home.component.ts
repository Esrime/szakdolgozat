import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenthicated = false;
  private userSub:Subscription;

  constructor(private bs:BaseService) { }

  ngOnInit(): void {
    this.userSub = this.bs.user.subscribe(user => {
      this.isAuthenthicated= !!user;
    })
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
