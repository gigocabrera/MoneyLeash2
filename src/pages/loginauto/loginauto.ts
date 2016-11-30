import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// app pages
import { LoginPage } from '../login/login';
import { AccountListPage } from '../mymoney/account-list/account-list';

// services
import { UserData } from '../../providers/user-data';

// firebase
declare var firebase: any;

@Component({
  templateUrl: 'loginauto.html'
})

export class LoginAutoPage {

  credentials: any;

  constructor(
    public nav: NavController,
    public userData: UserData) {

      this.userData.showLoadingController();

      // Get email from storage
      this.userData.getStorageEmail()
      .then((data) => {
        //console.log(this.userData.storageemail);
        
        // Get pwd from storage
        this.userData.getStoragePwd()
        .then((data) => {
          //console.log(this.userData.storagepwd);

          // Auto Login
          this.credentials = {email: this.userData.storageemail,password: this.userData.storagepwd};
          this.autoLogin(this.credentials);

        })
        .catch(
          (error) => {
            console.log(error);
            this.userData.dismissLoadingController();
          }
        );
      })
      .catch(
        (error) => {
          console.log(error);
          this.userData.dismissLoadingController();
        }
      );
    }

    autoLogin(credentials) {
      this.userData.login(credentials)
      .then(() => {
          this.LoginSuccess();
        }        
      )
      .catch(
        (error) => {     
          this.nav.setRoot(LoginPage);
          this.userData.dismissLoadingController();
        }
      );
    }

    LoginSuccess() {
      setTimeout(() => {
          this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
        }, 1000);    
    }

}