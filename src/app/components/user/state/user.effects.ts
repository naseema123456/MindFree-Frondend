import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from 'src/app/components/user/state/user.service';
import { retrieveProfileSuccess,retrieveProfile } from '../state/user.action';
import { User } from 'src/app/model/usermodel';
import { IApiUserRes } from 'src/app/model/usermodel';
import { switchMap, map } from 'rxjs'

@Injectable()
export class userEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ){}

    loadProfile$ = createEffect(() =>
   
    
    this.actions$.pipe(
      ofType(retrieveProfile), // Use retrieveProfile here
        switchMap(() => {
            // console.log('Before calling userService.loadProfile()');
            return this.userService.loadProfile().pipe(
                map(data => {
                    // console.log('Hello from effect:');
                    return retrieveProfileSuccess({ userDetails: data as IApiUserRes });
                })
            );
        })
      
    )
  );

  
}