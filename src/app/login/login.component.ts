import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isRegistering = false;
  error: string = null;

  constructor(private bs: BaseService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    const isTeacher = form.value.isTeacher;

    if (this.isRegistering) {
      this.bs.addUser(email, username,isTeacher? "teacher": "student");
      this.bs.signup(email, password).subscribe(
        resp => {
          console.log(resp)
          this.bs.setCurrentUser();
          this.router.navigate(['/'])
        },
        eresp => {
          this.error = "Something went wrong: " + eresp.error.error.message + "."
          console.log(eresp)
        }
      );
    } else {
      this.bs.login(email, password).subscribe(
        resp => {
          console.log(resp)
          this.bs.setCurrentUser();
          this.router.navigate(['/'])
        },
        eresp => {
          this.error = "Something went wrong: " + eresp.error.error.message + "."
          console.log(eresp)
        }
      );
    }

    form.reset();
  }

}
