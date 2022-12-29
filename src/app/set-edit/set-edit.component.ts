import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';
import { CardItem } from '../card/card.model';
import { Set } from '../set-list/cardset/set.model';

@Component({
  selector: 'app-set-edit',
  templateUrl: './set-edit.component.html',
  styleUrls: ['./set-edit.component.css']
})
export class SetEditComponent implements OnInit {

  setForm: FormGroup;
  setCards: CardItem[] = [];
  user;

  constructor(private bs: BaseService, private router: Router) { }

  ngOnInit(): void {
    this.setForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'card-fronts': new FormArray([new FormControl(null, Validators.required)]),
      'card-backs': new FormArray([new FormControl(null, Validators.required)]),
    });

    this.user= this.bs.getCurrentUser()
  }

  addCard() {
    (<FormArray>this.setForm.get('card-fronts')).push(new FormControl(null, Validators.required));
    (<FormArray>this.setForm.get('card-backs')).push(new FormControl(null, Validators.required));
  }

  onSubmit() {
    const backs = this.setForm.value['card-backs'];
    const fronts = this.setForm.value['card-fronts'];

    for (let i = 0; i < fronts.length; i++) {
      this.setCards.push({ front: fronts[i], back: backs[i] })
    }


    const newSet:Set = {
      title: this.setForm.value['title'],
      cards: this.setCards,
      itemNum: this.setCards.length,
      creator: this.user.username,
      creatorId: this.user.email

    }
    this.bs.addSet(newSet);
    this.router.navigate(['/']);

  }

  getCfControls() {
    return (<FormArray>this.setForm.get('card-fronts')).controls;
  }
  getCbControls() {
    return (<FormArray>this.setForm.get('card-backs')).controls;
  }
  cancel(){
    this.router.navigate(['sets']);
  }
}
