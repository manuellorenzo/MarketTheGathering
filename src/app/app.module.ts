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
import { ApiRestProvider } from '../providers/api-rest/api-rest';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    listAllCardsPage,
    CardInfoPage,
    SigninPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    listAllCardsPage,
    CardInfoPage,
    SigninPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiScryfallProvider,
    HttpClientModule,
    ApiRestProvider
  ]
})
export class AppModule {}
