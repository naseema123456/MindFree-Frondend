export interface Messages {
    text: string;
    timestamp?: string;
    _id?: string;
    sender?: string;
  }
  
  export interface Chat {
    sender: string;
    receiver: string;
    messages: Messages[];
  }