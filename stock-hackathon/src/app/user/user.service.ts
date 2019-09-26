import { Injectable } from '@angular/core';
import { IUserResponse } from '../user/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    //userApiUrl: string = 'http://localhost:3000/users';
    //userApiUrl: string = 'http://10.117.189.81:8087/trading/api/login';
    userApiUrl: string = 'http://10.117.189.147:8087/trading/api/login';

    loginStatus: Subject<boolean> = new Subject<boolean>();

    /*This Function is to return loginStatus of user*/
    getLoginStatus(status) {
        this.loginStatus.next(status);
    }

    constructor(private _http: HttpClient) {

    }

    userLogin(requesrData): Observable<IUserResponse> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        //let params = new HttpParams().set("requestData", JSON.stringify(requesrData));

        return this._http.post<IUserResponse>(this.userApiUrl, requesrData);
    }

}