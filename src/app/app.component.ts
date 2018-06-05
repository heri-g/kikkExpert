import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { AuthProvider } from "../providers/auth";

import { HomePage } from '../pages/home/home';
import { FeedPage } from '../pages/feed/feed';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{icon: any; title: string, component: any}>;

  homeIcon: string = 'home-outline';
  feedIcon: string = 'stats-outline';
  aboutIcon: string = 'information-circle-outline';
  contactIcon: string = 'chatbubbles-outline';

  private signoutBtn: boolean;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private auth: AuthProvider, 
    private iab: InAppBrowser
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: this.homeIcon, title: 'Home', component: HomePage },
      { icon: this.feedIcon, title: 'Stock Feed', component: FeedPage },
      { icon: this.aboutIcon, title: 'About', component: AboutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.signoutBtn = true;
        } else {
          this.signoutBtn = false;
        }
      },
      () => {
        this.signoutBtn = true;
      }
    );

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.signOut();
    this.signoutBtn = false;
		this.nav.setRoot(HomePage);
  }
  
  contactUs(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
    }

    let target = "_blank";
    const browser = this.iab.create(url,target,options);

    browser.show();
  }

}
