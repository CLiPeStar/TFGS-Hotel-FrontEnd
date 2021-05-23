import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = []


  constructor() {
  }


  chargeMenu(menu){
    this.menu=menu
  }
}
