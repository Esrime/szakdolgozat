import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenthicated = false;
  private userSub: Subscription;
  public username: string

  constructor(private bs: BaseService) { }

  ngOnInit(): void {
    this.userSub = this.bs.user.subscribe(user => {
      this.isAuthenthicated = !!user;
      // this.bs.setCurrentUser();
      this.username =this.bs.getCurrentUser().username;
    })
  }

  logout() {
    this.bs.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
