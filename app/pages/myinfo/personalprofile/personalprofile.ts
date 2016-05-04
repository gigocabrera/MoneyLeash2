import {Page, NavController, Alert, ActionSheet, Modal} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service';
import {ChangeEmailPage} from '../../myinfo/changeemail/changeemail';
import {ChangePasswordPage} from '../../myinfo/changepassword/changepassword';
import {ResetPasswordPage} from '../../myinfo/resetpassword/resetpassword';

@Page({
  templateUrl: 'build/pages/myinfo/personalprofile/personalprofile.html'
})

export class PersonalProfilePage { 
  user: {
    firstname?: string, 
    lastname?: string, 
    email?: string,
    datecreated?: Date
  } = {};
        
  constructor(
      private nav: NavController,
      private auth: AuthService) {}
  
  onPageDidEnter() {
    this.refreshUser();
  }
  
  private refreshUser() {
    this.auth.getUserProfile(this.auth.id).then(thisUser => {
      this.user = thisUser;
      this.user.email = this.auth.authData.password.email;
    })
  }
    
  private presentActionSheet() {
    let actionSheet = ActionSheet.create({
      title: 'Manage your Account',
      buttons: [
        {
          text: 'Change Email',
          handler: () => {
            this.modalChangeEmail();
          }
        },
        {
          text: 'Change Password',
          handler: () => {
            this.modalChangePassword();
          }
        },
        {
          text: 'Reset Password',
          handler: () => {
            this.modalResetPassword();
          }
        },
        {
          text: 'Delete Account',
          role: 'destructive',
          handler: () => {
            new Promise(function(resolve, reject) {
              setTimeout(() => resolve(), 400);
            })
            .then(res => {
              this.nav.present(
                Alert.create({
                  title: 'ARE YOU SURE?',
                  message: 'This will also delete ALL your data!',
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Delete',
                      handler: () => {
                        this.removeUser();
                      }
                    }
                  ]
                }))
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    this.nav.present(actionSheet);
  }
  
  private saveUser(user) {
    this.auth.ref.child('members').child(this.auth.id).update(this.user);
    let alert = Alert.create({
      title: 'Saved Successfully',
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      }]
    });
    this.nav.present(alert);
  }
  
  private modalChangeEmail() {
    let modal = Modal.create(ChangeEmailPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        this.doChangeEmail(data);
      }
    });
  }
  
  private modalChangePassword() {
    let modal = Modal.create(ChangePasswordPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        console.log(data);
      }
    });
  }
  
  private modalResetPassword() {
    let modal = Modal.create(ResetPasswordPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        console.log(data);
      }
    });
  }
  
  private removeUser(): void {
    console.log('removeUser here');
    /*let credentials = {
        email: 'gigo@test.com',
        password: '123'
      }*/
      /*this.ref.removeUser(credentials, (error: Error) => {
        if (error) {
          console.error('ERROR @ removeUser() :', error);
          //reject(error);
        }
        else {
          //resolve();
        }
      });*/
  }
  
  private doChangeEmail(data): void {
    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};
    this.auth.ref.changeEmail({
      oldEmail: data.oldemail,
      newEmail: data.newemail,
      password: data.password
    }, (error) => {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            myAlert.title = 'Invalid Password';
            myAlert.subtitle = 'The specified user account password is incorrect.';
            break;
          case "INVALID_USER":
            myAlert.title = 'Invalid User';
            myAlert.subtitle = 'The specified user account does not exist.';
            break;
          default:
            myAlert.title = 'Error creating user';
            myAlert.subtitle = error;
        }
      } else {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User email changed successfully!';
      }
      
      // We need to authenticate user again with new email to refresh auth token
      this.auth.signInWithEmailPassword(data.newemail, data.password)
      .then(() => this.LoginResult(myAlert))
      .catch(() => this.LoginResult(myAlert));
    });
    
  }
  
  private LoginResult(myAlert): void {
    let alert = Alert.create({
      title: myAlert.title,
      subTitle: myAlert.subtitle,
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      }]
    });
    this.nav.present(alert);
  } 
  
}