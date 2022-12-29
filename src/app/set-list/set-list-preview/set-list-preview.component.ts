import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../base.service';
import { Set } from '../cardset/set.model';

@Component({
  selector: 'app-set-list-preview',
  templateUrl: './set-list-preview.component.html',
  styleUrls: ['./set-list-preview.component.css']
})
export class SetListPreviewComponent implements OnInit {
  public sets: Set[];

  constructor(private bs: BaseService) { 
    this.sets= [];
    this.bs.getSets(true).subscribe(sets => {
      this.sets=sets;
    });
  }

  ngOnInit(): void {
  }

}
