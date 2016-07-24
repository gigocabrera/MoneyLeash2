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
      private nav: NavController,
      private userData: UserData,
      private db: FirebaseService) {}
  
  save() {
    if (this.enabletouchid){
      this.userData.setEnableTouchID(true);
    } else {
      this.userData.setEnableTouchID(false);
    }    
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