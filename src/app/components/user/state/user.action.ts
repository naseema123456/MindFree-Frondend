import { createAction, props } from "@ngrx/store";
import { UserModule } from "../user.module"; 


export const retrieveProfile = createAction('[Profile API] API Success')
// console.log("action...");
export const retrieveProfileSuccess = createAction('[Profile API] API SuccessSuccess',props<{userDetails:UserModule}>());
