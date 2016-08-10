import {Component} from '@angular/core';
import {Platform, PopoverController, ViewController, Popover} from 'ionic-angular';
import {AppVersion} from 'ionic-native';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
class PopoverPage {
  constructor(public viewCtrl: ViewController) {}
  close() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  
  conferenceDate = '2047-05-17';
  appversion = '';

  constructor(
    public popoverCtrl: PopoverController,
    public platform: Platform) {

    platform.ready().then(() => {
      AppVersion.getVersionNumber().then(ver => {
        this.appversion = ver;
        //this.userData.appversion = ver;
      }).catch(function(error) {
        console.log(error);
      });
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
  
}
