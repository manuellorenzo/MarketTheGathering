import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ApiScryfallProvider } from '../../providers/api-scryfall/api-scryfall';
import { CardInfoPage } from '../card-info/card-info';

import { map, concatMap } from 'rxjs/operators';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'listAllCards-page',
  templateUrl: 'listAllCards.html'
})
export class listAllCardsPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ name: string, frontImage: string, backImage: string, cardId: string }>;
  private loading;
  private lastPageLoaded: number = 1;
  private loadingPages;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _apiScryfallProvider: ApiScryfallProvider, public loadingCtrl: LoadingController) {
    this.items = [];
  }

  ngOnInit() {
    this.createLoader;
  }

  ionViewDidLoad() {
    this.createLoader();
    this.presentLoadingDefault();
    this.getCardsByPage(this.lastPageLoaded, null);
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

  getCardsByPage(nPage: number, infiniteScroll) {
    this.loadingPages = true;
    this._apiScryfallProvider.getCardsByPage(nPage).pipe(
      map((result: any) => {
        return result.data;
      }),
      concatMap((resultData: any) => {
        return resultData;
      }),
      map((card: any) => {
        if (card.image_uris != undefined && card.image_uris != null) {
          this.items.push({
            name: String(card.name),
            frontImage: String(card.image_uris.small),
            backImage: "",
            cardId: card.id
          });
        } else if (card.card_faces != undefined && card.card_faces != null) {
          this.items.push({
            name: String(card.name),
            frontImage: String(card.card_faces[0].image_uris.small),
            backImage: String(card.card_faces[1].image_uris.small),
            cardId: card.id
          });
        }
      })
    ).finally(() => {
      this.dismissLoading();
      this.loadingPages = false;
      if (infiniteScroll != null) {
        infiniteScroll.complete();
      }
    }).subscribe();
  }

  loadMorePages(event) {
    if (!this.loadingPages) {
      this.lastPageLoaded += 1;
      console.log(this.lastPageLoaded);
      this.getCardsByPage(this.lastPageLoaded, event);
    }
  }

  showCardInfo(cardId: string) {
    this.navCtrl.push(CardInfoPage, { 'cardId': cardId });
  }
}
