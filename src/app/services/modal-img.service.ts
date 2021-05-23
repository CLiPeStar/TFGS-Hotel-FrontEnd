import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../core/models/users.models";
import {environment} from "../../environments/environment";

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {
  private _hiddenModal: boolean = true
  type: 'users' | 'receptionists' | 'hotels'
  id: string
  img: string
  newImg: EventEmitter<string> = new EventEmitter<string>()

  constructor() {
  }

  openModal(type: 'users' | 'receptionists' | 'hotels', id: string, img: string = "87dgbfiW3E7") {
    this.type = type
    this.id = id


    if (img.includes('http'||'https')){
      this.img = img
    }else if(img){
      this.img = `${base_url}/uploads/${type}/${img}`;
    }else{
      this.img = `${base_url}/uploads/${type}/-*-*+9`;
    }
    this._hiddenModal = false
  }

  closeModel() {
    this._hiddenModal = true
  }

  get hiddenModal(): boolean {
    return this._hiddenModal;
  }
}
