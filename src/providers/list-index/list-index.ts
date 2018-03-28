import { Injectable } from "@angular/core";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ServerValue } from "@firebase/database";
import { ListItem } from "../../models/list-item";

/*
  Generated class for the ListIndexProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export abstract class ListIndexProvider {
  index: AngularFireList<any>;

  constructor(public afDatabase: AngularFireDatabase) {}

  addItem(item: ListItem) {
    const newListRef = this.index.push({});

    newListRef.set({
      id: newListRef.key,
      name: item.name,
      active: true,
      updated: ServerValue.TIMESTAMP
    });
  }
  removeItem(item: ListItem) {
    this.index.remove(item.id);
  }
  updateItem(item: ListItem) {
    this.index.update(item.id, {
      name: item.name,
      active: item.active,
      updated: ServerValue.TIMESTAMP
    });
  }
}

@Injectable()
export class MenuProvider extends ListIndexProvider {
  constructor(public afDatabase: AngularFireDatabase) {
    super(afDatabase);
  }

  subscribe(): Observable<ListItem[]> {
    this.index = this.afDatabase.list("/lists");
    return this.index.valueChanges();
  }
}

@Injectable()
export class ListProvider extends ListIndexProvider {
  private subject = new Subject<any>();

  constructor(public afDatabase: AngularFireDatabase) {
    super(afDatabase);
  }

  setList(name: string) {
    this.index = this.afDatabase.list(name);
    this.subject.next({ name: name, items: this.index.valueChanges() });
  }

  getList(): Observable<any> {
    return this.subject.asObservable();
  }
}
