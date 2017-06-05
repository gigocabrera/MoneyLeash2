import { TutorialPage } from './tutorial/tutorial';
import { AccountListPage } from './mymoney/account-list/account-list';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = AccountListPage;