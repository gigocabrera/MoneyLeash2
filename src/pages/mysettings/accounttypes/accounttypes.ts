import { Component } from '@angular/core';

import { ModalController, NavParams } from 'ionic-angular';

// firebase/angularfire
import { FirebaseListObservable } from 'angularfire2';

// app pages
import { AccountTypesEditPage } from '../../mysettings/accounttypesedit/accounttypesedit';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'accounttypes.html'
})

export class AccountTypesPage {

  items: FirebaseListObservable<any[]>;
  item: {name?: string, icon?: string, $key?: string} = {};

  constructor( 
    public navParams: NavParams,
    public modalController: ModalController,
    public userData: UserData) {}

  ionViewDidLoad() {
    this.items = this.userData.getAccountTypes();
  }

  addNew() {
    this.item = {};
    let modal = this.modalController.create(AccountTypesEditPage, {'paramItem': this.item});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.onAddType(data);
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
  
  onAddType(item) {
    this.userData.addAccountType(item);
  }

  onEditType(item) {
    this.userData.updateAccountType(item);
  }

}