import { createSelector } from "@ngrx/store";
import { User, appUsers, } from "src/app/model/usermodel";
import { appProfile } from "./user.state";


export const profileRootSelector = (state:appProfile) => state.userdetails
export const userProfileSelector = createSelector(
    profileRootSelector,
    (userDetails:User) => {
      console.log(userDetails,'userDetails from selector'); 
        return userDetails
    }
)

