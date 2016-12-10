import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string): Observable<string> {
        // TODO: use this
        //return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        
        // for testing only
        return this.http.get('/assets/app-config.json')
            .map((response: Response) => {
                localStorage.setItem("appConfig", JSON.stringify(response.json()));
                // login successful if there's a jwt token in the response
                // let user = response.json();
                // if (user && user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify(user));
                // }
            }).catch(this.handleError);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('appConfig');
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