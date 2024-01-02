export interface User {
   
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number | null,
    role:string
    isBlocked: boolean;
    profilePic?: string;
    wallet?: number;
    address?: {};
    walletHistory?:[] ;
  
  }
  export interface userProfile {
    userDetails: User
}
  export interface IApiUserRes {
    status: number
    success:boolean
    message: string
    id:string
    data:  User[] | []
    token: string
  }

  export interface otpverify{
    message:string
    success:boolean

  }

  export interface appUsers {
    data?: User[],
    success: boolean;
    message: string;
}
