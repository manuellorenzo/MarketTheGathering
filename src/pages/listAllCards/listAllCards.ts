import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ApiScryfallProvider } from '../../providers/api-scryfall/api-scryfall';
import { CardInfoPage } from '../card-info/card-info';

import { Observable } from 'rxjs/Observable';
import { map, concatMap } from 'rxjs/operators';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'listAllCards-page',
  templateUrl: 'listAllCards.html'
})
export class listAllCardsPage {
  /*//Workaround done here because ion-img was not working with the virtual list
  //More info here https://github.com/ionic-team/ionic/issues/9660#issuecomment-304840427
  @ViewChild(Content) _content: Content;
  ngAfterViewInit() {
    if (this._content) {
      this._content.imgsUpdate = () => {
        if (this._content._scroll.initialized && this._content._imgs.length && this._content.isImgsUpdatable()) {
          // reset cached bounds
          this._content._imgs.forEach((img: Img) => img._rect = null);
          // use global position to calculate if an img is in the viewable area
          updateImgs(this._content._imgs, this._content._cTop * -1, this._content.contentHeight, this._content.directionY, 1400, 400);
        }
      };
    }
  }*/

  selectedItem: any;
  icons: string[];
  items: Array<{ name: string, frontImage: string, backImage: string, cardId: string }>;
  private loading;
  private lastPageLoaded: number = 1;
  private loadingPages;
  private searching;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _apiScryfallProvider: ApiScryfallProvider, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.items = [];
    this.searching = false;
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
    if (!this.searching) {
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
      }).catch((error) => {
        console.log(error);
        return Observable.throw(error);
      }).subscribe();
    }else{
      infiniteScroll.complete();
    }
  }

  getCardByName(searchBar) {
    if (searchBar.srcElement.value != undefined && searchBar.srcElement.value.length > 0) {
      this.items = [];
      this.searching = true;
      this._apiScryfallProvider.getCardByName(searchBar.srcElement.value).pipe(
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
      }).catch((error) => {
        console.log(error);
        return Observable.throw(error);
      }).subscribe();
    } else {
      this.searching = false;
      this.items = [];
      this.getCardsByPage(1, null);
    }
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
