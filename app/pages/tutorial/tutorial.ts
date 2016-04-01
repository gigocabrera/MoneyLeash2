import {Page, NavController, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';

interface Slide {
  title: string;
  description: string;
  icon: string;
  color: string;
  class: string;
  image: string;
}

@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(private nav: NavController, private menu: MenuController) {
    this.slides = [
      {
        title: "<strong>MoneyLeash</strong>",
        description: "Don't let your money run wild... <br />Keep it on a <b>Leash!</b>",
        icon: "fa fa-usd",
        color: "introGreen",
        class: "slide-title app-title",
        image: "img/moneyleash2_logo_01.png",
      },
      {
        title: "What is MoneyLeash?",
        description: "<b>Money Leash</b> is an open source money management app designed with the most advanced mobile technologies available. It will allow you to track expenses, budgets, recurring bills, and much much more!",
        icon: "fa fa-lightbulb-o",
        color: "introYellow",
        class: "slide-title",
        image: "img/moneyleash2_logo_03.png",
      },
      {
        title: " Why Should I Use it?",
        description: "With <b>Money Leash</b> you can tell your money where to go, instead of asking your money where it went!",
        icon: "fa fa-question",
        color: "introLightBlue",
        class: "slide-title",
        image: "img/moneyleash2_logo_02.png",
      }
    ];
  }

  startApp() {
    this.nav.setRoot(LoginPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }

  onPageWillLeave() {
    // do not enable the root left menu or swipe when leaving the tutorial page
    //this.menu.enable(true);
    //this.menu.swipeEnable(true);
  }

}
