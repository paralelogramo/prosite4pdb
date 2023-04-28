import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxNotifierService } from 'ngx-notifier';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    toast: any;

    constructor(
        private ngxNotifierService: NgxNotifierService,
        private cookieService: CookieService,
        private router: Router
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            let accessToken = this.cookieService.get('accessToken');
            if (accessToken) {
                return true;
            }
            this.router.navigate(['/login']);
            this.ngxNotifierService.createToast('You are not logged in', 'danger', 3000);
            return false;
    }

}
