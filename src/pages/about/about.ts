import { Component } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  tab:Tabs;
  jumlahgalonaqua=0;
  jumlahgalonprima=0;
  jumlahgas1=0;
  jumlahgas3=0;
  constructor(public navCtrl: NavController) {
    this.tab = this.navCtrl.parent;
  }

  pesan(){
    this.tab.select(2);
    //this.navCtrl.push(ContactPage);
  }
  tambahgalonaqua(){
    this.jumlahgalonaqua++;
  }
  kuranggalonaqua(){
    if (this.jumlahgalonaqua>0){
    this.jumlahgalonaqua--;
    }
  }
  tambahgalonaprima(){
    this.jumlahgalonprima++;
  }
  kuranggalonprima(){
    if (this.jumlahgalonprima>0){
    this.jumlahgalonprima--;
    }
  }

  tambahgas3(){
    this.jumlahgas3++;
  }
  kuranggas3(){
    if(this.jumlahgas3>0){
      this.jumlahgas3--;
    }
  }
  
  tambahgas1(){
    this.jumlahgas1++;
  }
  kuranggas1(){
    if(this.jumlahgas1>0){
      this.jumlahgas1--;
    }
  }

}
