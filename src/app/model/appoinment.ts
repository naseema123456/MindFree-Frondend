export interface Appointment  {
    userId?: string;
    callprovider:string;
    date?: Date;
    time: string;
    status: string;
    isBlocked: boolean;
  }

  export interface IApiAppointment {
 
    success:boolean
    message: string

    data:  Appointment[] | []

  }
