import { Component } from '@angular/core';

import { NavController, AlertController, ModalController, LoadingController, NavParams } from 'ionic-angular';

// app pages
import { ChangeNamePage } from '../../myinfo/changename/changename';
import { ChangeEmailPage } from '../../myinfo/changeemail/changeemail';
import { ChangePasswordPage } from '../../myinfo/changepassword/changepassword';
import { TutorialPage } from '../../tutorial/tutorial';
import { PersonalProfilePhotoPage } from '../../myinfo/personalprofilephoto/personalprofilephoto';

// services
import { UserData } from '../../../providers/user-data';

// firebase
declare var firebase: any;

@Component({
  selector: 'page-personalprofile',
  templateUrl: 'personalprofile.html'
})

export class PersonalProfilePage {
  
  public userPicture: any;
  public fireAuth: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public alertController: AlertController,
      public loadingController: LoadingController,
      public navParams: NavParams,
      public userData: UserData) {

        this.fireAuth = firebase.auth();

      }

  changeName() {
    let modal = this.modalController.create(ChangeNamePage, {paramFullName: this.userData.user.fullname});
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
    let modal = this.modalController.create(ChangeEmailPage, {paramSettings: this.userData.user.email});
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
    this.userData.updateName(newname);
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

    this.userData.updateEmail(newemail)
      .then(() => {
        //
        // Update localStorage with new email. This is to guaratee
        // that TouchID, if enabled, is still fully functional
        this.userData.setUserEmail(newemail);
        //
        // Update email node under user profile 
        this.userData.updateEmailNode(newemail);
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

    this.userData.updatePassword(newpassword)
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
    this.userData.deleteData();

    // Delete user
    this.userData.deleteUser()
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

  /*logout(): void {
    let alert = this.alertController.create({
      title: 'Please Confirm',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.doLogout();
          }
        }
      ]
    });
    alert.present();
  }*/

  doLogout(): void {
    this.fireAuth.signOut();
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