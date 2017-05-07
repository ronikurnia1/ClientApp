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

        // console.log("route params:", route.params);
        // console.log("state:", state);


        // for (let i = 0; i < navigations.length; i++) {
        //     let children: any[] = navigations[i].children;
        //     console.log("Url:", state.url);
        //     if (navigations[i].longPath === state.url || children.some(itm => itm.longPath === state.url)) {
        //         return true;
        //     }
        // }
        if (this.isRouteAccessible(state.url, navigations)) {
            return true;
        }
        console.log("Forbidden");
        // not authorized (403) so redirect to not authorized page
        this.router.navigate(['home/unauthorized']);
        return false;
    }

    isRouteAccessible(url: string, navigations: any[]): boolean {
        return navigations.some(nav => {
            //console.log("Url and path:", url, nav.longPath);
            let result: boolean = false;
            if (nav.children) {
                result = this.isRouteAccessible(url, nav.children);
                //console.log("result:", result);
            }
            let path: string = nav.longPath.split(":")[0] || nav.longPath;
            //let path = paths.length > 0 ? paths[0] : nav.longPath;
            return (path === url) || (url.indexOf(path) >= 0) || result;
        });
    }

}