import { Injectable } from "@angular/core";
import { AlertController, ActionSheetController } from "ionic-angular";
import { ListItem } from "../models/list-item";
import { ListIndexProvider } from "../providers/list-index/list-index";

@Injectable()
export default class ListUtils {
  constructor(
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {}

  addItem(provider: ListIndexProvider) {
    const prompt = this.alertCtrl.create({
      title: "Item Name",
      message: "Enter item name",
      inputs: [
        {
          name: "name",
          placeholder: "Name"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: () => console.log("Cancel clicked")
        },
        {
          text: "Save",
          handler: (item: ListItem) => provider.addItem(item)
        }
      ]
    });
    prompt.present();
  }
  showOptions(item: ListItem, provider: ListIndexProvider) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "What do you want to do?",
      buttons: [
        {
          text: "Delete Item",
          role: "destructive",
          handler: () => provider.removeItem(item)
        },
        {
          text: "Update name",
          handler: () => this.updateItem(item, provider)
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }
  updateItem(item: ListItem, provider: ListIndexProvider) {
    let prompt = this.alertCtrl.create({
      title: "Item Name",
      message: "Update item name",
      inputs: [
        {
          name: "name",
          placeholder: "Name",
          value: item.name
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: (item: ListItem) => provider.updateItem(item)
        }
      ]
    });
    prompt.present();
  }
}
