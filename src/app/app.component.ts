import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { listAllCardsPage } from '../pages/listAllCards/listAllCards';
import { SigninPage } from '../pages/signin/signin';

import { AuthProvider } from '../providers/auth/auth';
import { MyWantsPage } from '../pages/my-wants/my-wants';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  private isAnonymous: boolean;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider, private menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'All cards', component: listAllCardsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.auth.afAuth.authState
        .subscribe(
          user => {
            if (user) {
              this.auth.setAnonymous(user.isAnonymous);    
              this.rootPage = HomePage;
              this.menu.enable(true);
            } else {
              this.rootPage = SigninPage;
            }
          },
          () => {
            this.rootPage = SigninPage;
          }
        );
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.signOut();
  }

  myWantsPage(){
    this.nav.setRoot(MyWantsPage);
  }
}
