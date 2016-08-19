import {Component} from '@angular/core';
import {NavController, Alert, AlertController, Loading, LoadingController} from 'ionic-angular';

// Pages
import {AccountListPage} from '../mymoney/account-list/account-list';

// Services
import {UserData} from '../../providers/user-data';
import {SignUpData} from '../../providers/signup-data';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [SignUpData]
})
export class SignupPage {
  
  user = {'fullname': '', 'email': '', 'password': ''};
  submitted = false;
  alertMessage: any;

  constructor(
    public nav: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public userData: UserData,
    public signupData: SignUpData) { }
  
  doSignup(credentials, _event) {
    
    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    this.signupData.createUser(credentials).then(() => {
        this.userData.saveLocalStorage(credentials);
        this.signupData.createInitialSetup(credentials);
        this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
        loading.dismiss();        
      }).catch(
      (error) => {
        this.SignUpError(error);
        loading.dismiss();
      }
    );
  }
  
  private SignUpError(error): void {
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