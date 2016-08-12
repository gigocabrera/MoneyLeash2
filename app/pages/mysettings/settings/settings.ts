import {Component} from '@angular/core';
import {Platform, NavController, ToastController, ModalController} from 'ionic-angular';
import {AppVersion} from 'ionic-native';

import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {ISettings} from '../../../models/settings-model';

import {AboutPage} from '../../../pages/about/about';
import {PersonalProfilePage} from '../../myinfo/personalprofile/personalprofile';
import {AccountTypesPage} from '../../mysettings/accounttypes/accounttypes';
import {PickDefaultBalancePage} from '../../mypicklists/pickdefaultbalance/pickdefaultbalance';
import {PickDefaultDatePage} from '../../mypicklists/pickdefaultdate/pickdefaultdate';

@Component({
  templateUrl: 'build/pages/mysettings/settings/settings.html'
})
export class SettingsPage {

  appversion = '';
  item: FirebaseObjectObservable<ISettings>;
  
  constructor(
    public nav: NavController,
    public toastController: ToastController,
    public modalController: ModalController,
    public platform: Platform,
    public af: AngularFire) {

    platform.ready().then(() => {
      AppVersion.getVersionNumber().then(ver => {
        this.appversion = ver;
      }).catch(function(error) {
        console.log(error);
      });
    });

    const path = '/users/' + firebase.auth().currentUser.uid;
    this.item = this.af.database.object(path);
  }
  
  openPersonalProfile() {
    this.nav.push(PersonalProfilePage);
  }

  openAccountTypes() {
    this.nav.push(AccountTypesPage, {paramHouseid: '-KNt_q97POfdtH4P2eyL'});
  }

  openAboutPage() {
    this.nav.push(AboutPage);
  }

  toggleTouchID(e) {
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({'enabletouchid' : e.checked});
  }

  changeDefaltBalance() {
    let modal = this.modalController.create(PickDefaultBalancePage, {paramBalance: 'Clear'});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        console.log(data);
        //Save selection to Firebase
      }
    });
  }

  changeDefaltDate() {
    let modal = this.modalController.create(PickDefaultDatePage, {paramDate: 'Today'});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        console.log(data);
        //Save selection to Firebase
      }
    });
  }

}