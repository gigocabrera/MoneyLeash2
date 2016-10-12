import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

// app pages
import { AccountListPage } from '../mymoney/account-list/account-list';

// Services
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  
  signup: {fullname?: string, username?: string, password?: string} = {};
  submitted = false;
  alertMessage: any;

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public userData: UserData) { }
  
  onSignup(form) {
    this.submitted = true;
    if (form.valid) {      
      let loading = this.loadingController.create({
        content: 'Please wait...'
      });
      loading.present();

      this.userData.createUser(this.signup).then(() => {
          //this.userData.saveLocalStorage(this.signup);
          this.userData.createInitialSetup(this.signup);
          this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
          loading.dismiss();
        }).catch(
        (error) => {
          this.SignUpError(error);
          loading.dismiss();
        }
      );
    }
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