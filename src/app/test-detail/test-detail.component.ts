import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {
  test
  user
  attempts = []
  moreThan4 = false;

  constructor(private route: ActivatedRoute, private bs: BaseService) {
    this.user = this.bs.getCurrentUser()
    this.bs.getTest(this.route.snapshot.params['id'], this.route.snapshot.params['tid'])
      .subscribe(t => {
        this.test = t;
        for (const key in t.attempts) {
          this.attempts.push(t.attempts[key])
        }
        let tmpc = 0;
        for (const key in t.sets) {
          tmpc += t.sets[key].cards.length
        }
        this.moreThan4 = tmpc > 4
        console.log(tmpc)
        console.log(this.moreThan4)
      })
  }

  ngOnInit(): void {
  }

}
