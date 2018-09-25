import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<any> {
  canDeactivate(component: any): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(component);
    return true;
  }
}
