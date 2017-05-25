import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignPage } from '../sign/sign';
import { SignPageSeller } from '../signup-seller/signup-seller';
/*
  Generated class for the PilihPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pilih',
  templateUrl: 'pilih.html'
})
export class PilihPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PilihPage');
  }
  customer(){
    this.navCtrl.push(SignPage);
  }
  seller(){
    this.navCtrl.push(SignPageSeller);
  }
}
