import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

export interface Slide {
  title: string;
  icon: string;
  color: string;
  class: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(private nav: NavController, private menu: MenuController) {
    this.slides = [
      {
        title: '<strong>MoneyLeash</strong>',
        description: 'Don\'t let your money run wild... <br />Keep it on a <b>Leash <i class="fa fa-heart-o"></i></b>',
        icon: 'fa fa-usd',
        color: 'introGreen',
        class: 'slide-title app-title',
        image: '',
      },
      {
        title: 'What is MoneyLeash?',
        description: '<b>MoneyLeash</b> is an open source, money management app designed with the most advanced mobile technologies available. It will allow you to track expenses, budgets, recurring bills, and much much more!',
        icon: 'fa fa-lightbulb-o',
        color: 'introYellow',
        class: 'slide-title',
        image: '',
      },
      {
        title: ' Why Should I Use it?',
        description: 'With <b>MoneyLeash</b> you can tell your money where to go, instead of asking your money where it went!',
        icon: 'fa fa-question',
        color: 'introLightBlue',
        class: 'slide-title',
        image: '',
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
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
