import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

// services
import { UserData } from '../../../providers/user-data';
import { TransactionData } from '../../../providers/transaction-data';

@Component({
  selector: 'page-pickcategory',
  templateUrl: 'pickcategory.html'
})

export class PickCategoryPage {

  searchTerm: string = '';
  transaction;
  categoryList: any;
  loadedCategoryList: any;
  incomeCategories: {};
  expenseCategories: {};
  type: string;
   
  constructor(
      public nav: NavController,
      public userData: UserData,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {

    this.type = this.transactionData.getTransactionType();

    this.userData.getAllIncomeCategories().on('value', (incomecategories) => {
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

    this.userData.getAllExpenseCategories().on('value', (expensecategories) => {
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

    this.userData.dismissLoadingController();

  }

  selectCategory(category) {
    this.transactionData.setReferrer('PickCategoryPage');
    this.transactionData.setCategoryName(category.categoryname);
    this.transactionData.setCategoryID(category.$key);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}