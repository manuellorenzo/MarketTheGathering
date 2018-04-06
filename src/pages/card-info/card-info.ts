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
      })
    ).catch((error) => {
      console.log(error);
      return Observable.throw(error);
    }).finally(() => {
      if (this.cardInfo.card_faces != undefined) {
        this.cardInfo.card_faces[1].oracle_text = this.transformSymbols(this.cardInfo.card_faces[1].oracle_text);
        this.cardInfo.card_faces[0].oracle_text = this.transformSymbols(this.cardInfo.card_faces[0].oracle_text);
      }else{
        this.cardInfo.oracle_text = this.transformSymbols(this.cardInfo.oracle_text);
      }
      this.cardInfo.mana_cost = this.transformSymbols(this.cardInfo.mana_cost);
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

  transformSymbols(texto: string) {
    let oldText: string = texto;
    let symbols: { [s: string]: string; }[] = [
      { "{W}": "w" }, { "{U}": "u" }, { "{B}": "b" }, { "{R}": "r" }, { "{G}": "g" }, { "{C}": "c" },
      { "{P}": "p" }, { "{S}": "s" }, { "{X}": "x" }, { "{Y}": "y" }, { "{Z}": "z" }, { "{½}": "1-2" }, { "{∞}": "infinity" },
      { "{100}": "100" }, { "{1000000}": "1000000" }, { "{e}": "e" },
      { "{T}": "tap" }, { "{Q}": "untap" }, { "{PW}": "planeswalker" }, { "{W/U}": "wu ms-split" },
      { "{W/B}": "wb ms-split" }, { "{B/R}": "br ms-split" }, { "{B/G}": "bg ms-split" },
      { "{U/B}": "ub ms-split" }, { "{U/R}": "ur ms-split" }, { "{R/G}": "rg ms-split" },
      { "{R/W}": "rw ms-split" }, { "{G/W}": "gw ms-split" }, { "{G/U}": "gu ms-split" },
      { "{2/W}": "2w ms-split" }, { "{2/U}": "2u ms-split" }, { "{2/B}": "2b ms-split" },
      { "{2/R}": "2r ms-split" }, { "{2/G}": "wu ms-split" }, { "{W/P}": "wp" },
      { "{B/P}": "bp" }, { "{U/P}": "up" }, { "{R/P}": "rp" }, { "{G/P}": "up" },
    ];
    let symbolKey: string;
    let symbolValue: string;
    for (let i = 0; i < 21; i++) {
      symbolKey = String("{" + i + "}");
      symbolValue = String(i);
      let symbolObj: { [s: string]: string; } = {};
      symbolObj[symbolKey] = symbolValue;
      symbols.push(symbolObj);
    }
    for (let symbol of symbols) {
      let regex = new RegExp("\\" + Object.keys(symbol)[0], "g");
      if (oldText.indexOf(String(symbol))) {
        oldText = oldText.replace(regex, '<i class="ms ms-' + symbol[Object.keys(symbol)[0]] + ' ms-cost ms-shadow"></i>');
      }
    }
    return oldText;
  }
}
