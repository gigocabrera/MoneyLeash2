import { Component } from '@angular/core';

import { Platform, NavController, ModalController } from 'ionic-angular';
import { AppVersion } from 'ionic-native';

// app pages
import { AboutPage } from '../../../pages/about/about';
import { TouchIDPage } from '../../../pages/touchid/touchid';
import { PersonalProfilePage } from '../../myinfo/personalprofile/personalprofile';
import { AccountTypesPage } from '../../mysettings/accounttypes/accounttypes';
import { PickDefaultBalancePage } from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import { PickDefaultDatePage } from '../../mypicklists/pickdefaultdate/pickdefaultdate';

// services
import { AuthService } from '../../../providers/auth-service';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  appversion = '';
  imgsrc: string;
  
  constructor(
    public nav: NavController,
    public modalCtrl: ModalController,
    public platform: Platform,
    public auth: AuthService) {
    
    platform.ready().then(() => {
      AppVersion.getVersionNumber().then(ver => {
        this.appversion = ver;
      }).catch(function(error) {
        console.log(error);
      });
    });
  }

  openTouchID() {
    this.nav.push(TouchIDPage);
  }

  openPersonalProfile() {
    this.nav.push(PersonalProfilePage);
  }

  openAccountTypes() {
    this.nav.push(AccountTypesPage);
  }

  openAboutPage() {
    this.nav.push(AboutPage);
  }

  changeDefaltBalance() {
    let modal = this.modalCtrl.create(PickDefaultBalancePage, { balance: this.auth.user.defaultbalance });
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.auth.updateDefaultBalance(data.toString());
      }
    });
  }

  changeDefaltDate() {
    let modal = this.modalCtrl.create(PickDefaultDatePage, { date: this.auth.user.defaultdate });
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.auth.updateDefaultDate(data.toString());
      }
    });
  }

  upgradeData() {
    
    
  }

  houseMember() {
    
  }

  reportBug() {
    
  }

  suggestFeature() {
    
  }

}
