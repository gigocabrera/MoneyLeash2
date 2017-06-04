import { Component } from '@angular/core';

import { ModalController, AlertController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../../../providers/auth-service';

import { AccountTypesEditPage } from '../../mysettings/accounttypesedit/accounttypesedit';

@Component({
  templateUrl: 'accounttypes.html'
})

export class AccountTypesPage {

  items: FirebaseListObservable<any[]>;
  item: {name?: string, icon?: string, $key?: string} = {};

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    public auth: AuthService) {}

  ionViewDidLoad() {
    this.items = this.auth.getAccountTypes();
  }

  addItem() {
    this.item = {};
    let modal = this.modalController.create(AccountTypesEditPage, {'paramItem': this.item});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.addAccountType(data);
      }
    });
  }

  editItem(item) {
    let modal = this.modalController.create(AccountTypesEditPage, {'paramItem': item});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.editAccountType(data);
      }
    });
  }

  deleteItem(slidingItem, item) {
    let alert = this.alertController.create({
      title: 'Delete Account Type',
      message: 'Are you sure you want to delete this account type?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.handleSlidingItems(slidingItem);
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.handleSlidingItems(slidingItem);
            this.auth.deleteAccountType(item);
          }
        }
      ]
    });
    alert.present();
  }
  
  addAccountType(item) {
    this.auth.addAccountType(item);
  }

  editAccountType(item) {
    this.auth.updateAccountType(item);
  }

  handleSlidingItems(slidingItem) {
    // Close any open sliding items when the page updates
    slidingItem.close();
  }

}