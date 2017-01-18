import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

//import { FirebaseListObservable } from 'angularfire2';

// app pages
import { CategoryPage } from '../category/category';

// services
import {UserData} from '../../../providers/user-data';
import { CategoryData } from '../../../providers/category-data';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})

export class CategoryListPage {

  incomeCategories: {};
  expenseCategories: {};
  previousgroup: string;
  previouscategory: string;

  constructor(
      public nav: NavController,
      public alertController: AlertController,
      public userData: UserData,
      public categoryData: CategoryData) {}
  
  ionViewDidLoad() {

    this.userData.getIncomeCategories().on('value', (incomecategories) => {
      let rawList= [];
      incomecategories.forEach( spanshot => {
        var cat = spanshot.val();
        rawList.push({
          $key: spanshot.key,
          categoryname: cat.categoryname,
          categorytype: cat.categorytype,
          categoryparent: cat.categoryparent,
          categorysort: cat.categorysort
        });
      });
      this.incomeCategories = rawList;
    });

    this.userData.getExpenseCategories().on('value', (expensecategories) => {
      let rawList= [];
      expensecategories.forEach( spanshot => {
        var cat = spanshot.val();
        rawList.push({
          $key: spanshot.key,
          categoryname: cat.categoryname,
          categorytype: cat.categorytype,
          categoryparent: cat.categoryparent,
          categorysort: cat.categorysort
        });
      });
      this.expenseCategories = rawList;
    });

    // Disable loading controller when the promise is complete
    this.userData.LoadingControllerDismiss();

  }
  
  newCategory() {
    var category = {
          '$key': '',
          'categoryname': '',
          'categoryparent': '',
          'categorysort': '',
          'categorytype': '',
          'mode': 'New'
        }
    this.nav.push(CategoryPage, {paramCategory: category});
  }

  edit(slidingItem, category) {
    this.categoryData.setReferrer('CategoryListPage');
    this.nav.push(CategoryPage, { paramCategory: category, paramMode: 'Edit' });
  }

  delete(slidingItem, category) {
    let alert = this.alertController.create({
      title: 'Delete Category',
      message: 'Are you sure you want to delete ' + category.categoryname + ' and ALL the transactions?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel RemoveUser clicked');
            this.handleSlidingItems(slidingItem);
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.handleSlidingItems(slidingItem);
            this.userData.deleteCategory(category);
          }
        }
      ]
    });
    alert.present();
  }

  showTransactions() {
    console.log('TO DO: show transactions view');
  }

  handleSlidingItems(slidingItem) {
    // Close any open sliding items when the page updates
    slidingItem.close();
  }
  
}