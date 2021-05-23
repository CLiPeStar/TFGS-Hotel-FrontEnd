import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Hotel} from "../core/models/hotel.models";
import {environment} from "../../environments/environment";
import {Receptionists} from "../core/models/receptionists.models";


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ReceptionistsService {

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

  chargeReceptionists() {
    const url = `${base_url}/receptionists`;
    return this.http.get(url, this.getHeaders).pipe(map((res: { ok: boolean, Receptionist: Receptionists[] }) => {
      return res.Receptionist
    }))

  }

  createReceptionists(data:{name: string,hotel:string}) {
    const url = `${base_url}/receptionists`;
    return this.http.post(url, data, this.getHeaders)

  }

  updateReceptionists(data) {
    const url = `${base_url}/receptionists/${data._id}`;
    return this.http.put(url, data, this.getHeaders)

  }

  deleteReceptionists( _id: string) {
    const url = `${base_url}/receptionists/${_id}`;
    return this.http.delete(url, this.getHeaders)

  }

  getReceptionistById(id:string){
    const url = `${base_url}/receptionists/${id}`;
    return this.http.get(url, this.getHeaders).pipe(map((res: { ok: boolean, Receptionist: Receptionists }) => {
      return res.Receptionist
    }))
  }


}
