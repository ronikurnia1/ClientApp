import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthCheckerService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // get app modules from localStorage
        let appConfig: any = JSON.parse(localStorage.getItem("appConfig")) || {};
        let moduleGroups: Array<any> = appConfig.moduleGroups;

        if (!moduleGroups) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['login', { returnUrl: state.url }]);
            return false;
        }

        let modules: any[] = [];
        for (let i = 0; i < moduleGroups.length; i++) {
            modules = moduleGroups[i].modules;
            if (modules.some(itm => itm.longPath == state.url)) {
                return true;
            }
        }

        console.log("Forbidden");
        // not authorized (403) so redirect to not authorized page
        this.router.navigate(['home/forbidden']);
        return false;
    }

}