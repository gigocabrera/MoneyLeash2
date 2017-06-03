import { Component } from '@angular/core';

import { NavController, AlertController, ModalController, LoadingController, NavParams } from 'ionic-angular';

import { TutorialPage } from '../../../pages/tutorial/tutorial';
import { ChangeNamePage } from '../../../pages/myinfo/changename/changename';
import { ChangeEmailPage } from '../../../pages/myinfo/changeemail/changeemail';
import { ChangePasswordPage } from '../../../pages/myinfo/changepassword/changepassword';
import { PersonalProfilePhotoPage } from '../../../pages/myinfo/personalprofilephoto/personalprofilephoto';

import { AuthService } from '../../../providers/auth-service';

@Component({
  selector: 'page-personalprofile',
  templateUrl: 'personalprofile.html'
})

export class PersonalProfilePage {
  
  public userPicture: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public alertController: AlertController,
      public loadingController: LoadingController,
      public navParams: NavParams,
      public auth: AuthService) {}

  changeName() {
    let modal = this.modalController.create(ChangeNamePage, {paramFullName: this.auth.user.fullname});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.doChangeName(data);
      }
    });
  }

  takePicture() {
    this.nav.push(PersonalProfilePhotoPage);
  }

  changeEmail() {
    let modal = this.modalController.create(ChangeEmailPage, {paramSettings: this.auth.user.email});
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.doChangeEmail(data);
      }
    });
  }
  
  changePassword() {
    let modal = this.modalController.create(ChangePasswordPage);
    modal.present(modal);
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.doChangePassword(data);
      }
    });
  }

  deleteAll() {
    let alert = this.alertController.create({
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
          cssClass: 'alertDanger',
          handler: () => {
            this.doRemoveUserAndDeleteAllData();
          }
        }
      ]
    });
    alert.present();
  }

  doChangeName(newname): void {
    this.auth.updateName(newname);
  }
  
  doChangeEmail(newemail): void {

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.auth.updateEmail(newemail)
      .then(() => {
        //
        // Update localStorage with new email. This is to guaratee
        // that TouchID, if enabled, is still fully functional
        this.auth.storageSetEmail(newemail);
        //
        // Update email node under user profile 
        this.auth.updateEmailNode(newemail);
        //
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User email changed successfully!';
        this.DisplayResult(myAlert, loading, false);
      }        
    )
    .catch(
      (error) => {          
        switch (error.code) {
          case 'auth/invalid-email':
            myAlert.title = 'Invalid Email';
            myAlert.subtitle = 'The new email used is invalid!';
            break;
          case 'auth/email-already-in-use':
            myAlert.title = 'Email already in use';
            myAlert.subtitle = 'That email is already in use by another user!';
            break;
          case 'auth/requires-recent-login':
            myAlert.title = 'Session timed out';
            myAlert.subtitle = 'This action requires a recent login!';
            break;
        }
        this.DisplayResult(myAlert, loading, false);
      }
    );
  }
  
  doChangePassword(newpassword): void {

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.auth.updatePassword(newpassword)
      .then(() => {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'Password changed successfully!';
        this.DisplayResult(myAlert, loading, false);
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

  doRemoveUserAndDeleteAllData(): void {

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    // Delete data
    this.auth.deleteData();

    // Delete user
    this.auth.deleteUser()
      .then(() => {
        loading.dismiss();
        this.nav.setRoot(TutorialPage);
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

  doLogout(): void {
    this.auth.signOut();
    this.nav.setRoot(TutorialPage);
  }
  
  DisplayResult(myAlert, loading, logoff): void {

    loading.dismiss();

    let alert = this.alertController.create({
      title: myAlert.title,
      subTitle: myAlert.subtitle,
      buttons: [{
        text: 'OK',
        handler: () => {
          let navTransition = alert.dismiss();
          navTransition.then(() => {
            if (logoff) {
              this.doLogout();
            }
          });
        }
      }]
    });
    alert.present();
  }

  logout() {
    this.doLogout();
  }
  
}