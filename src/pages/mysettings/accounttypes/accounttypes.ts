import { Component } from '@angular/core';

import { ModalController, NavParams } from 'ionic-angular';

// firebase
import { FirebaseListObservable } from 'angularfire2/database';

// app pages
import { AccountTypesEditPage } from '../../mysettings/accounttypesedit/accounttypesedit';

// services
import { AuthService } from '../../../providers/auth-service';

@Component({
  templateUrl: 'accounttypes.html'
})

export class AccountTypesPage {

  items: FirebaseListObservable<any[]>;
  item: {name?: string, icon?: string, $key?: string} = {};

  constructor( 
    public navParams: NavParams,
    public modalController: ModalController,
    public auth: AuthService) {}

  ionViewDidLoad() {
    this.items = this.auth.getAccountTypes();
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

  delete(item) {
    this.auth.deleteAccountType(item);
  }
  
  onAddType(item) {
    this.auth.addAccountType(item);
  }

  onEditType(item) {
    this.auth.updateAccountType(item);
  }

}