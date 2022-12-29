import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { BaseService } from '../base.service';
import { Set } from '../set-list/cardset/set.model';

@Component({
  selector: 'app-set-practice',
  templateUrl: './set-practice.component.html',
  styleUrls: ['./set-practice.component.css']
})
export class SetPracticeComponent implements OnInit, OnDestroy {

  set: Set = null;
  timed: boolean = false;
  ind = 0;
  answers: { text: string, ind: number }[] = [];
  question: string = null;
  countDown: Subscription = null;
  counter = 0;
  tick = 1000;
  multiplier =1;
  isWrong =false;

  constructor(private route: ActivatedRoute, private bs: BaseService, private router: Router) {
    this.bs.getSet(this.route.snapshot.params['id']).subscribe(set => {
      this.set = set;
      this.generateAnswers();
      this.counter = this.set.cards.length * 10
      this.multiplier= 100/this.set.cards.length;
    })
    this.timed = this.route.snapshot.params['timed'] == "true"
  }

  ngOnInit(): void {
    if (this.timed) {
      this.countDown = timer(0, this.tick).subscribe(() => {
        --this.counter
        if (this.counter < 0) this.timeUp();
      });
    }
  }

  check(index: number) {
    if (this.answers[index].ind != this.ind) {
      this.isWrong=true;
      return;
    }
    this.ind++;
    this.isWrong=false;
    if (this.ind >= this.set.cards.length) {
      confirm("You finished practicing this set!")
      this.router.navigate(['/setdetail', this.route.snapshot.params['id']])
    }
    this.generateAnswers()

  }


  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private generateAnswers() {
    const isfront = Math.random() > 0.5 ? true : false
    let inds = [];
    this.answers = []
    let tmp = this.getRandomInt(this.set.cards.length);
    while (inds.length != 4) {
      if (!inds.includes(tmp) && tmp != this.ind) {
        inds.push(tmp);
        this.answers.push(isfront ? { text: this.set.cards[tmp].back, ind: tmp } : { text: this.set.cards[tmp].front, ind: tmp })
      }
      tmp = this.getRandomInt(this.set.cards.length)
    }
    tmp = this.getRandomInt(4);
    console.log(tmp)
    switch (tmp) {
      case 0:
        this.answers[0] = isfront ? { text: this.set.cards[this.ind].back, ind: this.ind } : { text: this.set.cards[this.ind].front, ind: this.ind };
        break;
      case 1:
        this.answers[1] = isfront ? { text: this.set.cards[this.ind].back, ind: this.ind } : { text: this.set.cards[this.ind].front, ind: this.ind };
        break;
      case 2:
        this.answers[2] = isfront ? { text: this.set.cards[this.ind].back, ind: this.ind } : { text: this.set.cards[this.ind].front, ind: this.ind };
        break;
      case 3:
        this.answers[3] = isfront ? { text: this.set.cards[this.ind].back, ind: this.ind } : { text: this.set.cards[this.ind].front, ind: this.ind };
        break;
      default:
        this.answers[0] = isfront ? { text: this.set.cards[tmp].back, ind: tmp } : { text: this.set.cards[tmp].front, ind: tmp };
        break;
    }
    console.log(this.answers)
    this.question = isfront ? this.set.cards[this.ind].front : this.set.cards[this.ind].back;
  }

  timeUp() {
    confirm("Time's up! You have correctly answered " + this.ind + " of " + this.set.cards.length + " questions.")
    this.router.navigate(['/setdetail', this.route.snapshot.params['id']])
  }

  ngOnDestroy(): void {
    if (this.countDown != null) {
      this.countDown.unsubscribe();
    }
  }
}

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}