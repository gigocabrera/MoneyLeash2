import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase service
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/loginauto/loginauto.html'
})

export class LoginAutoPage {

  submitted = false;
  useremail: '';
  userpwd: '';

  constructor(
    private nav: NavController,
    private userData: UserData,
    private db: FirebaseService) {

      this.userData.getUsernameStorage().then((username) => {
        this.useremail = username;
        console.log(this.useremail);
      });

      this.userData.getPasswordStorage().then((pwd) => {
        this.userpwd = pwd;
        console.log(this.userpwd);
      });

      this.autologin(this.useremail, this.userpwd);
    }

    autologin(email, pwd) {
      console.log('LOGIN AUTO START HERE');
      this.db.loginauto(email, pwd).then(() => {
          this.db.getMyPreferences();
          this.nav.setRoot(AccountListPage);
        }).catch(
        (error) => {
          let alert = Alert.create({
            title: 'Login Failed',
            subTitle: error.code,
            buttons: ['Ok']
          });
          this.nav.present(alert);
        }
      );
    }
  
}
