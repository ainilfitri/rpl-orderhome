import { Component } from '@angular/core';
import { PilihPage } from '../pilih/pilih';
import { TabsPage } from '../tabs/tabs';
import { NavController,ToastController,LoadingController, NavParams  } from 'ionic-angular';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { UserDataProvider } from '../../providers/user-data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
    user: {username?: string, password?: string} = {};
    submitted = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public toastCtrl: ToastController,
              public loadCtrl: LoadingController,
              public userDataProvider:UserDataProvider) {}

  ionViewWillEnter(){

  }
  onLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
    loading.present();
      let input = JSON.stringify({
        username: this.user.username,
        password: this.user.password
      });
        this.http.post("http://127.0.0.1/OrderHome/BackEnd/login.php",input).subscribe(data => {
           let response = data.json();
           loading.dismiss();
           if(response.status == 200) {
             let user=response.data;
             this.userDataProvider.login(user.user_id,user.username,user.user_status,user.name,user.phone_number,user.email);
             console.log(user);
             this.navCtrl.push(TabsPage);

           } else {
             this.showAlert(response.message);
           }
        }, err => {
           loading.dismiss();
           this.showError(err);
        });

    }
  }
  onSignup() {
    this.navCtrl.push(PilihPage);
  }
  onForgotPassword(){
    this.navCtrl.push(PilihPage);
  }
  showError(err: any){
    err.status==0?
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  };
}
