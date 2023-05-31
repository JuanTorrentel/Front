import { Injectable } from '@angular/core';
import { LogicaGuardService } from './logica-guard-service.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { role } from '../shared/role';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  
  constructor(
    private logicaGuard:LogicaGuardService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    return this.logicaGuard.permisosValidos([role.usuario,role.authenticated]);
  }
}
