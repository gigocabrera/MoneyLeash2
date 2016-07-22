import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changeemail/changeemail.html'
})

export class ChangeEmailPage { 

  newemail: string = '';

  constructor(
    private nav: NavController,
    private viewCtrl: ViewController) {}
  
  changeEmail(newemail) {
    this.dismiss(newemail);
  }
  
  dismiss(newemail) {
    this.viewCtrl.dismiss(newemail);
  }
    
}