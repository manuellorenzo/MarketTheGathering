import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ApiScryfallProvider } from '../../providers/api-scryfall/api-scryfall';
import { CardInfoPage } from '../card-info/card-info';

import { Observable } from 'rxjs/Observable';
import { map, concatMap, tap, mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/finally';
import { MyWantsProvider } from '../../providers/my-wants/my-wants';
import { AuthProvider } from '../../providers/auth/auth';
import { switchMap } from 'rxjs/operator/switchMap';

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
  private loadingPages;
  private nextPage = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _apiScryfallProvider: ApiScryfallProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private myWants: MyWantsProvider, private auth: AuthProvider) {
  }

  ngOnInit() {
    this.items = [];
  }

  ionViewDidLoad() {
    this.createLoader();
    this.presentLoadingDefault();
    this.getCardsByPage(null);
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

  getCardsByPage(infiniteScroll) {
    this.loadingPages = true;
    if (this.nextPage === null) {
      this._apiScryfallProvider.getCardsByPage(1).pipe(
        map((result: any) => {
          this.nextPage = result.next_page;
          console.log("Next page: " + this.nextPage);
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
          } else {
            this.items.push({
              name: String(card.name),
              frontImage: "",
              backImage: "",
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
    } else if (this.nextPage != undefined) {
      console.log("Enter not undefined: " + this.nextPage);
      this._apiScryfallProvider.getCardByUrl(this.nextPage).pipe(
        map((result: any) => {
          this.nextPage = result.next_page;
          console.log("Next page: " + this.nextPage);
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
        console.log("Finally undefined");
      }).catch((error) => {
        console.log(error);
        return Observable.throw(error);
      }).subscribe();
    } else {
      if (infiniteScroll != null) {
        console.log("Else infinitescroll: " + infiniteScroll.complete());
      }
    }
  }

  getCardByName(searchBar) {
    this.items = [];
    if (searchBar.srcElement.value != undefined && searchBar.srcElement.value.length > 0) {
      this._apiScryfallProvider.getCardByName(searchBar.srcElement.value).pipe(
        map((result: any) => {
          this.nextPage = result.next_page;
          console.log("Next page: " + this.nextPage);
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
          } else {
            this.items.push({
              name: String(card.name),
              frontImage: "",
              backImage: "",
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
      this.items = [];
      this.nextPage = null;
      this.getCardsByPage(null);
    }
  }

  loadMorePages(event) {
    if (!this.loadingPages) {
      this.getCardsByPage(event);
    }
  }

  showCardInfo(cardId: string) {
    this.navCtrl.push(CardInfoPage, { 'cardId': cardId });
  }

  showAlertChooseList(idCard: string) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lists');
    this.myWants.findMyWantsListByIdUser(this.auth.getUID()).pipe(
      map((result: any) => {
        return result.data;
      }),
      concatMap((resultData: any) => {
        return resultData;
      }),
      map((cards: any) => {
        console.log(cards);
        alert.addInput({
          type: 'checkbox',
          label: cards.name,
          value: cards._id,
          checked: false
        })
      })).finally(() => {
        alert.addButton('Cancel');
        alert.addButton({
          text: 'Okay',
          handler: data => {
            console.log('Checkbox data:', data);
            if (data.length > 0) {
              for (let list of data) {
                this.addCardToList(list, idCard);
              }
            }
          }
        });
        alert.present();
      }).subscribe();
  }

  addCardToList(id: string, idCard: string) {
    let cards: any = [];
    this.myWants.findMyWantsListById(id).pipe(
      mergeMap((result: any) => {
        cards = result.cards;
        if (!cards.some(card => card.idCard === idCard)) {
          cards.push({ 'idCard': idCard });
          console.log("Nuevas cartitas: " + JSON.stringify(cards));
          return this.myWants.updateMyWantsList(result._id, result.name, cards);
        } else {
          this.messageAlert("ERROR", "This card is already in that list");
          return Observable.of();
        }
      }),
      tap((result: any) => {
        this.messageAlert("SUCCESS","Card added successfully");
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
