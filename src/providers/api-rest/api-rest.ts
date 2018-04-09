import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urls from '../../globals/url';

/*
  Generated class for the ApiRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiRestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiRestProvider Provider');
  }

  public login(username: string, password: string) {
    console.log(username+"--"+password);
    return this.http.post(urls.apiRest + "/login", { 'username': username, 'password': password });
  }

  public register(email:string,username:string,password:string){
    return this.http.post(urls.apiRest+"/addUser", {'email': email, 'username': username, 'password': password});
  }

}
