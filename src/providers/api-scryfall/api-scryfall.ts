import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urls  from '../../globals/url';

/*
  Generated class for the ApiScryfallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiScryfallProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiScryfallProvider Provider');
  }

  public getCardsByPage(nPage:number){
    return this.http.get(urls.scryfall+"cards?page="+nPage);
  }

  public getCardById(id:string){
    return this.http.get(urls.scryfall+"cards/"+id);
  }

  public getCardByName(name:string){
    return this.http.get(urls.scryfall+"cards/search?q="+name);
  }
}
