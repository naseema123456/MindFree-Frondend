export interface Appointment  {
  firstName?: string;
  lastName?: string;
    userId?: string;
    callprovider:string;
    date?: Date;
    time: string;
    status: string;
    isBlocked: boolean;
    amount:number
  }

  export interface IApiAppointment {
 
    success:boolean
    message: string

    data:  Appointment[] | []

  }
