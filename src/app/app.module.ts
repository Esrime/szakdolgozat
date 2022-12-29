import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardsetComponent } from './set-list/cardset/cardset.component';
import { ClassComponent } from './class/class.component';
import { HeaderComponent } from './header/header.component';
import { SetListComponent } from './set-list/set-list.component';
import { SetListPreviewComponent } from './set-list/set-list-preview/set-list-preview.component';
import { ClassesPreviewComponent } from './classes/classes-preview/classes-preview.component';
import { ClassesComponent } from './classes/classes.component';
import { HomeComponent } from './home/home.component';
import { SetDetailComponent } from './set-detail/set-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginComponent } from './login/login.component';
import { SetEditComponent } from './set-edit/set-edit.component';
import { InterceptorService } from './interceptor.service';
import { FormatTimePipe, SetPracticeComponent } from './set-practice/set-practice.component';
import { ClassEditComponent } from './class-edit/class-edit.component';
import { TestEditComponent } from './test-edit/test-edit.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { TestPracticeComponent } from './test-practice/test-practice.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsetComponent,
    ClassComponent,
    HeaderComponent,
    SetListComponent,
    SetListPreviewComponent,
    ClassesPreviewComponent,
    ClassesComponent,
    HomeComponent,
    SetDetailComponent,
    PageNotFoundComponent,
    UserPageComponent,
    LoginComponent,
    SetEditComponent,
    SetPracticeComponent,
    FormatTimePipe,
    ClassEditComponent,
    TestEditComponent,
    TestDetailComponent,
    TestPracticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
