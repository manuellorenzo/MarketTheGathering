import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { listAllCardsPage } from '../pages/listAllCards/listAllCards';
import { CardInfoPage } from '../pages/card-info/card-info';
import { SigninPage } from '../pages/signin/signin';
import { RegisterPage } from '../pages/register/register';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiScryfallProvider } from '../providers/api-scryfall/api-scryfall';
import { OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../globals/firebaseConfig';
import { AuthProvider } from '../providers/auth/auth';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { MyWantsProvider } from '../providers/my-wants/my-wants';
import { MyWantsPage } from '../pages/my-wants/my-wants';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    listAllCardsPage,
    CardInfoPage,
    SigninPage,
    RegisterPage,
    ResetPasswordPage,
    MyWantsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.fire)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    listAllCardsPage,
    CardInfoPage,
    SigninPage,
    RegisterPage,
    ResetPasswordPage,
    MyWantsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiScryfallProvider,
    HttpClientModule,
    OAuthService,
    UrlHelperService,
    AngularFireAuth,
    AuthProvider,
    MyWantsProvider
  ]
})
export class AppModule { }
