// angular
import {Component} from '@angular/core';

// ionic
import {ModalController, NavParams} from 'ionic-angular';

// pages
import {AccountTypesEditPage} from '../../mysettings/accounttypesedit/accounttypesedit';

// services
import {SettingsData} from '../../../providers/settings-data';

@Component({
  templateUrl: 'build/pages/mysettings/accounttypes/accounttypes.html',
  providers: [SettingsData]
})

export class AccountTypesPage {

  public items: {};

  constructor( 
    public navParams: NavParams,
    public modalController: ModalController,
    public settingsData: SettingsData) {}

  ionViewLoaded() {
    this.settingsData.getAccountTypes(this.navParams.data.paramHouseid).on('value', (snapshot) => {
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
        this.doAddEditType(data);
      }
    });
  }

  edit(item) {
    let modal = this.modalController.create(AccountTypesEditPage, {'paramItem': item});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.doAddEditType(data);
      }
    });
  }
  
  private doAddEditType(item): void {
    this.settingsData.updateAccountType(this.navParams.data.paramHouseid, item);
  }
}