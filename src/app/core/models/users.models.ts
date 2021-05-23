import {environment} from 'src/environments/environment';

const api_url = environment.base_url;

export class User {
  constructor(
    private _name: string,
    private _email: string,
    private _img?: string,
    private _role?: string,
    private _google?: string,
    private _uid?: string,
    private _password?: string
  ) {
  }

  get getImage(): string {
    if (!this._img) return `${api_url}/uploads/users/96as74fd85Z`;
    if (this._img.includes('https')) {
      return this._img;
    }
    if (this._img) {
      return `${api_url}/uploads/users/${this._img}`;
    }
    return `${api_url}/uploads/users/96as74fd85Z`;
  }

  get img(): string {
    return this._img;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get role(): string {
    return this._role;
  }

  get google(): string {
    return this._google;
  }

  get uid(): string {
    return this._uid;
  }

  get password(): string {
    return this._password;
  }

  set name(value: string) {
    this._name = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set img(value: string) {
    this._img = value;
  }

  set role(value: string) {
    this._role = value;
  }
}
