import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { PilihPage} from '../pilih/pilih';
import { Http } from '@angular/http';
import { TabsPage} from '../tabs/tabs';
import { UserDataProvider } from '../../providers/user-data';

declare var google: any;

/*
  Generated class for the TambahPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tambah',
  templateUrl: 'tambah.html'
})
export class TambahAddresPage {
  user: {username?: string,user_id?:string} = {};
  lokasi:{lat?: number, lng?: number, address_user?: string, address_name?: string}={};
  submitted = false;
  loading: any;
  provinsi: any;
  kabupaten: any;
  kecamatan: any;
  kelurahan: any;
  pilihProvinsi:string;
  pilihKabupaten: string;
  pilihKecamatan: string;
  pilihKelurahan: string;
  namaProvinsi:string;
  namaKabupaten: string;
  namaKecamatan: string;
  namaKelurahan: string;
  inputAlamat: string;

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public toastCtrl: ToastController,
             public http: Http,
             public userDataProvider:UserDataProvider,
             public loadCtrl: LoadingController) {}

            ionViewWillEnter() {
               this.getProvinsi();
                 this.getID();
                 this.getUsername();
             }
             getID() {
                 this.userDataProvider.getID().then((username) => {
                   this.user.user_id = username;
                 });
               }
               getUsername() {
                 this.userDataProvider.getUsername().then((username) => {
                   this.user.username = username;
                 });
               }
             // Get Location API
             getProvinsi(){
               this.http.get("https://ph.yippytech.com:5000/lokasi/provinsi").subscribe(data => {
                    let response = data.json();
                    if(response.status==200) {
                      this.provinsi = response.data;
                    }
                 }, err => {
                    this.showError(err);
                 });
             }
             changeProvinsi(prov){
               this.getKabupaten(prov);
               for(let data of this.provinsi){
                 if(data.id_prov == prov) {
                   this.namaProvinsi = data.nama;
                   break;
                 }
               }
             }
             getKabupaten(idProvinsi){
               this.http.get("https://ph.yippytech.com:5000/lokasi/kabupaten/"+idProvinsi).subscribe(data => {
                    let response = data.json();
                    if(response.status==200) {
                      this.kabupaten = response.data;
                    }
                 }, err => {
                    this.showError(err);
                 });
             }
             changeKabupaten(kab){
               this.getKecamatan(kab);
               for(let data of this.kabupaten){
                 if(data.id_kab == kab) {
                   this.namaKabupaten = data.nama;
                   break;
                 }
               }
             }
             getKecamatan(idKabupaten){
               this.http.get("https://ph.yippytech.com:5000/lokasi/kecamatan/"+idKabupaten).subscribe(data => {
                    let response = data.json();
                    if(response.status==200) {
                      this.kecamatan = response.data;
                    }
                 }, err => {
                    this.showError(err);
                 });
             }
             changeKecamatan(kec){
               this.getKelurahan(kec);
               for(let data of this.kecamatan){
                 if(data.id_kec == kec) {
                   this.namaKecamatan = data.nama;
                   break;
                 }
               }
             }
             getKelurahan(idKecamatan){
               this.http.get("https://ph.yippytech.com:5000/lokasi/kelurahan/"+idKecamatan).subscribe(data => {
                    let response = data.json();
                    if(response.status==200) {
                      this.kelurahan = response.data;
                    }
                 }, err => {
                    this.showError(err);
                 });
             }
             changeKelurahan(kel){
               for(let data of this.kelurahan){
                 if(data.id_kel == kel) {
                   this.namaKelurahan = data.nama;
                   break;
                 }
               }
             }
             // Get coordinate location
                getLatitudeLongitude(address){
                  let geocoder = new google.maps.Geocoder();
                  geocoder.geocode({'address': address},(results, status)=> {
                    if(status=='OK') {
                      let lokasi = results[0];
                      this.lokasi.lat = lokasi.geometry.location.lat();
                      this.lokasi.lng = lokasi.geometry.location.lng();
                      this.postUser();
                    }
                  });
                }

            postUser(){
              let input = JSON.stringify({
                user_id:this.user.user_id,
                addres_name:this.lokasi.address_name,
                addres_user:this.lokasi.address_user,
                latitude:this.lokasi.lat,
                longitude:this.lokasi.lng,
              });
              console.log(input);
              this.http.post("http://127.0.0.1/OrderHome/BackEnd/CreateAddres.php",input).subscribe(data => {
                console.log(data);
              let response = data.json();
               if(response.status == 200){
                  this.navCtrl.setRoot(TabsPage);
                  }
                  this.showAlert(response.message);
              }, err => {

                 this.showError(err);
              });
            }

            onSignup(form: NgForm) {
            this.submitted = true;

            if (form.valid) {
              this.lokasi.address_user = this.inputAlamat+" "+this.namaKelurahan+" "+this.namaKecamatan+" "+this.namaKabupaten+" "+this.namaProvinsi;
              this.getLatitudeLongitude(this.lokasi.address_user);
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

          masuk(){
           this.navCtrl.push(PilihPage);
          }

}
