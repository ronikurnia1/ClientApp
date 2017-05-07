import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { GlobalVarsService } from '../global-vars/index';

@Injectable()
export class BackendService {
    private appConfig: any = {};

    constructor(private http: Http) {
        this.appConfig = JSON.parse(localStorage.getItem("appConfig")) || {};
    }

    login(username: string, password: string): Observable<any> {
        // TODO: use this
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        return this.http.post('api/application/login',
            JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {
                if (response.json().result == "success") {
                    localStorage.setItem("appConfig", JSON.stringify(response.json().appConfig));
                    this.appConfig = response.json().appConfig || {};
                }
                return response.json();
            }).catch(this.handleError);

        // for testing only
        // return this.http.get('/assets/app-config.json')
        //     .map((response: Response) => {
        //         localStorage.setItem("appConfig", JSON.stringify(response.json().appConfig));
        //         // login successful if there's a jwt token in the response
        //         // let user = response.json();
        //         // if (user && user.token) {
        //         //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         //     localStorage.setItem('currentUser', JSON.stringify(user));
        //         // }
        //     }).catch(this.handleError);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('appConfig');
    }

    getAccessGroups(): Observable<any> {
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.appConfig.token);
        //console.log("Token:", this.appConfig.token);
        return this.http.get('api/accessgroups', { headers: headers })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    /**
    * Handle HTTP error
    */
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}