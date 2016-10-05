import { Component } from '@angular/core';

import { ModalController, NavParams } from 'ionic-angular';

// app pages
import { AccountTypesEditPage } from '../../mysettings/accounttypesedit/accounttypesedit';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'accounttypes.html'
})

export class AccountTypesPage {

  public items: {};

  constructor( 
    public navParams: NavParams,
    public modalController: ModalController,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.userData.getAccountTypes(this.navParams.data.paramHouseid).on('value', (snapshot) => {
      let rawList= [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          icon: snap.val().icon
        });
      })
      this.items = rawList;
    });
  }

  addNew() {
    let modal = this.modalController.create(AccountTypesEditPage);
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onEditType(data);
      }
    });
  }

  edit(item) {
    let modal = this.modalController.create(AccountTypesEditPage, {'paramItem': item});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onEditType(data);
      }
    });
  }
  
  onEditType(item): void {
    this.userData.updateAccountType(this.navParams.data.paramHouseid, item);
  }
}