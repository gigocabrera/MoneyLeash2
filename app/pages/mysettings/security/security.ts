import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {UserData} from '../../../providers/user-data';

@Component({
  templateUrl: 'build/pages/mysettings/security/security.html'
})

export class SecurityPage {
  user: {
    email?: string,
    password?: string,
    enabletouchid?: string
  } = {};
  
  constructor(
      private nav: NavController,
      private userData: UserData) {
      }
  
  save() {
    this.userData.pickDefaultSecuritySelected(this.user.enabletouchid);
    this.userData.SavePreferences();
    if (this.user.enabletouchid) {
      this.userData.setUserPwd(this.user.password);
    }
    this.nav.pop();
  }

  onPageWillEnter() {
    this.loadDefaults();
  }

  loadDefaults() {
    this.user.enabletouchid = this.userData.getDefaultSecuritySelected();
    this.userData.getUsernameStorage().then((username) => {
      this.user.email = username;
    });
    this.userData.getPasswordStorage().then((userpwd) => {
      this.user.password = userpwd;
    });
  }

  stateChange(event) {
    if (!event.checked) {
      this.user.email = '';
      this.user.password = '';
    } else {
      this.userData.getUsernameStorage().then((username) => {
        this.user.email = username;
      });
    }
  }
  
}