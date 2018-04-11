import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWantsPage } from './my-wants';

@NgModule({
  declarations: [
    MyWantsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWantsPage),
  ],
})
export class MyWantsPageModule {}
