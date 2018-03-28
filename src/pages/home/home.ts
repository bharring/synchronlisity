import { Component } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { ListProvider } from "../../providers/list-index/list-index";
import { ListItem } from "../../models/list-item";
import ListUtils from "../../shared/list-utils";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  items: Observable<ListItem[]>;
  title: string;
  listSubscription: Subscription;

  constructor(
    public afDatabase: AngularFireDatabase,
    public listProvider: ListProvider,
    public listUtils: ListUtils
  ) {
    this.listSubscription = this.listProvider.getList().subscribe(sub => {
      this.title = sub.name;
      this.items = sub.items;
    });
  }

  ionViewWillUnload() {
    this.listSubscription.unsubscribe();
  }
}
