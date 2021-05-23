import {Component, OnInit} from '@angular/core';
import {SidebarService} from 'src/app/services/sidebar.service';
import {UsuarioService} from 'src/app/services/usuario.service';
import {User} from "../../core/models/users.models";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [],
})
export class SideBarComponent implements OnInit {
  menuItems: any[];
  user: User;

  constructor(
    private SidebarService: SidebarService,
    private userService: UsuarioService
  ) {
    this.menuItems = this.SidebarService.menu;
    this.user = userService.getUser;
  }

  ngOnInit(): void {
  }
}
