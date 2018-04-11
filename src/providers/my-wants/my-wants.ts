import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urls from '../../globals/url';
/*
  Generated class for the MyWantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyWantsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MyWantsProvider Provider');
  }

  public findMyWantsListById(id: string) {
    return this.http.get(urls.myWantsListAPI + "findMyWantsListById/" + id);
  }

  public findMyWantsListByIdUser(idUser: string) {
    return this.http.get(urls.myWantsListAPI + "findMyWantsListByIdUser/" + idUser);
  }

  public addMyWantsList(idUser: string, name: string) {
    return this.http.post(urls.myWantsListAPI + "addMyWantsList/", { "idUser": idUser, "name": name, "cards": [] });
  }

  public updateMyWantsList(id: string, name: string, cards) {
    return this.http.put(urls.myWantsListAPI + "updateMyWantsList/" + id, { "name": name, "cards": cards });
  }

  public deleteMyWantsList(id: string) {
    return this.http.delete(urls.myWantsListAPI + "deleteMyWantsList/" + id);
  }

}
