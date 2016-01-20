import {App, Platform, Config} from 'ionic/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {TutorialPage} from './pages/tutorial/tutorial';


@App({
  templateUrl: 'build/app.html',
  config: {}
})
export class MyApp {
  constructor(platform: Platform) {
    
    // We plan to add auth to only show the login page if not logged in
    this.root = TutorialPage;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
