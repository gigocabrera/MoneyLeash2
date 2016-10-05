import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'category-list.html'
})

export class CategoryListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
      public nav: NavController) {}
       
}