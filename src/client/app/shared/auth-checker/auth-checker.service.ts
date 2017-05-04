import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthCheckerService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // get app modules from localStorage
        let appConfig: any = JSON.parse(localStorage.getItem("appConfig")) || {};
        let navigations: Array<any> = appConfig.navigations;

        // check token expiration
        let expiration: string = appConfig.expiration;
        let currentDate: string = new Date().toISOString();
        if (!navigations || !expiration || expiration <= currentDate) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['login', { returnUrl: state.url }]);
            return false;
        }
        if (state.url === '/home/unauthorized') {
            // no need to check
            return true;
        }

        for (let i = 0; i < navigations.length; i++) {
            let children: any[] = navigations[i].children;
            if (navigations[i].longPath === state.url || children.some(itm => itm.longPath === state.url)) {
                return true;
            }
        }

        console.log("Forbidden");
        // not authorized (403) so redirect to not authorized page
        this.router.navigate(['home/unauthorized']);
        return false;
    }

}