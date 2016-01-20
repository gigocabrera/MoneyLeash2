import {App, Platform, Config} from 'ionic/ionic';
import {TabsPage} from './pages/tabs/tabs';


@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {}
})
export class MyApp {
  constructor(platform: Platform) {
    this.root = TabsPage;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
