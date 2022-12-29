import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { CardItem } from '../../card/card.model';

@Component({
  selector: 'app-cardset',
  templateUrl: './cardset.component.html',
  styleUrls: ['./cardset.component.css']
})
export class CardsetComponent implements OnInit, AfterViewInit {
  @Input() card: CardItem;
  public cards;

  constructor() {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cards = document.querySelectorAll('.card');
    [...this.cards].forEach((card)=>{
      card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
      });
    });
  }
  

  

}
