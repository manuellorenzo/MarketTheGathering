import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MyWantsProvider } from '../../providers/my-wants/my-wants';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the MyWantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-wants',
  templateUrl: 'my-wants.html',
})
export class MyWantsPage {

  lists: Array<JSON> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private myWantsProvider: MyWantsProvider, private auth: AuthProvider,
    private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log("UID USER: " + this.auth.getUID());
    this.loadLists();
  }

  loadLists() {
    this.myWantsProvider.findMyWantsListByIdUser(this.auth.getUID()).subscribe((result: any) => {
      console.log(JSON.stringify(result));
      this.lists = result.data;
    });
  }

  addList(idUser: string, name: string) {
    this.myWantsProvider.addMyWantsList(idUser, name).subscribe((result: any) => {
      if (result.code == 200) {
        this.loadLists();
      } else {
        this.messageAlert("ERROR", result.error);
      }
    });
  }

  showAlertAddList() {
    let alert = this.alertCtrl.create({
      title: 'New List',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            if (data.name.length != 0) {
              this.addList(this.auth.getUID(), data.name);
            } else {
              this.showErrorToast("Invalid list name");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  showAlertEditList(list) {
    let alert = this.alertCtrl.create({
      title: 'Edit List',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            if (data.name.length != 0) {
              list.name = data.name;
              this.editList(list);
            } else {
              this.showErrorToast("Invalid list name");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  editList(list){
    this.myWantsProvider.updateMyWantsList(list._id,list.name,list.cards).subscribe((result:any)=>{
      if(result.code == 200){
        this.messageAlert("Edit", "List edited successfully");
        this.loadLists();
      }else{
        this.messageAlert("ERROR", result.error);
      }
    })
  }

  deleteList(id: string) {
    this.myWantsProvider.deleteMyWantsList(id).subscribe((result: any) => {
      if (result.code == 200) {
        this.messageAlert("Success", "List deleted successfully");
        this.loadLists();
      } else {
        this.messageAlert("ERROR", "Error deleting the list");
      }
    });
  }

  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  messageAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
