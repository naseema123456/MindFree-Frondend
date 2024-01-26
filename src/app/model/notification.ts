export interface IApiMsg {
  subject:string,
  message:string
  }
  export interface IApimsg {
    sender:string;
    date?: Date;
    messages: IApiMsg;
}
  export interface IApiAllMsg {
    data?:   IApimsg[],
    success: boolean;
    message: string;
  
    }
