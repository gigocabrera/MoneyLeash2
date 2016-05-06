import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {AccountListPage} from '../mymoney/account-list/account-list';
import {AuthService} from '../../providers/auth-service';

@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  //
  // The signup process consists of 3 steps: 
  // 1) Create user account in Firebase with the credentials provided 
  // 2) Authenticate user (login) in Firebase 
  // 3) Save personal data to member node (personal profile)
  //  
  showValidationMessage: boolean = false;
  signup: {
    firstname?: string,
    lastname?: string,
    email?: string, 
    password?: string
  } = {};
  user: {
    firstname?: string, 
    lastname?: string
  } = {};
  submitted = false;
  validationMessage = "";

  constructor(
    private nav: NavController,
    private menu: MenuController,
    private auth: AuthService) {}

  onSignup() {
    this.submitted = true;
    if (this.inputIsValid()) {
      // 1) Create user account in Firebase with the credentials provided
      this.auth.signUpWithEmailPassword(this.signup.email, this.signup.password)
      .then(() => this.SignUpSuccess())
      .catch((error) => this.SignUpError(error));
    }
  }
  
  private inputIsValid() : boolean {
    this.showValidationMessage = false;
    console.log(this.signup.firstname);
    if (this.signup.firstname == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter your first name';
      console.log(this.validationMessage);
      return false;
    }
    if (this.signup.lastname == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter your last name';
      return false;
    }
    if (this.signup.email == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter your email address';
      return false;
    }
    if (this.signup.password == null) {
      this.showValidationMessage = true;
      this.validationMessage = 'Please enter a password';
      return false;
    }
  }
  
  // 2) Authenticate user (login) in Firebase 
  private SignUpSuccess(): void {
    this.auth.signInWithEmailPassword(this.signup.email, this.signup.password)
      .then(() => this.LoginSuccess())
      .catch(() => this.LoginError());
  }
  
  private SignUpError(error): void {
    switch (error.code) {
      case "EMAIL_TAKEN":
          this.validationMessage = "The specified email is already in use"
          break;
      case "INVALID_EMAIL":
          this.validationMessage = "The specified email is not a valid email address"
          break;
      default:
          this.validationMessage = "Oops. Something went wrong"
    }
    let alert = Alert.create({
      title: 'Sign Up Failed',
      subTitle: this.validationMessage,
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  // 3) Save personal data to member node (personal profile)
  private LoginSuccess(): void {
    this.user.firstname = this.signup.firstname;
    this.user.lastname = this.signup.lastname;
    this.auth.ref.child('members').child(this.auth.id).update(this.user);    
    this.nav.setRoot(AccountListPage, {}, {animate: true, direction: 'forward'});
  }
  
  private LoginError(): void {
    let alert = Alert.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
  
  onPageDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  onPageDidLeave() {
    this.menu.enable(this.submitted);
    this.menu.swipeEnable(this.submitted);
  }
  
}
