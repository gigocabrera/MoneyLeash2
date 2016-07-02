import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {UserData} from '../../../providers/user-data';
import {MyInput} from '../../mydirectives/my-input/my-input';
import {MyToggle} from '../../mydirectives/my-toggle/my-toggle';
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/mysettings/security/security.html',
  directives: [MyInput, MyToggle]
})

export class SecurityPage {
  user: {
    email?: string,
    password?: string,
    enabletouchid?: string
  } = {};
  
  constructor(
      private nav: NavController,
      private userData: UserData,
      private fbservice: FirebaseService) {}
  
  save() {
    if (this.user.enabletouchid === "true"){
      this.user.enabletouchid = "false"
    } else {
      this.user.enabletouchid = "true"
    }

    this.fbservice.pickDefaultSecuritySelected(this.user.enabletouchid);
    this.fbservice.savePreferences();
    if (this.user.enabletouchid) {
      this.userData.setUserPwd(this.user.password);
    }
    this.nav.pop();
  }

  onPageWillEnter() {
    this.loadDefaults();
  }

  loadDefaults() {
    this.user.enabletouchid = this.fbservice.getDefaultSecuritySelected();
    this.userData.getUsernameStorage().then((username) => {
      this.user.email = username;
    });
    this.userData.getPasswordStorage().then((userpwd) => {
      this.user.password = userpwd;
    });
  }

  stateChange(event) {
    if (event.checked) {
      this.userData.getUsernameStorage().then((username) => {
        this.user.email = username;
      });
    } else {
      this.user.email = '';
      this.user.password = '';
    }
  }
  
}