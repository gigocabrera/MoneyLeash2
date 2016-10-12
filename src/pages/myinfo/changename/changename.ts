import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'changename.html'
})

export class ChangeNamePage { 

  newname: string = '';

  constructor(
    public viewCtrl: ViewController) {}
  
  changeName(newname) {
    this.viewCtrl.dismiss(newname);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
    
}