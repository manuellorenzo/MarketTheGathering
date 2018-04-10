import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { ResetPasswordPage } from '../reset-password/reset-password';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public email: string = "";
  public password: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private storage: Storage, private menuController: MenuController, private auth: AuthProvider) {
    menuController.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  login(): void {
    let credentials = {
      email: this.email,
      password: this.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => {
          this.navCtrl.setRoot(HomePage);
          this.menuController.enable(true);
        },
        (error) => { this.errorAlert() }
      );
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => {
          this.navCtrl.setRoot(HomePage);
          this.menuController.enable(true);
        },
        (error) => { 
          console.log("ERROR AL LOGIN WITH GOOGLE: "+error);
          this.errorAlert(); }
      );
  }

  resetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }
  registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  errorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Wrong credentials',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
