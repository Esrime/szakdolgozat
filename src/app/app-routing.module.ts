import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassEditComponent } from './class-edit/class-edit.component';
import { ClassComponent } from './class/class.component';
import { ClassesComponent } from './classes/classes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SetDetailComponent } from './set-detail/set-detail.component';
import { SetEditComponent } from './set-edit/set-edit.component';
import { SetListComponent } from './set-list/set-list.component';
import { SetPracticeComponent } from './set-practice/set-practice.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { TestEditComponent } from './test-edit/test-edit.component';
import { TestPracticeComponent } from './test-practice/test-practice.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "sets", component: SetListComponent },
  { path: "new-set", component: SetEditComponent },
  { path: "setdetail/:id", component: SetDetailComponent },
  { path: "setpractice/:id/:timed", component: SetPracticeComponent },
  { path: "classes", component: ClassesComponent },
  { path: "classdetail/:id", component: ClassComponent },
  { path: "classdetail/:id/testdetail/:tid", component: TestDetailComponent },
  { path: "classdetail/:id/testdetail/:tid/practice", component: TestPracticeComponent },
  { path: "classdetail/:id/testedit", component: TestEditComponent },
  { path: "new-class", component: ClassEditComponent },
  { path: "login", component: LoginComponent },
  { path: "user", component: UserPageComponent },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo:'/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//tanár lekérdezés
//esetdiagram
//db leírás