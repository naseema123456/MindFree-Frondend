export interface TradingRecord {
    id: string;
    date: string; // Use the appropriate date type based on your data structure
    profitLoss: number; // Assuming this can be a decimal value
    stockName: string;
    tradeType: string; // You might want to use an enum or a more specific type
    exitPrice: number;
    atThePrice: number;
    quantity: number;
    target: number;
    stopLoss: number;
    percentage: number;
    more: string;
    usedCapital: number;
    userId: {
      _id: string;
      firstName: string;
      lastName: string;
    };
  }
  export interface alltrade {
    data?: TradingRecord[],
    success: boolean;
    message: string;
}
