import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ApiScryfallProvider } from '../../providers/api-scryfall/api-scryfall';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username;
  constructor(public navCtrl: NavController, public _apiScryfallProvider: ApiScryfallProvider, private storage: Storage) {

  }

  ngOnInit() {

  }

}
