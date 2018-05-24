import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public sku;
  public title;
  public upc;
  public splitQty;
  public stock;
  public usWholesale;
  public caWholesale;
  public msrp;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  getExpertData() {
    return `http://kikkerlandproduct.expert/public/sellsheet.php?sku=${this.sku}`;
  }

  ionViewWillEnter(){
    this.sku = this.navParams.get('sku');
    this.title = this.navParams.get('title');
    this.upc = this.navParams.get('upc');
    this.splitQty = this.navParams.get('splitQty');
    this.stock = this.navParams.get('stock');
    this.usWholesale = this.navParams.get('usWholesale');
    this.caWholesale = this.navParams.get('caWholesale');
    this.msrp = this.navParams.get('msrp');
    console.log(Number(this.usWholesale).toFixed(2));
  }

  dismiss() {
    this.navCtrl.pop();
  }

}