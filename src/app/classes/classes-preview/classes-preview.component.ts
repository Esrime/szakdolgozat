import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/class/class.model';
import { LocalUser } from 'src/app/user-page/localUser.model';
import { BaseService } from '../../base.service';

@Component({
  selector: 'app-classes-preview',
  templateUrl: './classes-preview.component.html',
  styleUrls: ['./classes-preview.component.css']
})
export class ClassesPreviewComponent implements OnInit {

  public classes: Class[] = [];
  user: LocalUser;

  constructor(private bs: BaseService) {
    this.user = this.bs.getCurrentUser();
  }

  ngOnInit(): void {
    this.bs.getClasses(true).subscribe(cs => {
      cs.forEach(c => {
        if (c.creator.email == this.user.email) { this.classes.push(c) }
        else {
          c.students.forEach(
            s => { if (s.email == this.user.email) this.classes.push(c) }
          )
        }
      })
    });

  }

}
