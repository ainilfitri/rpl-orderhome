import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { UserDataProvider } from '../../providers/user-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username:string;
  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public popoverCtrl: PopoverController,
            public userDataProvider: UserDataProvider) {

  }

  ionViewWillEnter(){
    this.userDataProvider.getUsername().then((value)=>{
      this.username = value;
      console.log(value);
    });

  }
  presentPopover(event: Event) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({ ev: event });
    }
}
