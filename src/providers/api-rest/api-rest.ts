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

}
