import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { alltrade, TradingRecord } from '../../../model/trading';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-option-buying',
  templateUrl: './option-buying.component.html',
  styleUrls: ['./option-buying.component.css']
})
export class OptionBuyingComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  trade: TradingRecord[] = [];
  filteredtrade: TradingRecord[] = [];
  searchText: string = "";
  responseData: TradingRecord[] = []; // Use TradingRecord type for consistency

  constructor(private service: ServiceService) { }

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
      error: (error) => {
        console.error('Error loading trade:', error);
      },
      complete: () => {
        // Optional: code to execute upon completion of the observable
        console.log('Completed loading trade data');
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
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
