import {Component} from '@angular/core';
import {Platform, NavController, ModalController} from 'ionic-angular';
import {AppVersion} from 'ionic-native';

// Pages
import {AboutPage} from '../../../pages/about/about';
import {PersonalProfilePage} from '../../myinfo/personalprofile/personalprofile';
import {AccountTypesPage} from '../../mysettings/accounttypes/accounttypes';
import {PickDefaultBalancePage} from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import {PickDefaultDatePage} from '../../mypicklists/pickdefaultdate/pickdefaultdate';

// Services
import {SettingsData} from '../../../providers/settings-data';

@Component({
  templateUrl: 'build/pages/mysettings/settings/settings.html',
  providers: [SettingsData]
})
export class SettingsPage {

  public appversion = '';
  public userSettings: any;
  public houseid: string;
  public imgsrc: string;
  
  constructor(
    public nav: NavController,
    public modalController: ModalController,
    public platform: Platform,
    public settingsData: SettingsData) {

    platform.ready().then(() => {
      AppVersion.getVersionNumber().then(ver => {
        this.appversion = ver;
      }).catch(function(error) {
        console.log(error);
      });
    });

    this.settingsData.getSettingsData().on('value', (data) => {
      this.userSettings = data.val();
      this.houseid = this.userSettings.houseid;
    });
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
    this.settingsData.updateTouchID(e.checked);
  }

  changeDefaltBalance() {
    let modal = this.modalController.create(PickDefaultBalancePage, {paramBalance: this.userSettings.defaultbalance});
    modal.present(modal);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.settingsData.updateDefaultBalance(data);
      }
    });
  }

  changeDefaltDate() {
    let modal = this.modalController.create(PickDefaultDatePage, {paramDate: this.userSettings.defaultdate});
    modal.present(modal);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.settingsData.updateDefaultDate(data);
      }
    });
  }

}