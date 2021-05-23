import {Hotel} from "./hotel.models";

interface _receptionistUser {
  _id: string
  nombre: string
  img: string
}

export class Receptionists {
  constructor(
    public _id: string,
    public name?: string,
    public user?: _receptionistUser,
    public hotel?:Hotel,
    public img?: string,
  ) {
  }




}
