import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'changename.html'
})

export class ChangeNamePage { 

  newemail: string = '';

  constructor(
    public viewCtrl: ViewController) {}
  
  changeName(newname) {
    this.dismiss(newname);
  }
  
  dismiss(newname) {
    this.viewCtrl.dismiss(newname);
  }
    
}