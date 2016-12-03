import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthCheckerService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // get app modules from localStorage
        let appConfig: any = JSON.parse(localStorage.getItem("AppConfig")) || {};
        let modules: any[] = appConfig.modules;

        //console.log("route:", route);

        if (modules.find(m => this.checkModule(m, route.url[0].path))) {
            // logged in so return true
            return true;
        }

        //this.router


        // not logged in so redirect to login page
        this.router.navigate(['']);
        return false;
    }

    checkModule(module: any, path: string) {
        return module.path == path;
    }


}