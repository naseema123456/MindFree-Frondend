import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/usermodel";
import {  retrieveProfileSuccess } from "../state/user.action";
import { Action } from '@ngrx/store';




export const userInitialState: User = {
    _id: "",
    firstName: "",
    lastName: "",
    password:"",
    role:"",
    email: "",
    phoneNumber:null,
    isBlocked:false,

  
    // image: ""
}

const _ProfileReducer = createReducer(
    userInitialState,
    on(retrieveProfileSuccess, (state, { userDetails }) => {
      // console.log(userDetails, 'userDetails from reducer');
      // Assuming UserModule has the same properties as User, you can create a new User object
      const updatedUser: User = {
        ...state,
        ...userDetails,
      };
      return updatedUser;
    })
  );
  

  export function profileReducer(state: User | undefined, action: Action) {
    return _ProfileReducer(state, action);
}


