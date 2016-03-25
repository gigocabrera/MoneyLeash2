import {Page, NavController, MenuController} from 'ionic-angular';
import {LoginPage} from '../login/login';


interface Slide {
  title: string;
  description: string;
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
        description: "Don't let your money run wild... <br />Keep it on a <b>leash!</b>",
        image: "img/moneyleash2_logo_01.png",
      },
      {
        title: "What is MoneyLeash?",
        description: "<b>Money Leash</b> is an open source money management app designed with the most advanced mobile technologies available. Track expenses, budgets, recurring bills, and much much more!",
        image: "img/moneyleash2_logo_03.png",
      },
      {
        title: " Why Should I Use it?",
        description: "With <b>Money Leash</b> you can tell your money where to go, instead of asking your money where it went!",
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
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
