// angular
import {Component} from '@angular/core';

// ionic
import {Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changeemail/changeemail.html'
})

export class ChangeEmailPage { 

  newemail: string = '';

  constructor(
    public viewCtrl: ViewController) {}
  
  changeEmail(newemail) {
    this.dismiss(newemail);
  }
  
  dismiss(newemail) {
    this.viewCtrl.dismiss(newemail);
  }
    
}