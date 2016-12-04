import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthCheckerService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // get app modules from localStorage
        let appConfig: any = JSON.parse(localStorage.getItem("AppConfig")) || {};
        let moduleGroups: Array<any> = appConfig.moduleGroups;
        let modules: any[] = [];

        moduleGroups.forEach(itm => {
            modules = modules.concat(itm.modules);
        });

        //console.log("Route state:", state);
        //console.log("Activate route:", route);

        //return true;

        if (modules.find(m => this.checkModule(m, state.url))) {
            // logged in so return true
            return true;
        }

        //not logged in so redirect to login page
        this.router.navigate(['']);
        return false;
    }

    checkModule(module: any, path: string) {
        return module.longPath == path;
    }


}