import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { alltrade,TradingRecord } from 'src/app/model/trading';

@Component({
  selector: 'app-swing-trade',
  templateUrl: './swing-trade.component.html',
  styleUrls: ['./swing-trade.component.css']
})
export class SwingTradeComponent  implements OnInit {
  trade: TradingRecord[] = [];
  responseData: TradingRecord[] = []; // Use TradingRecord type for consistency

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.loadTrade();
    // console.log('trades.userId:', this.trade.userId);
  }

  loadTrade(): void {
    this.service.loadTrade().subscribe(
      (response: alltrade) => { 
              // const responseData: TradingRecord[] = response.data || [];
              this.responseData = response.data || [];
        console.log(this.responseData);
    
        
      },
      (error) => {
        console.error('Error loading trade:', error);
      }
    );
  }
}
