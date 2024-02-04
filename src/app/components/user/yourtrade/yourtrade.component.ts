import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alltrade } from 'src/app/model/trading';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-yourtrade',
  templateUrl: './yourtrade.component.html',
  styleUrls: ['./yourtrade.component.css']
})
export class YourtradeComponent implements OnInit,OnDestroy{
  private subscriptions: Subscription = new Subscription();

trade:alltrade|undefined

  constructor(private http: HttpClient) { }


ngOnInit(): void {
  this.http.get<alltrade>('/callprovider/getTrade').subscribe(
    (response: alltrade) => {
 
this.trade=response
console.log(this.trade,"trade");


    }
  );
}
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}

}
