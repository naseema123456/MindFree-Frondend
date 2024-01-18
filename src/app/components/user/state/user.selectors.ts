import { createSelector } from "@ngrx/store";
import { User } from "src/app/model/usermodel";
import { appProfile } from "./user.state";

export const profileRootSelector = (state: any) => state.userdetails;

export const userProfileSelector = createSelector(
    profileRootSelector,
    (userDetails: User) => {
      console.log({ userdetails: userDetails }, 'userDetails from selector');
      const cleanedData = Object.fromEntries(
        Object.entries(userDetails)
          .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      );
      return { userdetails: { data: cleanedData } };

    }
  );
  


