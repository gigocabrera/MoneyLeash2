import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { AuthService } from '../../../providers/auth-service';

import { CategoryData } from '../../../providers/category-data';

import { CategoryPage } from '../category/category';

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
      public navCtrl: NavController,
      public alertController: AlertController,
      public auth: AuthService,
      public categoryData: CategoryData) {}
  
  ionViewDidLoad() {

    this.auth.getIncomeCategories().on('value', (incomecategories) => {
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

    this.auth.getExpenseCategories().on('value', (expensecategories) => {
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
    this.auth.LoadingControllerDismiss();

  }

  viewItemDetails() {
    console.log('feature coming soon');
  }
  
  addItem() {
    this.navCtrl.push(CategoryPage, { key: '0' });
  }

  editItem(slidingItem, item) {
    this.handleSlidingItems(slidingItem);
    this.navCtrl.push(CategoryPage, { categorytype: item.categorytype, key: item.$key });
  }

  deleteItem(slidingItem, item) {
    let alert = this.alertController.create({
      title: 'Delete Category',
      message: 'Are you sure you want to delete ' + item.categoryname + ' and ALL the transactions?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.handleSlidingItems(slidingItem);
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.handleSlidingItems(slidingItem);
            this.auth.deleteCategory(item);
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