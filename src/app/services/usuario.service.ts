import {HttpClient} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {tap, map, catchError, delay} from 'rxjs/operators';

import {environment} from 'src/environments/environment';

import {LoginForm} from '../core/interfaces/login.interface';
import {RegisterForm} from '../core/interfaces/register-form.interface';
import {User} from '../core/models/users.models';
import {SidebarService} from "./sidebar.service";

declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private auth2: any;
  private _user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private sideBar:SidebarService
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token' || '');
  }

  googleInit() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '953744441071-6pp9dpdqti7pk558cijb8j24acd1cum5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve(this.auth2);
      });
    });
  }

  get getHeaders() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {role, name, google, email, uid, img = ''} = resp.user;
          this._user = new User(name, email, img, role, google, uid);
          localStorage.setItem('token', resp.token);
          this.sideBar.chargeMenu(resp.menu)
          return true;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        console.log(resp);
        this.sideBar.chargeMenu(resp.menu)
        localStorage.setItem('token', resp.Token);
      })
    );
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    data = {...data, role: this._user.role};
    return this.http.put(`${base_url}/users/${this._user.uid}`, data, this.getHeaders);
  }

  login(loginData: LoginForm) {
    return this.http.post(`${base_url}/login`, loginData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        this.sideBar.chargeMenu(resp.menu)
      })
    );
  }

  loginGoogle(tokenGoogle: string) {
    return this.http
      .post(`${base_url}/login/google`, {token: tokenGoogle})
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          this.sideBar.chargeMenu(resp.menu)
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
        localStorage.removeItem('token');
      });
    });
  }

  chargeUsers(since: number = 0) {
    const url = `${base_url}/users?since=${since}`;
    return this.http.get(url, this.getHeaders).pipe(
      map((resp: any) => {
        const users = resp.user.map(user => new User(user.name, user.email, user.img, user.role, user.google, user.uid, ''))
        return {
          total: resp.total,
          user: users
        }
      })
    )
  }

  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`
    return this.http.delete(url, this.getHeaders)
  }

  saveUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, {
      name: user.name,
      email: user.email,
      role: user.role
    }, this.getHeaders);

  }

  get getUser(): User {
    return this._user;
  }

  get getRolUser(): string{
    return this._user.role
  }
}
