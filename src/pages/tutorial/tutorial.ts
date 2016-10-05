import { Component } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

// app pages
import { LoginPage } from '../login/login';

export interface Slide {
  title: string;
  description: string;
  icon: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public nav: NavController, public menu: MenuController) {
    this.slides = [
      {
        title: 'MoneyLeash',
        description: 'Don\'t let your money run wild... <br />Keep it on a <b>Leash!</b>',
        icon: 'fa fa-usd',
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: 'What is MoneyLeash?',
        description: '<b>Money Leash</b> is an open source money management app designed with the most advanced mobile technologies available. It will allow you to track expenses, budgets, recurring bills, and much much more!',
        icon: 'fa fa-lightbulb-o',
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: ' Why Should I Use it?',
        description: 'With <b>Money Leash</b> you can tell your money where to go, instead of asking your money where it went!',
        icon: 'fa fa-question',
        image: 'assets/img/ica-slidebox-img-3.png',
      }
    ];
  }

  startApp() {
    this.nav.push(LoginPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }

}