import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// app pages
import { AccountListPage } from '../mymoney/account-list/account-list';

// Services
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  
  signup: {fullname?: string, email?: string, password?: string} = {};
  submitted = false;
  alertMessage: any;

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    public userData: UserData) {}
  
  onSignup(form) {
    this.submitted = true;
    if (form.valid) {      
      this.userData.LoadingControllerShow();
      this.userData.createUser(this.signup).then(() => {
          this.SignupSuccess();
        }).catch(
        (error) => {
          this.userData.LoadingControllerDismiss();
          this.SignUpError(error);
        }
      );
    }
  }

  SignupSuccess() {
    setTimeout(() => {
        this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
      }, 1000);    
  }
  
  SignUpError(error): void {
    switch (error.code) {
      case "auth/email-already-in-use":
          this.alertMessage = "The specified email is already in use!"
          break;
      case "auth/invalid-email":
          this.alertMessage = "The specified email is not valid!"
          break;
      case "auth/operation-not-allowed":
          this.alertMessage = "Your account has been disabled. Please contact support!"
          break;
      case "auth/weak-password":
          this.alertMessage = "Password should be at least 6 characters!"
          break;
    }
    let alert = this.alertController.create({
      title: 'Sign Up Failed',
      subTitle: this.alertMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
  
}