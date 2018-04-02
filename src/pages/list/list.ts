import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ApiScryfallProvider } from '../../providers/api-scryfall/api-scryfall';

import { map, concatMap } from 'rxjs/operators';
import 'rxjs/add/operator/finally';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ name: string, image: string }>;
  private loading;
  private lastPageLoaded: number = 1;

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
    this._apiScryfallProvider.getCardsByPage(nPage).pipe(
      map((result: any) => {
        return result.data;
      }),
      concatMap((resultData: any) => {
        return resultData;
      }),
      map((card: any) => {
        if (card.image_uris != undefined || card.image_uris != null) {
          this.items.push({
            name: String(card.name),
            image: String(card.image_uris.small)
          });
        }
      })
    ).finally(() => {
      this.dismissLoading();
      if(infiniteScroll != null){
        infiniteScroll.complete();
      }
    }).subscribe((result) => {
      console.log(JSON.stringify(result));
    });
  }

  loadMorePages(event) {
    this.lastPageLoaded += 1;
    console.log(this.lastPageLoaded);
    this.getCardsByPage(this.lastPageLoaded,event);
  }
}
