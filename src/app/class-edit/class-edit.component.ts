import { AfterContentInit, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BaseService } from '../base.service';
import { Class } from '../class/class.model';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent {

  classForm: FormGroup = null;
  sets;
  filteredSets = [];
  students;
  user;
  emptyList = false;


  constructor(private bs: BaseService, private router: Router, private fb: FormBuilder) {
    
    let studentControl=[];
    let setControl=[];

    this.user = this.bs.getCurrentUser();
    this.students = this.bs.testStudentsData();
    this.sets = this.bs.testSetsData()
    this.sets.forEach(s =>{
      if (s.creatorId== this.user.email) {
          this.filteredSets.push(s)        
      }
    })
    console.log(this.sets)
    console.log(this.students)
    this.students.forEach(() => {
      studentControl.push(new FormControl(null))
    });
    this.filteredSets.forEach(() => {
      setControl.push(new FormControl(null))
    });

    this.classForm = this.fb.group({
      'title': new FormControl(null, Validators.required),
      'students': new FormArray(studentControl),
      'setsControl': new FormArray(setControl),
    });
  }

  getSetControls() {
    return (<FormArray>this.classForm.get('setsControl')).controls;
  }

  getStudentControls() {
    return (<FormArray>this.classForm.get('students')).controls;
  }

  onSubmit() {

    let selectedSets = [];
    let selectedStudents = [];
    for (let i = 0; i < this.classForm.value.setsControl.length; i++) {
      if (this.classForm.value.setsControl[i]) {
        selectedSets.push(this.filteredSets[i])
      }
    }
    for (let i = 0; i < this.classForm.value.students.length; i++) {
      if (this.classForm.value.students[i]) {
        selectedStudents.push(this.students[i])
      }
    }


    if (selectedSets.length == 0 || selectedStudents.length == 0) {
      this.emptyList = true;
      return;
    }

    let classValue: Class = {
      title: this.classForm.value.title,
      sets: selectedSets,
      students: selectedStudents,
      creator: this.user,
    };

    this.bs.addClass(classValue)
    this.bs.testClear()
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['classes']);
  }
}
