import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../core/models/users.models";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('token' || '');
  }


  get getHeaders() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  globalSearch(chain:string) {
    const url = `${base_url}/all/${chain}`;
    return this.http.get<any[]>(url, this.getHeaders)
  }

  search(type: 'users' | 'receptionists' | 'hotels', chain: string) {
    const url = `${base_url}/all/collection/${type}/${chain}`;
    return this.http.get<any[]>(url, this.getHeaders).pipe(map((res: any) => {

      return res.result
    }))
  }
}
