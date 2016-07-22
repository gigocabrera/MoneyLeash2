import {Component} from '@angular/core';
import {NavController, Alert, ActionSheet, Modal, Loading} from 'ionic-angular';
import {ChangeEmailPage} from '../../myinfo/changeemail/changeemail';
import {ChangePasswordPage} from '../../myinfo/changepassword/changepassword';
import {TutorialPage} from '../../tutorial/tutorial';
import {UserData} from '../../../providers/user-data';

// Firebase service
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/myinfo/personalprofile/personalprofile.html'
})

export class PersonalProfilePage {
  
  useremail: string;

  constructor(
      private nav: NavController,
      private userData: UserData,
      public db: FirebaseService) { }
  
  ngAfterViewInit() {
    this.getUsername();
  }

  getUsername() {
    this.useremail = this.db.currentUserEmail();
  }

  updatePicture() {
    console.log('Update picture clicked');
  }

  changeEmail() {
    let modal = Modal.create(ChangeEmailPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        this.doChangeEmail(data);
      }
    });
  }
  
  changePassword() {
    let modal = Modal.create(ChangePasswordPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        this.doChangePassword(data);
      }
    });
  }

  deleteAccount() {
    this.nav.present(
      Alert.create({
        title: 'Please Confirm',
        message: 'Are you sure you want to delete your account and ALL your data?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              //console.log('Cancel RemoveUser clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.doRemoveUser();
            }
          }
        ]
      })
    )
  }
  
  private doChangeEmail(newemail): void {

    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);
        
    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.db.updateEmail(newemail)
      .then(() => {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User email changed successfully!';
        this.DisplayResult(myAlert, loading, false);
        this.useremail = this.db.currentUserEmail();
      }        
    )
    .catch(
      (error) => {          
        switch (error.code) {
          case "auth/invalid-email":
            myAlert.title = 'Invalid Email';
            myAlert.subtitle = 'The new email used is invalid!';
            break;
          case "auth/email-already-in-use":
            myAlert.title = 'Email already in use';
            myAlert.subtitle = 'That email is already in use by another user!';
            break;
          case "auth/requires-recent-login":
            myAlert.title = 'Session timed out';
            myAlert.subtitle = 'This action requires a recent login!';
            break;
        }
        this.DisplayResult(myAlert, loading, false);
      }
    );

  }
  
  private doChangePassword(newpassword): void {

    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.db.updatePassword(newpassword)
      .then(() => {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'Password changed successfully!';
        this.DisplayResult(myAlert, loading, false);
        this.useremail = this.db.currentUserEmail();
      }        
    )
    .catch(
      (error) => {          
        switch (error.code) {
          case "auth/weak-password":
            myAlert.title = 'Weak Password';
            myAlert.subtitle = 'Your new password is not strong enough!';
            break;
          case "auth/requires-recent-login":
            myAlert.title = 'Session timed out';
            myAlert.subtitle = 'This action requires a recent login!';
            break;
        }
        this.DisplayResult(myAlert, loading, false);
      }
    );
    
  }

  private doRemoveUser(): void {
    
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.db.deleteUser()
      .then(() => {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User account deleted successfully!';
        this.DisplayResult(myAlert, loading,true);
      }        
    )
    .catch(
      (error) => {          
        switch (error.code) {
          case "auth/requires-recent-login":
            myAlert.title = 'Session timed out';
            myAlert.subtitle = 'This action requires a recent login!';
            break;
        }
        this.DisplayResult(myAlert, loading, false);
      }
    );
  }
  
  private DisplayResult(myAlert, loading, logoff): void {

    loading.dismiss();

    let alert = Alert.create({
      title: myAlert.title,
      subTitle: myAlert.subtitle,
      buttons: [{
        text: 'OK',
        handler: () => {
          let navTransition = alert.dismiss();
          navTransition.then(() => {
            if (logoff) {
              this.db.logout();
              this.nav.setRoot(TutorialPage);
            }
          });
        }
      }]
    });
    this.nav.present(alert);
  }
  
}