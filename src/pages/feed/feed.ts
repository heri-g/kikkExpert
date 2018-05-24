import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { DetailsPage } from "../details/details";
import { LoginPage } from "../login/login";

import { AuthProvider } from "../../providers/auth";
import { FeedProvider } from "../../providers/feed.provider";

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  private isUser: boolean = false;

  public feeds;
  items: any[];

  constructor(
    public navCtrl: NavController,
    private feedProvider: FeedProvider,
    public modalCtrl: ModalController,
    private auth: AuthProvider
  ) {
  }

  ionViewCanEnter() {
    this.auth.afAuth.authState.subscribe( user => {
        if (user) {
          this.initializeItems();
        } else {
          this.isUser = false;
        }
      }
    );
  }

  public getThmbnlURL(product:string) {
    return `http://www.kikkwinsolimages.com/images/winsol/${product}_100x100.png`;
  }

  public getExpertData(skus:string) {
    return `http://kikkerlandproduct.expert/11/#/products/${skus}`;
  }

  public truncate(title:string) {
    return title.slice(0, 13) + "...";
  }

  getDetailsPage(details) {
    let sku = details.record.product;
    let title = details.record.description;
    let upc = details.record.upc;
    let splitQty = details.record.splitqty;
    let stock = details.record.availableqty;
    let usWholesale = Number(details.record.uswholesaleprice).toFixed(2);
    let caWholesale = Number(details.record.canadawholesaleprice).toFixed(2);
    let msrp = Number(details.record.msrp).toFixed(2);
    this.navCtrl.push(DetailsPage, {
      sku: sku,
      title: title,
      upc: upc,
      splitQty: splitQty,
      stock: stock,
      usWholesale: usWholesale,
      caWholesale: caWholesale,
      msrp: msrp
    });
    // console.log(details);
  }

  getFeed(ev: any) {
    // this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.feeds = this.feeds.filter((item) => {
        return (item.record.description.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.record.product.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.initializeItems();
    }
  }

  async initializeItems() {
    this.isUser = true;
    return await this.feedProvider.getFeedData().subscribe( (data) => {
      this.feeds = data;
    })
  }

  async authInit() {
    const modal = await this.modalCtrl.create(LoginPage);
    modal.present();
  }

}
