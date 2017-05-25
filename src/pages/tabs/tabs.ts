import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Daftartoko } from '../daftartoko/daftartoko';
import { OrderAddresPage } from '../order-addres/order-addres';
import { AccountPage } from '../account/account';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = Daftartoko;
  tab5Root = OrderAddresPage;

  constructor() {

  }
}
