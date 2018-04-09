import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public username: string = "";
  public password: string = "";
  public email: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _apiRest: ApiRestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this._apiRest.register(this.email, this.username, this.password).subscribe((result:any) => {
      if(result.code === 200){
        console.log("Sucess");
      }else{
        console.log(JSON.stringify(result));
      }
    })
  }


}
