import {Page, NavController, MenuController, Alert} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/mymoney/categories-list/categories-list.html'
})

export class CategoryListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      private nav: NavController) {}
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}