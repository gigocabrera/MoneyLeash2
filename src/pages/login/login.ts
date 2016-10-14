import { Component } from '@angular/core';

import { AlertController, MenuController , NavController } from 'ionic-angular';

// app pages
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { AccountListPage } from '../mymoney/account-list/account-list';

// services
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  login: {email?: string, password?: string} = {};
  submitted = false;
  //public fireAuth: any;

  constructor(
    public alertController: AlertController,
    public menuCtrl: MenuController,
    public navCtrl: NavController, 
    public userData: UserData) {

    this.login.email = 'paulina@test.com';
    this.login.password = '111111';

   }

  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      this.userData.login(this.login)
      .then(() => {
          this.LoginSuccess();
        }        
      )
      .catch(
        (error) => {          
          this.LoginError(error);
        }
      );
    }
  }

  LoginSuccess() {
    this.navCtrl.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});    
  }

  LoginError(error) {
    let alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //do handler stuff here
          }
        }
      ]
    });
    alert.present();
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  onForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
  }

}