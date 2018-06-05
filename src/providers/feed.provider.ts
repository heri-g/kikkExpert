import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class FeedProvider {

    public feedUrl = 'https://s3.us-east-2.amazonaws.com/kikkrecords/11_inventory_app.json';

    constructor(private http:HttpClient) {}

    getFeedData() {
        return this.http.get(this.feedUrl);
    }

    updateData() {
        return this.http.get(this.feedUrl);
    }
 
}