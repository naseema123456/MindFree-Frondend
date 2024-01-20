import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alltrade } from 'src/app/model/trading';

@Component({
  selector: 'app-yourtrade',
  templateUrl: './yourtrade.component.html',
  styleUrls: ['./yourtrade.component.css']
})
export class YourtradeComponent implements OnInit{

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


}
