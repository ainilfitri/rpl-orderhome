import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data';
import { Login } from "../login/login";

/*
  Generated class for the VerifikasiAkunPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-verifikasi-akun',
  templateUrl: 'verifikasi-akun.html'
})
export class VerifikasiAkunPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifikasiAkunPage');
  }

}
