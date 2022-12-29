import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../base.service';
import { Class } from '../class/class.model';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css']
})
export class TestEditComponent {
  class: Class;
  testForm: FormGroup;
  emptyList = false;
  setControls = [];
  testValue
  selectedSets = [];

  constructor(private bs: BaseService, private route: ActivatedRoute, private router: Router) {
    this.bs.getClass(this.route.snapshot.params['id'])
      .subscribe(c => {
        this.class = c;
        c.sets.forEach(s => this.setControls.push(new FormControl(null)))
        this.testForm = new FormGroup({
          'title': new FormControl(null, Validators.required),
          'sets': new FormArray(this.setControls),
        });
      })
  }

  getSetControls() {
    return (<FormArray>this.testForm.get('sets')).controls;
  }

  onSubmit() {
    console.log(this.testForm.value.sets)
    for (let i = 0; i < this.testForm.value.sets.length; i++) {
      if (this.testForm.value.sets[i]) {
        this.selectedSets.push(this.class.sets[i])
      }
    }
    if (this.selectedSets.length == 0) {
      this.emptyList = true;
      return;
    }
    this.testValue = {
      title: this.testForm.value.title,
      sets: this.selectedSets,
    };
    this.bs.postTest(this.testValue, this.route.snapshot.params['id']);
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['classdetail', this.route.snapshot.params['id']]);
  }
}
