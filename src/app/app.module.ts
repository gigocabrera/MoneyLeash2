import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

import { MoneyLeashApp } from './app.component';

// app pages
import { AboutPage, PopoverPage } from '../pages/about/about';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { LoginPage } from '../pages/login/login';
import { LoginAutoPage } from '../pages/loginauto/loginauto';
import { LogoutPage } from '../pages/logout/logout';

// myinfo
import { ChangeEmailPage } from '../pages/myinfo/changeemail/changeemail';
import { ChangeNamePage } from '../pages/myinfo/changename/changename';
import { ChangePasswordPage } from '../pages/myinfo/changepassword/changepassword';
import { PersonalProfilePage } from '../pages/myinfo/personalprofile/personalprofile';
import { ProfileDetailsPage } from '../pages/myinfo/profiledetails/profiledetails';
import { PersonalProfilePhotoPage } from '../pages/myinfo/personalprofilephoto/personalprofilephoto';

// mymoney
import { AccountPage } from '../pages/mymoney/account/account';
import { AccountListPage } from '../pages/mymoney/account-list/account-list';
import { BudgetListPage } from '../pages/mymoney/budget-list/budget-list';
import { CategoryPage } from '../pages/mymoney/category/category';
import { CategoryListPage } from '../pages/mymoney/category-list/category-list';
import { PayeeListPage } from '../pages/mymoney/payee-list/payee-list';
import { PayeePage } from '../pages/mymoney/payee/payee';
import { RecurringListPage } from '../pages/mymoney/recurring-list/recurring-list';
import { ReportListPage } from '../pages/mymoney/report-list/report-list';
import { TransactionsPage } from '../pages/mymoney/transaction-list/transaction-list';
import { TransactionPage } from '../pages/mymoney/transaction/transaction';

// mypicklists
import { PickDefaultBalancePage } from '../pages/mypicklists/pickdefaultbalance/pickdefaultbalance';
import { PickDefaultDatePage } from '../pages/mypicklists/pickdefaultdate/pickdefaultdate';
import { PickAccountTypePage } from '../pages/mypicklists/pickaccounttype/pickaccounttype';
import { PickAccountNamePage } from '../pages/mypicklists/pickaccountname/pickaccountname';
import { PickCategoryTypePage } from '../pages/mypicklists/pickcategorytype/pickcategorytype';
import { PickCategoryParentPage } from '../pages/mypicklists/pickcategoryparent/pickcategoryparent';
import { PickTransactionTypePage } from '../pages/mypicklists/picktransactiontype/picktransactiontype';
import { PickAccountFromPage } from '../pages/mypicklists/pickaccountfrom/pickaccountfrom';
import { PickAccountToPage } from '../pages/mypicklists/pickaccountto/pickaccountto';
import { PickPayeePage } from '../pages/mypicklists/pickpayee/pickpayee';
import { PickCategoryPage } from '../pages/mypicklists/pickcategory/pickcategory';
import { PickAmountPage } from '../pages/mypicklists/pickamount/pickamount';
import { PickNotesPage } from '../pages/mypicklists/picknotes/picknotes';
import { PickPhotoPage } from '../pages/mypicklists/pickphoto/pickphoto';

// mysettings
import { AccountTypesPage } from '../pages/mysettings/accounttypes/accounttypes';
import { AccountTypesEditPage } from '../pages/mysettings/accounttypesedit/accounttypesedit';
import { SettingsPage } from '../pages/mysettings/settings/settings';

import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';

// services
import { AuthService } from '../providers/auth-service';
import { TransactionData } from '../providers/transaction-data';
import { AccountData } from '../providers/account-data';
import { CategoryData } from '../providers/category-data';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import 'gsap';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
}

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MoneyLeashApp,
  AboutPage,
  PopoverPage,
  ForgotPasswordPage,
  LoginPage,
  LoginAutoPage,
  LogoutPage,
  ChangeEmailPage,
  ChangeNamePage,
  ChangePasswordPage,
  PersonalProfilePage,
  ProfileDetailsPage,
  PersonalProfilePhotoPage,
  AccountPage,
  AccountListPage,
  BudgetListPage,
  CategoryPage,
  CategoryListPage,
  PayeeListPage,
  PayeePage,
  RecurringListPage,
  ReportListPage,
  TransactionsPage,
  TransactionPage,
  PickDefaultBalancePage,
  PickDefaultDatePage,
  PickAccountTypePage,
  PickAccountFromPage,
  PickAccountToPage,
  PickAccountNamePage,
  PickCategoryTypePage,
  PickCategoryParentPage,
  PickTransactionTypePage,
  PickPayeePage,
  PickCategoryPage,
  PickAmountPage,
  PickNotesPage,
  PickPhotoPage,
  AccountTypesPage,
  AccountTypesEditPage,
  SettingsPage,
  SignupPage,
  TutorialPage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Camera,
    AuthService,
    TransactionData,
    AccountData,
    CategoryData,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7a8e133b'
  }
};

// YOUR FIREBASE SETTINGS GO HERE!
export const firebaseConfig = {
  apiKey: "AIzaSyAjiJc9cXvd3bzl-aW0wbQC6sajr6RH5hg",
  authDomain: "brilliant-inferno-1044.firebaseapp.com",
  databaseURL: "https://brilliant-inferno-1044.firebaseio.com",
  projectId: "brilliant-inferno-1044",
  storageBucket: "brilliant-inferno-1044.appspot.com",
  messagingSenderId: "1097950001655"
};

/*const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}*/

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MoneyLeashApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    CloudModule.forRoot(cloudSettings),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
