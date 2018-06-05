import { Component } from '@angular/core';
import { NavController, ModalController, Keyboard, Refresher } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';

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

  dataFlag: boolean = false;

  constructor(
    public navCtrl: NavController,
    private feedProvider: FeedProvider,
    public modalCtrl: ModalController,
    private auth: AuthProvider,
    public keyboard: Keyboard,
    private network: Network,
    private toast: Toast
  ) {
  }

  ionViewDidEnter() {

    // NETWORK DETECTION CODE
    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      // console.log('network was disconnected :-(');
      this.emptyRefresh();
      this.feeds.length = 0;
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      // console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type !== 'none') {
          console.log('we got a wifi connection, woohoo!');
          this.initializeItems();
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();

  }

  ionViewDidLoad() {
    this.auth.afAuth.authState.subscribe( user => {
        if (user) {
          this.initializeItems();
          this.isUser = true;
        } else {
          this.isUser = false;
          this.feeds.length = 0;
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
  }

  getFeed(ev: any) {
    
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
    modal.onDidDismiss( () => {
      this.dataFlag = true;
      if (this.dataFlag == true) {
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
      }
    });
    modal.present();
  }

  closeKeyboard() {
    this.keyboard.close();
  }

  doRefresh(refresher) {
    this.initializeItems();
    // this.feedProvider.updateData().subscribe( update => {
    //   this.feeds = update;
    // })
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  emptyRefresh() {
    this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, 6000);
    
  }

}
