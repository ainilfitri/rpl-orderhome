import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserDataProvider } from '../../providers/user-data';
import { NgForm } from '@angular/forms';
import { AccountPage} from '../account/account';
/*
  Generated class for the UpdateProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html'
})
export class UpdateProfilePage {
  user: {username?: string, name?: string, email?: string, role?:string,phone_number?:string,user_id?:string} = {};
    submitted = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public http: Http,
              public userDataProvider:UserDataProvider,
              public loadCtrl: LoadingController) {}

  ngAfterViewInit() {
                this.getUsername();
                this.getName();
                this.getEmail();
                this.getPhoneNumber();
                this.getID();

              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }
  getUsername() {
    this.userDataProvider.getUsername().then((username) => {
      this.user.username = username;
    });
  }

  getName() {
    this.userDataProvider.getName().then((username) => {
      this.user.name = username;
    });
  }
  getPhoneNumber() {
    this.userDataProvider.getPhoneNumber().then((username) => {
      this.user.phone_number = username;
    });
  }
  getEmail() {
    this.userDataProvider.getEmail().then((username) => {
      this.user.email = username;
    });

  }
  getID() {
      this.userDataProvider.getID().then((username) => {
        this.user.user_id = username;
      });
    }
  onSignup(form: NgForm) {
    this.submitted = true;
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
      loading.present();
      let input = JSON.stringify({
        username: this.user.username,
        name: this.user.name,
        email: this.user.email,
        phone_number: this.user.phone_number,
        user_id:this.user.user_id
      });
      this.http.post("http://127.0.0.1/OrderHome/BackEnd/UpdateProfile.php",input).subscribe(data => {
           loading.dismiss();
           console.log(input);
           let response = data.json();
           if(response.status == 200){
             let user=response.data;
             this.userDataProvider.signup(user.username);
              this.navCtrl.push(AccountPage);

           }
           this.showAlert(response.message);
      }, err => {
      loading.dismiss();
      this.showError(err);
      });
      }
      }
      showError(err: any){
      err.status==0?
      this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
      this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
      }
      showAlert(message){
      let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
      });
      toast.present();
      }
}
