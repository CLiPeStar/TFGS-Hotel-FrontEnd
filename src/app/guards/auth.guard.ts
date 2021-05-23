import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router, CanLoad, Route, UrlSegment,
} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UsuarioService} from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usuarioService.validateToken().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioService.validateToken().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
