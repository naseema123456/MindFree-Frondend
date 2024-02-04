import { Component, OnInit,OnDestroy } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { alltrade,TradingRecord } from '../../../model/trading';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-swing-trade',
  templateUrl: './swing-trade.component.html',
  styleUrls: ['./swing-trade.component.css']
})
export class SwingTradeComponent  implements OnInit,OnDestroy {
  private subscriptions: Subscription = new Subscription();
  trade: TradingRecord[] = [];
  filteredtrade: TradingRecord[] = [];
  searchText: string = "";
  responseData: TradingRecord[] = []; // Use TradingRecord type for consistency

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.loadTrade();
    // console.log('trades.userId:', this.trade.userId);
  }

  loadTrade(): void {
    this.service.loadTrade().subscribe({
      next: (response: alltrade) => {
        this.responseData = response.data || [];
        this.trade = [...this.responseData];
        this.filteredtrade = [...this.responseData];
        console.log(this.responseData);
      },
      error: (error: Error) => {
        console.error(error);

      },
      complete: () => {
        console.log('Completed');
        // Handle completion if needed
      }
    });
  }
  

  search(): void {
    if (!this.searchText || this.trade.length === 0) {
      this.filteredtrade = [...this.trade];
      return;
    }
  
    this.filteredtrade = this.trade.filter((trades) => {
      const fullName = `${trades.userId?.firstName} ${trades.userId?.lastName}`;
      const stockName = trades.stockName;
      
      return (
        fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        stockName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
