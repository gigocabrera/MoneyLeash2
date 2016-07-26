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

  constructor(
    private nav: NavController,
    private userData: UserData,
    private db: FirebaseService) {}

    onPageWillEnter() {
      this.userData.autoLoginLocalStorage();
      this.doautologin();
    }

    doautologin() {
      this.db.loginauto(this.userData.username, this.userData.userpwd).then(() => {
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
