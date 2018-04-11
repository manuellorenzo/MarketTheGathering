import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { AuthProvider } from '../../providers/auth/auth';

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

  public password: string = "";
  public email: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    let credentials = {
      email: this.email,
      password: this.password
    };
    this.auth.signUp(credentials).then(
      () => {
        this.navCtrl.pop();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Account created sucessfully',
          buttons: ['Dismiss']
        });
        alert.present();
      },
      error => {
        console.log("ERROR AL REGISTRAR:" + error);
        this.errorAlert(error);
      }
    );
  }

  errorAlert(error: any) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error.message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
