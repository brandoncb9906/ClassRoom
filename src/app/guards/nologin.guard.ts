import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
   
  constructor(private AFauth: AngularFireAuth,
    private router : Router){
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AFauth.authState.pipe(map( auth => {
        // si no esta logueado que vaya al login 
        if(isNullOrUndefined(auth)){         
          return true;
        }else{
          // si esta logueado que vaya a home
          this.router.navigate(['./home']);
          return false;
        }
        //console.log(auth);
        //return false;
      }))
  }
  
}
