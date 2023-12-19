export interface User {
   
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile?: number;
    dob: Date;
    isBlocked: boolean;
    profilePic?: string;
    wallet: number;
    address?: string;
    walletHistory:[] ;
  
  }
  
  export interface IApiUserRes {
    status: number
    message: string
    id:string
    data:  User[] | []
    token: string
  }

  export interface otpverify{
    message:string
    success:boolean
  }