import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Class } from './class/class.model';
import { Set } from './set-list/cardset/set.model';
import { LocalUser } from './user-page/localUser.model';
import { User } from './user-page/user.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private sets = [];
  private students = [];

  private setUrl = 'https://szakdolgozat-eb246-default-rtdb.firebaseio.com/sets.json';
  private userUrl = 'https://szakdolgozat-eb246-default-rtdb.firebaseio.com/users.json';
  private classUrl = 'https://szakdolgozat-eb246-default-rtdb.firebaseio.com/classes.json';

  currentUser = null;
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient, private router: Router) { }

  // all/preview
  getClasses(isPreview?: boolean) {
    return this.http.get(this.classUrl)
      .pipe(
        map((resp) => {
          const classesArray: Class[] = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              classesArray.push({ ...resp[key], id: key })
            }
          }
          return isPreview ? classesArray.slice(0, 4) : classesArray;
        })
      )
  }
  getSets(isPreview?: boolean) {
    return this.http.get(this.setUrl)
      .pipe(
        map((resp) => {
          const setsArray: Set[] = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              setsArray.push({ ...resp[key], id: key })
            }
          }
          return isPreview ? setsArray.slice(0, 4) : setsArray;
        })
      )
  }
  getStudents() {
    return this.http.get(this.userUrl)
      .pipe(
        map((resp) => {
          const studentsArray = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key) && resp[key].role == "student") {
              studentsArray.push({ ...resp[key], id: key })
            }
          }
          return studentsArray;
        })
      )
  }


  // individual

  getSet(id: string) {
    return this.http.get(this.setUrl)
      .pipe(map((resp) => {
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            if (key == id) {
              return { ...resp[key] }
            }
          }
        }
      })
      );
  }

  getClass(id: string) {
    return this.http.get(this.classUrl)
      .pipe(map((resp) => {
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            if (key == id) {
              return { ...resp[key] }
            }
          }
        }
      })
      );
  }

  getTest(cid:string, tid:string){
    return this.http.get('https://szakdolgozat-eb246-default-rtdb.firebaseio.com/classes/'+cid+'/tests.json')
    .pipe(map((resp) => {
      for (const key in resp) {
        if (resp.hasOwnProperty(key)) {
          if (key == tid) {
            return { ...resp[key] }
          }
        }
      }
    })
    );
  }

  //post

  addSet(s: Set) {
    this.http.post(this.setUrl, s).subscribe();
  }
  addClass(c: Class) {
    this.http.post(this.classUrl, c).subscribe();
  }

  postTest(t: any, id: string) {
    let url = "https://szakdolgozat-eb246-default-rtdb.firebaseio.com/classes/" + id + "/tests.json";
    this.http.post(url, t).subscribe();
  }
  postAttempt(cid: string,tid: string, data: any) {
    let url = "https://szakdolgozat-eb246-default-rtdb.firebaseio.com/classes/" +cid + "/tests/"+tid+"/attempts.json";
    this.http.post(url, data).subscribe();
  }


  //auth
  signup(email: string, password: string) {

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvz4JS6KTnrnYT7XY4K4Rmb_t6z_ED-xg',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(tap(resp => {
        const expDate = new Date(new Date().getTime() + +resp.expiresIn * 1000)
        const user = new User(resp.email, resp.localId, resp.idToken, expDate);
        this.user.next(user);
      }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvz4JS6KTnrnYT7XY4K4Rmb_t6z_ED-xg',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(tap(resp => {
        const expDate = new Date(new Date().getTime() + +resp.expiresIn * 1000)
        const user = new User(resp.email, resp.localId, resp.idToken, expDate);
        this.user.next(user);
      }))
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"])
  }

  addUser(email: string, username: string, role: string) {
    this.http.post(this.userUrl, {
      email: email,
      username: username,
      role: role
    }).subscribe()
  }

  setCurrentUser() {
    this.http.get(this.userUrl)
      .pipe(
        map((resp) => {
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              if (resp[key].email == this.user.value.email) {
                this.currentUser = resp[key];
                console.log(this.currentUser)
              }
            }
          }
        })
      ).subscribe();
  }

  getCurrentUser(): LocalUser {
    return this.currentUser;
  }


  //?
  setUpForTest() {
    this.getSets().subscribe(s => this.sets = s)
    this.getStudents().subscribe(s => this.students = s)
  }

  testStudentsData() {
    return this.students
  }
  testSetsData() {
    return this.sets
  }
  testClear(){
    this.sets=[];
    this.students=[];
  }
}
