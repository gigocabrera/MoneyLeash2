import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {FirebaseRef} from 'angularfire2';

@Page({
  templateUrl: 'build/pages/myinfo/myinfo.html'
})

export class MyInfoPage { 
  user: {
    firstname?: string, 
    lastname?: string, 
    email?: string,
    datecreated?: Date
  } = {};
        
  constructor(
      private nav: NavController) {}
  
  onPageDidEnter() {
    //this.auth.getUserProfile(this.auth.id).then(thisUser => {this.user = thisUser;})
  }
  
  removeUser() {
    console.log("remove user here");
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