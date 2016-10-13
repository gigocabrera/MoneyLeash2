import { Component } from '@angular/core';

import { Platform, NavController, ModalController } from 'ionic-angular';
import { AppVersion } from 'ionic-native';

// app pages
import { AboutPage } from '../../../pages/about/about';
import { PersonalProfilePage } from '../../myinfo/personalprofile/personalprofile';
import { AccountTypesPage } from '../../mysettings/accounttypes/accounttypes';
import { PickDefaultBalancePage } from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import { PickDefaultDatePage } from '../../mypicklists/pickdefaultdate/pickdefaultdate';

// services
import { UserData } from '../../../providers/user-data';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  appversion = '';
  settings: any;
  houseid: string;
  imgsrc: string;
  
  constructor(
    public nav: NavController,
    public modalController: ModalController,
    public platform: Platform,
    public userData: UserData) {

    platform.ready().then(() => {
      AppVersion.getVersionNumber().then(ver => {
        this.appversion = ver;
      }).catch(function(error) {
        console.log(error);
      });
    });
  }

  ionViewDidLoad() {
    this.settings = this.userData.user;
  }

  openPersonalProfile() {
    this.nav.push(PersonalProfilePage, {paramSettings: this.settings});
  }

  openAccountTypes() {
    this.nav.push(AccountTypesPage, {paramHouseid: this.settings.housekey});
  }

  openAboutPage() {
    this.nav.push(AboutPage);
  }

  toggleTouchID(e) {
    this.userData.updateTouchID(e.checked)
  }

  changeDefaltBalance() {
    let modal = this.modalController.create(PickDefaultBalancePage, {paramBalance: this.settings.defaultbalance});
    modal.present(modal);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.userData.updateDefaultBalance(data);
      }
    });
  }

  changeDefaltDate() {
    let modal = this.modalController.create(PickDefaultDatePage, {paramDate: this.settings.defaultdate});
    modal.present(modal);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.userData.updateDefaultDate(data);
      }
    });
  }

}
