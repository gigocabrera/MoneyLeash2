import {Page, NavController, Modal} from 'ionic-angular';
import {UserData} from '../../../providers/user-data';

@Page({
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
    //
    // TODO: xxx
    //
  }
  
}