import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {UserData} from '../../../providers/user-data';
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/mysettings/security/security.html'
})

export class SecurityPage {
  
  enabletouchid: string = '';

  constructor(
      public nav: NavController,
      public userData: UserData,
      public db: FirebaseService) {}
  
  save() {
    this.userData.setEnableTouchID(this.enabletouchid);
    this.db.pickDefaultSecuritySelected(this.enabletouchid);
    this.db.saveMyPreferences();
    this.nav.pop();
  }

  onPageWillEnter() {
    this.loadDefaults();
  }

  loadDefaults() {
    this.enabletouchid = this.db.getDefaultSecuritySelected();
  }

  getEnableTouchID() {
    this.userData.getEnableTouchIDStorage().then((touchid) => {
      this.enabletouchid = touchid;
    });
  }
  
}