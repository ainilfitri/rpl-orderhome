import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';


@Injectable()
export class UserDataProvider {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  public loginState = false;
  public token;
  public ids;
  public input: string;
  public jwt: any;
  public out;

  constructor(public events: Events, public storage: Storage, public http: Http) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }



  setId(id) {
    this.storage.set('user_id', id);
  }

  login(user_id,username,user_status,name,phone_number,email) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_id', user_id);
    this.storage.set('username', username);
    this.storage.set('user_status', user_status);
    this.storage.set('name',name);
    this.storage.set('phone_number',phone_number);
    this.storage.set('email',email);
    this.events.publish('user:login');
    this.loginState = true;
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('username',username);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user_id');
    this.storage.remove('username');
    this.storage.remove('user_status');
    this.storage.remove('phone_number');
    this.storage.remove('email');
    this.storage.remove('token');
    this.events.publish('user:logout');
    this.loginState = false;
    // location.reload();
  }

  getID() {
     return this.storage.get('user_id').then((res) => {
        this.ids = res;
        return this.ids;
     });
  }
  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }
  getName() {
    return this.storage.get('name').then((value) => {
      return value;
    });
  }
  getEmail() {
    return this.storage.get('email').then((value) => {
      return value;
    });
  }
  getPhoneNumber() {
    return this.storage.get('phone_number').then((value) => {
      return value;
    });
  }

  // return a promise
  // hasLoggedIn(val = this.getToken()) {
  //   this.jwt = val;
  //   this.input = JSON.stringify({jwtToken: this.jwt});

  //   this.http.post('http://cybex.ipb.ac.id/test/check.php', this.input).subscribe((ret) => {
  //     this.out = ret.json();
  //     if(this.out.status){
  //       this.loginState = true;
  //     }else{
  //       this.loginState = false;
  //     }
  //   });
  // }
}
