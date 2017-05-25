import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { UserDataProvider } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  name: string;
  email: string;
  PhoneNumber: number;


  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserDataProvider) {

  }

  ngAfterViewInit() {
    this.getUsername();
    this.getName();
    this.getEmail();
    this.getPhoneNumber();

  }


  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing


  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  getName() {
    this.userData.getName().then((username) => {
      this.name = username;
    });
  }
  getPhoneNumber() {
    this.userData.getPhoneNumber().then((username) => {
      this.PhoneNumber = username;
    });
  }
  getEmail() {
    this.userData.getEmail().then((username) => {
      this.email = username;
    });
  }
  logout() {
    this.userData.logout();
    this.nav.setRoot(Login);
  }
  update() {
    this.nav.setRoot(UpdateProfilePage);
  }
//  updateProfile() {
//    this.nav.setRoot(UpdateProfilePage);
//  }
}
