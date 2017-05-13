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
                if (response.json().status == "success") {
                    localStorage.setItem("appConfig", JSON.stringify(response.json().payload));
                    this.appConfig = response.json().payload || {};
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

    // get all access group
    getAccessGroups(): Observable<any> {
        //console.log("Token:", this.appConfig.token);
        return this.http.get('api/accessgroups', { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getAccessGroupById(accessGroupId: string): Observable<any> {
        //console.log("Token:", this.appConfig.token);
        return this.http.get('api/accessgroups/' + accessGroupId, { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    registerAccessGroup(accessGroup: any): Observable<any> {
        return this.http.post('api/accessgroups/', accessGroup, { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    updateAccessGroup(accessGroup: any): Observable<any> {
        return this.http.put('api/accessgroups/', accessGroup, { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    unregisterAccessGroup(accessGroupIds: string[]): Observable<any> {
        return this.http.delete('api/accessgroups/', { headers: this.constructHeader(), body: accessGroupIds })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }


    // get all users
    getUsers(): Observable<any> {
        //console.log("Token:", this.appConfig.token);
        return this.http.get('api/users', { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    getUserById(userId: string): Observable<any> {
        //console.log("Token:", this.appConfig.token);
        return this.http.get('api/users/' + userId, { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    registerUser(user: any): Observable<any> {
        return this.http.post('api/users/', user, { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    updateUser(user: any): Observable<any> {
        return this.http.put('api/users/', user, { headers: this.constructHeader() })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }

    unregisterUser(userIds: string[]): Observable<any> {
        return this.http.delete('api/users/', { headers: this.constructHeader(), body: userIds })
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


    private constructHeader(): Headers {
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.appConfig.token);
        return headers;
    }
}