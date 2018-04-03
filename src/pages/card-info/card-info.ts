import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiScryfallProvider } from '../../providers/api-scryfall/api-scryfall';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * Generated class for the CardInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-info',
  templateUrl: 'card-info.html',
})
export class CardInfoPage {

  private cardId: string;
  private cardInfo = {};
  private loadComplete: boolean;
  private loading;
  private sideShown:boolean;
  private imagenLoaded:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _apiScryfallProvider: ApiScryfallProvider, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.imagenLoaded = false;
    this.sideShown = true;
    this.loadComplete = false;
    this.cardId = this.navParams.get('cardId');
    this.createLoader();
    this.presentLoadingDefault();
    this.getCardById();
  }

  getCardById() {
    this._apiScryfallProvider.getCardById(this.cardId).pipe(
      map((card: any) => {
        this.cardInfo = card;
        console.log(this.cardInfo);
      })
    ).catch((error) => {
      console.log(error);
      return Observable.throw(error);
    }).finally(() => {
      this.loadComplete = true;
      this.loading.dismiss();
    }).subscribe();
  }

  createLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando cartas...'
    });
  }

  presentLoadingDefault() {
    this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  changeSide(){
    this.sideShown = !this.sideShown;
  }

  changeLoaded(){
    this.imagenLoaded = !this.imagenLoaded;
  }
}
