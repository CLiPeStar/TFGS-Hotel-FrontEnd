import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from '../../core/models/users.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(private userService: UsuarioService, private router: Router) {
    this.user = userService.getUser;
  }

  ngOnInit(): void {}

  logOut() {
    this.userService.logOut();
  }
  search(chain: string) {
    if (chain.length === 0) {
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`dashboard/search/${chain}`);
  }
}
