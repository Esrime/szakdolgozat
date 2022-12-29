import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../base.service';
import { Set } from '../set-list/cardset/set.model';

@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.css']
})
export class SetDetailComponent implements OnInit {
  public set:Set;
  public ind = 0;
  isAuthenthicated = false;


  constructor(private route: ActivatedRoute, private bs: BaseService, private router: Router) {
    this.bs.getSet(this.route.snapshot.params['id']).subscribe(set =>this.set= set)
  }
  
  ngOnInit(): void {
    this.bs.user.subscribe(user => {
      this.isAuthenthicated = !!user;
    })
  }

  nextCard() {
    if (this.ind == this.set.cards.length-1) {
      this.ind = 0;
    } else {
      this.ind++;
    }
  }
  previousCard() {
    if (this.ind == 0) {
      this.ind = this.set.cards.length-1;
    } else {
      this.ind--;
    }
  }

  practice(timed:boolean){
    this.router.navigate(['/setpractice', this.route.snapshot.params['id'], timed]);
  }

}
