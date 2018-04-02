import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {ApiScryfallProvider} from '../../providers/api-scryfall/api-scryfall';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public _apiScryfallProvider: ApiScryfallProvider) {
    
  }

  ngOnInit(){
  }

}
