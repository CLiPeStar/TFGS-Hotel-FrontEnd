interface _hotelUser {
  _id: string
  nombre: string
  img: string
}

export class Hotel {
  constructor(
    public _id: string,
    public name?: string,
    public user?: _hotelUser,
    public img?: string,
  ) {
  }




}
