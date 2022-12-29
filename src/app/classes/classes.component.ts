import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { Class } from '../class/class.model';
import { LocalUser } from '../user-page/localUser.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  user: LocalUser
  classList: Class[] = [];

  constructor(private bs: BaseService) {
    this.user = this.bs.getCurrentUser()
    this.bs.getClasses().subscribe(cs => {
      cs.forEach(c => {
        if (c.creator.email == this.user.email) { this.classList.push(c) }
        else {
          c.students.forEach(
            s => { if (s.email == this.user.email) this.classList.push(c) }
          )
        }
      })
    });
    this.bs.setUpForTest();
  }

  ngOnInit(): void {
  }

}
