import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

/**
 * This class provide global variables service
 */
@Injectable()
export class GlobalVarsService {

    [key: string]: any;

    private config: { [key: string]: any } = {
        apiUrlDummy: "assets/",
        apiUrl: "http://54.169.219.45:8090/api/",
        apiUrlProxy: "/api/",
        firebaseUser: "roniku@gmail.com",
        firebasePwd: "St7465dsh!`+"
    };

    constructor(private http: Http) {
        // initialize config
        for (let itm in this.config) {
            this[itm] = this.config[itm.toString()];
        }
    }

    getValue(key: string): any {
        return this[key];
    }

    setValue(key: string, value: any) {
        this[key] = value;
    }

}
