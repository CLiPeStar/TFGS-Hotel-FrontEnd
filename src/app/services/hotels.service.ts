import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Hotel} from "../core/models/hotel.models";


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

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

  chargeHotels() {
    const url = `${base_url}/hotels`;
    return this.http.get(url, this.getHeaders).pipe(map((res: { ok: boolean, hotel: Hotel[] }) => {
      return res.hotel
    }))

  }

  createHotel(name: string) {
    const url = `${base_url}/hotels`;
    return this.http.post(url, {name}, this.getHeaders)

  }

  updateHotel(name: string, _id: string) {
    const url = `${base_url}/hotels/${_id}`;
    return this.http.put(url, {name}, this.getHeaders)

  }

  deleteHotel( _id: string) {
    const url = `${base_url}/hotels/${_id}`;
    return this.http.delete(url, this.getHeaders)

  }


}
