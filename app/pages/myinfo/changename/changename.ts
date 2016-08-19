import {Component} from '@angular/core';
import {NavController, Alert, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/myinfo/changename/changename.html'
})

export class ChangeNamePage { 

  newemail: string = '';

  constructor(
    private nav: NavController,
    private viewCtrl: ViewController) {}
  
  changeName(newname) {
    this.dismiss(newname);
  }
  
  dismiss(newname) {
    this.viewCtrl.dismiss(newname);
  }
    
}