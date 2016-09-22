// angular
import {Component} from '@angular/core';

// ionic
import {Platform, NavController, ModalController} from 'ionic-angular';
import {AppVersion} from 'ionic-native';

// pages
import {AboutPage} from '../../../pages/about/about';
import {PersonalProfilePage} from '../../myinfo/personalprofile/personalprofile';
import {AccountTypesPage} from '../../mysettings/accounttypes/accounttypes';
import {PickDefaultBalancePage} from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import {PickDefaultDatePage} from '../../mypicklists/pickdefaultdate/pickdefaultdate';

// services
import {UserData} from '../../../providers/user-data';
import {UserInfo} from '../../../models/userinfo.model';

@Component({
  templateUrl: 'build/pages/mysettings/settings/settings.html'
})
export class SettingsPage {

  public appversion = '';
  public userSettings: any;
  public houseid: string;
  public imgsrc: string;
  public info: UserInfo[] = [];
  
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

  ionViewLoaded() {
    this.userSettings = this.userData.userSettings;
  }

  openPersonalProfile() {
    this.nav.push(PersonalProfilePage, {paramSettings: this.userSettings});
  }

  openAccountTypes() {
    this.nav.push(AccountTypesPage, {paramHouseid: this.userSettings.houseid});
  }

  openAboutPage() {
    this.nav.push(AboutPage);
  }

  toggleTouchID(e) {
    this.userData.updateTouchID(e.checked);
    this.userData.setEnableTouchID(e.checked);
  }

  changeDefaltBalance() {
    let modal = this.modalController.create(PickDefaultBalancePage, {paramBalance: this.userSettings.defaultbalance});
    modal.present(modal);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.userData.updateDefaultBalance(data);
      }
    });
  }

  changeDefaltDate() {
    let modal = this.modalController.create(PickDefaultDatePage, {paramDate: this.userSettings.defaultdate});
    modal.present(modal);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.userData.updateDefaultDate(data);
      }
    });
  }

}
