import { Component } from '@angular/core';

import { Platform, NavController, ModalController } from 'ionic-angular';
import { AppVersion } from 'ionic-native';

// app pages
import { AboutPage } from '../../../pages/about/about';
import { PersonalProfilePage } from '../../myinfo/personalprofile/personalprofile';
import { ProfileDetailsPage } from '../../myinfo/profiledetails/profiledetails';
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

  openPersonalProfile() {
    
  }

  openAccountTypes() {
    
  }

  openAboutPage() {
    this.nav.push(AboutPage);
  }

  toggleTouchID(e) {
    
  }

  changeDefaltBalance() {
    let modal = this.modalCtrl.create(PickDefaultBalancePage);
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        
      }
    });
  }

  changeDefaltDate() {
    let modal = this.modalCtrl.create(PickDefaultDatePage);
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        
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
