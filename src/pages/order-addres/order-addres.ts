import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams ,ToastController } from 'ionic-angular';
import { GoogleMap } from 'ionic-native';
import { Geolocation} from 'ionic-native';
import { UserDataProvider } from '../../providers/user-data';

declare var google: any;

@Component({
  selector: 'page-order-addres',
  templateUrl: 'order-addres.html'
})
export class OrderAddresPage {
  @ViewChild('map')
    mapElement: ElementRef;
    map: GoogleMap;
    mapData: any;
    autocomplete: any;
    address:any;
    lokasi:{lat?: number, lng?: number}={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {}

  ionViewWillEnter() {
    console.log("rest");
    let latLng = new google.maps.LatLng(-6.560284, 106.7233045);
    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getCurrentLocation()
    this.getLatitudeLongitude("ipb dramaga");
  }
  getLatitudeLongitude(address){
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address},(results, status)=> {
      if(status=='OK') {
        let lokasi = results[0];

        let lat = lokasi.geometry.location.lat();
        let lng = lokasi.geometry.location.lng();
        console.log("get lng lat from address");
        console.log("longitude"+lng);
        console.log("latitude"+lat);
      } else{
        this.showAlert("Tidak dapat menemukan lokasi anda");
      }
    });
  }
  getAddress(){
    let geocoder = new google.maps.Geocoder();
    let latlng = {lat: this.lokasi.lat, lng: this.lokasi.lng};

    geocoder.geocode({'location': latlng},(results, status)=> {
      if(status=='OK') {
        let alamat = results[0].formatted_address;
      } else{
        this.showAlert("Tidak dapat menemukan alamat Anda");
      }
    });
  }
  getCurrentLocation(){
    Geolocation.getCurrentPosition().then((position) => {
      let lng = position.coords.longitude;
      let lat = position.coords.latitude;
      console.log("get current location");
      console.log("longitude"+lng);
      console.log("latitude"+lat);
    }, (err) => {
      console.log(err);
    });
  }
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
