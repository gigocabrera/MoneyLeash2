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
    this.auth.getUserProfile(this.auth.id).then(thisUser => {this.user = thisUser;})
  }
    
  private presentActionSheet() {
    let actionSheet = ActionSheet.create({
      title: 'Manage your Account',
      buttons: [
        {
          text: 'Change Email',
          handler: () => {
            this.presentChangeEmail();
          }
        },
        {
          text: 'Change Password',
          handler: () => {
            this.presentChangePassword();
          }
        },
        {
          text: 'Reset Password',
          handler: () => {
            this.presentResetPassword();
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
            console.log('Cancel clicked');
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
  
  private presentChangeEmail() {
    let modal = Modal.create(ChangeEmailPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      console.log('on dismiss ChangeEmailPage');
      if (data) {
        //this.excludeTracks = data;
        //this.updateSchedule();
        console.log(data);
      }
    });
  }
  
  private presentChangePassword() {
    let modal = Modal.create(ChangePasswordPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      console.log('on dismiss ChangePasswordPage');
      if (data) {
        //this.excludeTracks = data;
        //this.updateSchedule();
        console.log(data);
      }
    });
  }
  
  private presentResetPassword() {
    let modal = Modal.create(ResetPasswordPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      console.log('on dismiss ResetPasswordPage');
      if (data) {
        //this.excludeTracks = data;
        //this.updateSchedule();
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
  
}