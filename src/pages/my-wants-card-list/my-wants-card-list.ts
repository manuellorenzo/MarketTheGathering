import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiScryfallProvider } from '../../providers/api-scryfall/api-scryfall';
import { CardInfoPage } from '../card-info/card-info';
import { MyWantsProvider } from '../../providers/my-wants/my-wants';
import { mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MyWantsCardListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-wants-card-list',
  templateUrl: 'my-wants-card-list.html',
})
export class MyWantsCardListPage {

  public cards = [];
  public list;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _apiScryfall: ApiScryfallProvider, private alertCtrl: AlertController,
    private myWants: MyWantsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyWantsCardListPage');
  }

  ionViewDidEnter() {
    this.list = this.navParams.get('list');
    console.log(JSON.stringify(this.list));
    this.getCards(this.list.cards);
  }

  getCards(cardsInsideList) {
    this.cards = [];
    for (let idCard of cardsInsideList) {
      this._apiScryfall.getCardById(idCard.idCard).subscribe((cardData: any) => {
        if (cardData.image_uris != undefined && cardData.image_uris != null) {
          this.cards.push({
            name: String(cardData.name),
            frontImage: String(cardData.image_uris.small),
            backImage: "",
            idCard: cardData.id
          });
        } else if (cardData.card_faces != undefined && cardData.card_faces != null) {
          this.cards.push({
            name: String(cardData.name),
            frontImage: String(cardData.card_faces[0].image_uris.small),
            backImage: String(cardData.card_faces[1].image_uris.small),
            idCard: cardData.id
          });
        } else {
          this.cards.push({
            name: String(cardData.name),
            frontImage: "",
            backImage: "",
            idCard: cardData.id
          });
        }
      })
    }
  }

  showCardInfo(idCard: string) {
    this.navCtrl.push(CardInfoPage, { 'idCard': idCard });
  }

  deleteCardFromList(idCard: string) {
    let newCards: any = [];
    this.myWants.findMyWantsListById(this.list._id).pipe(
      mergeMap((result: any) => {
        newCards = result.cards;
        if (newCards.some(card => card.idCard === idCard)) {
          newCards = [...newCards.filter((card) => card.idCard !== idCard)];
          console.log("n1 cards: "+newCards.length);
          return this.myWants.updateMyWantsList(result._id, result.name, newCards);
        } else {
          this.messageAlert("ERROR", "This card is not in " + this.list.name);
          return Observable.of();
        }
      }),
      tap((result: any) => {
        this.getCards(newCards);
        this.messageAlert("SUCCESS", "Card removed successfully");
      })
    ).subscribe();
  }

  messageAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
