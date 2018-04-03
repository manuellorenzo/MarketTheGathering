import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { listAllCardsPage } from '../pages/listAllCards/listAllCards';
import { CardInfoPage } from '../pages/card-info/card-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiScryfallProvider } from '../providers/api-scryfall/api-scryfall';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    listAllCardsPage,
    CardInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    listAllCardsPage,
    CardInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiScryfallProvider,
    HttpClientModule
  ]
})
export class AppModule {}
