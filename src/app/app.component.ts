import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { MenuProvider, ListProvider } from "../providers/list-index/list-index";
import { Observable } from "rxjs/Observable";
import { ListItem } from "../models/list-item";
import ListUtils from "../shared/list-utils";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  lists: Observable<ListItem[]>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuProvider: MenuProvider,
    public listProvider: ListProvider,
    public listUtils: ListUtils
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.lists = menuProvider.subscribe();
      this.lists.forEach((lists: ListItem[]) => {
        console.log("forEach:", lists);
        if (lists.length > 0) {
          this.openPage(lists[0]);
        }
      });
    });
  }

  openPage(list: ListItem) {
    console.log("openPage(${list})", list.name);
    this.listProvider.setList(list.name);
  }
}
