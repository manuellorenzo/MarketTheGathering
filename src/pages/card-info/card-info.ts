import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  private cardInfo = {name: "1"};

  constructor(public navCtrl: NavController, public navParams: NavParams, private _apiScryfallProvider: ApiScryfallProvider) {
  }

  ngOnInit() {
    this.cardId = this.navParams.get('cardId');
    this.getCardById();
  }

  getCardById() {
    this._apiScryfallProvider.getCardById(this.cardId).pipe(
      map((card: any) => {

        if (card.image_uris != undefined && card.image_uris != null) {
        } else if (card.card_faces != undefined && card.card_faces != null) {
        }
        this.cardInfo = card;
        console.log(this.cardInfo);
      })
    ).catch((error) => {
      console.log(error);
      return Observable.throw(error);
    }).subscribe();
  }

}
