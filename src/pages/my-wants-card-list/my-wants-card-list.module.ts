import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWantsCardListPage } from './my-wants-card-list';

@NgModule({
  declarations: [
    MyWantsCardListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWantsCardListPage),
  ],
})
export class MyWantsCardListPageModule {}
