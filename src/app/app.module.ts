import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
//import { Storage } from '@ionic/storage';

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
import { PersonalProfilePhotoPage } from '../pages/myinfo/personalprofilephoto/personalprofilephoto';

// mymoney
import { AccountPage } from '../pages/mymoney/account/account';
import { AccountListPage } from '../pages/mymoney/account-list/account-list';
import { BudgetListPage } from '../pages/mymoney/budget-list/budget-list';
import { CategoryListPage } from '../pages/mymoney/category-list/category-list';
import { PayeeListPage } from '../pages/mymoney/payee-list/payee-list';
import { RecurringListPage } from '../pages/mymoney/recurring-list/recurring-list';
import { ReportListPage } from '../pages/mymoney/report-list/report-list';

// mypicklists
import { PickDefaultBalancePage } from '../pages/mypicklists/pickdefaultbalance/pickdefaultbalance';
import { PickDefaultDatePage } from '../pages/mypicklists/pickdefaultdate/pickdefaultdate';
import { PickAccountTypePage } from '../pages/mypicklists/pickaccounttype/pickaccounttype';

// mysettings
import { AccountTypesPage } from '../pages/mysettings/accounttypes/accounttypes';
import { AccountTypesEditPage } from '../pages/mysettings/accounttypesedit/accounttypesedit';
import { SettingsPage } from '../pages/mysettings/settings/settings';

import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';

// services
import { AccountData } from '../providers/account-data';
import { UserData } from '../providers/user-data';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// YOUR SETTINGS GOES HERE!
export const firebaseConfig = {
  apiKey: "AIzaSyAjiJc9cXvd3bzl-aW0wbQC6sajr6RH5hg",
  authDomain: "brilliant-inferno-1044.firebaseapp.com",
  databaseURL: "https://brilliant-inferno-1044.firebaseio.com",
  storageBucket: "brilliant-inferno-1044.appspot.com",
  messagingSenderId: "1097950001655"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
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
    PersonalProfilePhotoPage,
    AccountPage,
    AccountListPage,
    BudgetListPage,
    CategoryListPage,
    PayeeListPage,
    RecurringListPage,
    ReportListPage,
    PickDefaultBalancePage,
    PickDefaultDatePage,
    PickAccountTypePage,
    AccountTypesPage,
    AccountTypesEditPage,
    SettingsPage,
    SignupPage,
    TutorialPage
  ],
  imports: [
    IonicModule.forRoot(MoneyLeashApp, {
      popoverEnter: 'popover-md-pop-in',
      popoverLeave: 'popover-md-pop-out'
    }),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
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
    PersonalProfilePhotoPage,
    AccountPage,
    AccountListPage,
    BudgetListPage,
    CategoryListPage,
    PayeeListPage,
    RecurringListPage,
    ReportListPage,
    PickDefaultBalancePage,
    PickDefaultDatePage,
    PickAccountTypePage,
    AccountTypesPage,
    AccountTypesEditPage,
    SettingsPage,
    SignupPage,
    TutorialPage
  ],
  providers: [AccountData, UserData]
})
export class AppModule {}
