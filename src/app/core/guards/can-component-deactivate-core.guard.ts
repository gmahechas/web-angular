import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanComponentDeactivateCoreGuard implements CanDeactivate<any> {
  canDeactivate(component: any): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
