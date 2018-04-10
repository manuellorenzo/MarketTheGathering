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

  public username: string = "";
  public password: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public _apiRestProvider: ApiRestProvider,
    private alertCtrl: AlertController, private storage: Storage, private menuController: MenuController, private auth: AuthProvider) {
    menuController.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  /*login() {
    this._apiRestProvider.login(this.username, this.password).subscribe((result: any) => {
      console.log(JSON.stringify(result));
      if (result.code === 200) {
        this.storage.set('username', result.username).then(() => {
          this.storage.set('_id', result._id).then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        });
      } else {
        this.errorAlert();
      }
    });
  }*/

  login(): void {
    let credentials = {
      email: this.username,
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
        (error) => { this.errorAlert() }
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
