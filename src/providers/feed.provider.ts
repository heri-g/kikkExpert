import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class FeedProvider {

    public feedUrl = 'http://www.kikkdata.com/ecz1/11_inventory.json';

    constructor(private http:HttpClient) {}

    getFeedData() {
        return this.http.get(this.feedUrl);
    }
 
}