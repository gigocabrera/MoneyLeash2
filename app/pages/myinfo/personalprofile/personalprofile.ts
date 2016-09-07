import {Component} from '@angular/core';
import {NavController, Alert, AlertController, ActionSheet, Modal, ModalController, Loading, LoadingController, NavParams} from 'ionic-angular';
import {Camera} from 'ionic-native';

// Pages
import {ChangeNamePage} from '../../myinfo/changename/changename';
import {ChangeEmailPage} from '../../myinfo/changeemail/changeemail';
import {ChangePasswordPage} from '../../myinfo/changepassword/changepassword';
import {TutorialPage} from '../../tutorial/tutorial';
import {PersonalProfilePhotoPage} from '../../myinfo/personalprofilephoto/personalprofilephoto';

// Services
import {PersonalProfileData} from '../../../providers/personalprofile-data';
import {UserData} from '../../../providers/user-data';
import {FirebaseAuth} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/myinfo/personalprofile/personalprofile.html',
  providers: [PersonalProfileData]
})

export class PersonalProfilePage {
  
  public userSettings: any;
  public userPicture: any;

  constructor(
      public nav: NavController,
      public modalController: ModalController,
      public alertController: AlertController,
      public loadingController: LoadingController,
      public navParams: NavParams,
      public profileData: PersonalProfileData,
      public userData: UserData,
      public auth: FirebaseAuth) {}

  ngOnInit() {
    this.userSettings = this.navParams.data.paramSettings;
  }

  updateName() {
    let modal = this.modalController.create(ChangeNamePage);
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
    let modal = this.modalController.create(ChangeEmailPage);
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

  deleteAccount() {
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
          handler: () => {
            this.doRemoveUserAndDeleteAllData();
          }
        }
      ]
    });
    alert.present();
  }

  private doChangeName(newname): void {
    this.profileData.updateName(newname);
  }
  
  private doChangeEmail(newemail): void {

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.profileData.updateEmail(newemail)
      .then(() => {
        //
        // Update email displayed on the screen
        // TODO: THIS IS NOT UPDATING/WORKING
        this.userSettings.email = newemail;
        // Update localStorage with new email. This is to guaratee
        // that TouchID, if enabled, is still fully functional
        this.userData.setUsername(newemail);
        //
        // Update email node under user profile 
        this.profileData.updateEmailNode(newemail);
        //
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User email changed successfully!';
        this.DisplayResult(myAlert, loading, false);
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

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    this.profileData.updatePassword(newpassword)
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

  private doRemoveUserAndDeleteAllData(): void {

    let loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();

    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};

    // Delete data
    this.profileData.deleteData(this.userSettings.houseid);

    // Delete user
    this.profileData.deleteUser()
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

  private logout(): void {
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
  }

  private doLogout(): void {
    this.auth.logout();
    this.nav.setRoot(TutorialPage);
  }
  
  private DisplayResult(myAlert, loading, logoff): void {

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
  
}