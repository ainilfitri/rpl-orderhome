import { Component, ViewChild } from '@angular/core';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { Daftartoko } from '../pages/daftartoko/daftartoko';
import { OrderAddresPage } from '../pages/order-addres/order-addres';
import { PilihPage } from '../pages/pilih/pilih';
import { SignPage } from '../pages/sign/sign';
import { SignPageSeller } from '../pages/signup-seller/signup-seller';
import { AccountPage } from '../pages/account/account';
import { PopoverPage } from '../pages/popover/popover';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { TambahAddresPage } from '../pages/tambah/tambah';
import { StatusBar } from 'ionic-native';
import { Splashscreen } from 'ionic-native';
import { UserDataProvider } from '../providers/user-data';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'app.template.html'
})

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Daftartoko,
    Login,
    OrderAddresPage,
    PilihPage,
    SignPage,
    SignPageSeller,
    AccountPage,
    PopoverPage,
    UpdateProfilePage,
    TambahAddresPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Daftartoko,
    Login,
    OrderAddresPage,
    PilihPage,
    SignPage,
    SignPageSeller,
    AccountPage,
    PopoverPage,
    UpdateProfilePage,
    TambahAddresPage 

  ],
  providers: [
    StatusBar,
    Splashscreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider,
    Storage
  ]

})
export class AppModule {}
