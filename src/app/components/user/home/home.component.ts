import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { alltrade, TradingRecord } from 'src/app/model/trading';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trade: TradingRecord[] = [];
  filteredtrade: TradingRecord[] = [];
  searchText: string = "";
  responseData: TradingRecord[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.loadTrade();
  }

  loadTrade(): void {
    this.service.loadTrade().subscribe(
      (response: alltrade) => {
        this.responseData = response.data || [];
        this.totalPages = Math.ceil(this.responseData.length / this.itemsPerPage);
        this.applyPagination();
        this.trade = [...this.responseData];
        this.filteredtrade = [...this.responseData];
      },
      (error) => {
        console.error('Error loading trade:', error);
      }
    );
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

  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredtrade = this.responseData.slice(startIndex, endIndex);
  }

  // Call this method when a pagination link is clicked
  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.applyPagination();
  }
  
}
