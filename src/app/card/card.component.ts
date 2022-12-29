import { Component, Input, OnInit } from '@angular/core';
import { CardItem } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() public front: String = "eleje";
  @Input() public back: String = "háta";
  public isFlipped = false;

  constructor(front: String, back: String) {
    this.front = front;
    this.back = back;
  }

}
