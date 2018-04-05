import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

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
  templateUrl: 'card-info.html'
})
export class CardInfoPage {

  private cardId: string;
  private cardInfo: any = {};
  private loadComplete: boolean;
  private loading;
  private sideShown: boolean;
  private imagenLoaded: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _apiScryfallProvider: ApiScryfallProvider, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
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
        console.log(JSON.stringify(this.cardInfo));
      })
    ).catch((error) => {
      console.log(error);
      return Observable.throw(error);
    }).finally(() => {
      this.transformOracleText();
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

  changeSide() {
    this.sideShown = !this.sideShown;
  }

  showLegalFormats() {
    let formatText: string =
      'Estandar: ' + this.transformFormat(this.cardInfo.legalities.standard) +
      '\nFuture: ' + this.transformFormat(this.cardInfo.legalities.future) +
      '\nFrontier: ' + this.transformFormat(this.cardInfo.legalities.frontier) +
      '\nModern: ' + this.transformFormat(this.cardInfo.legalities.modern) +
      '\nLegacy: ' + this.transformFormat(this.cardInfo.legalities.legacy) +
      '\nPauper: ' + this.transformFormat(this.cardInfo.legalities.pauper) +
      '\nVintage: ' + this.transformFormat(this.cardInfo.legalities.vintage) +
      '\nPenny: ' + this.transformFormat(this.cardInfo.legalities.penny) +
      '\nCommander: ' + this.transformFormat(this.cardInfo.legalities.commander) +
      '\nCommander 1v1: ' + this.transformFormat(this.cardInfo.legalities["1v1"]) +
      '\nDuel: ' + this.transformFormat(this.cardInfo.legalities.duel) +
      '\nBrawl: ' + this.transformFormat(this.cardInfo.legalities.brawl)
    let alert = this.alertCtrl.create({
      title: 'Legalities',
      subTitle: formatText
    });
    alert.present();
  }

  transformFormat(oldFormat: string) {
    if (oldFormat === 'legal') {
      return 'Legal';
    } else if (oldFormat === 'banned') {
      return 'Banned';
    } else if (oldFormat === 'not_legal') {
      return 'Not legal';
    } else if (oldFormat === 'restricted') {
      return 'Restricted';
    }
  }

  transformOracleText() {
    let oldText: string = this.cardInfo.oracle_text;
    let newText: string = "";
    let symbols = [
      { "{W}": "w" }, { "{U}": "u" }, { "{B}": "b" }, { "{R}": "r" }, { "{G}": "g" }, { "{C}": "c" },
      { "{P}": "p" }, { "{S}": "s" }, { "{X}": "x" }, { "{Y}": "y" }, { "{Z}": "z" }, { "{½}": "1-2" }, { "{∞}": "infinity" }, { "{100}": "100" }, { "{1000000}": "1000000" }, { "{e}": "e" }
    ];
    for (let i = 0; i < 21; i++) {
      symbols["{"+i+"}"] = i;
    }

    console.log(JSON.stringify(symbols));
    for (let symbol of symbols) {
      let regex = new RegExp("\\" + symbol, "g");
      console.log("Symbol: " + symbol);
      if (oldText.indexOf(String(symbol))) {
        oldText = oldText.replace(regex, '<i class="ms ms- ms-cost ms-shadow"></i>');
      }
    }
    if (oldText.indexOf("{½}")) {
      let regex = new RegExp("{½}", "g");
      oldText = oldText.replace(regex, '<i class="ms ms-1-2"></i>');
    }
    if (oldText.indexOf("{∞}")) {
      let regex = new RegExp("{∞}", "g");
      oldText = oldText.replace(regex, '<i class="ms ms-infinity"></i>');
    }
    this.cardInfo.oracle_text = oldText;
    this.loadComplete = true;
    this.loading.dismiss();
  }
}
