import {Component} from '@angular/core';
import {NavController, Alert, Loading} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {AccountListPage} from '../mymoney/account-list/account-list';

// Firebase
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {FirebaseService} from '../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  
  showValidationMessage: boolean = false;
  submitted = false;
  validationMessage = "";
  alertMessage = '';

  constructor(
    private nav: NavController,
    private userData: UserData,
    private db: FirebaseService,
    private af: AngularFire) {}

  private inputIsValid(credentials) : boolean {
    this.showValidationMessage = false;
    this.validationMessage = '';    
    if (credentials.email == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter your email address';
      return false;
    }
    if (credentials.password == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter a password';
      return false;
    }
    return true;
  }
  
  doSignup(credentials, _event) {
    _event.preventDefault();
    this.submitted = true;
    if (this.inputIsValid(credentials)) {
      
      this.af.auth.createUser(credentials)
      .then((user) => {
        this.userData.saveLocalStorage(credentials);
        this.db.createInitialSetup(credentials);
        this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
      })
      .catch((error) => {
          this.SignUpError(error);
        }
      );
    }
  }
  
  private SignUpError(error): void {
    console.log(error);    
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
          this.alertMessage = "Your password is not strong enough!"
          break;
    }
    let alert = Alert.create({
      title: 'Sign Up Failed',
      subTitle: this.alertMessage,
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  private LoginError(): void {
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
}