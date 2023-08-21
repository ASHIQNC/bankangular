import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { BankService } from './service/bank.service';

// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state
// ) => {
//   // return true;
//   //dependency injection in functional component
//   // const authService = inject(BankService);
//   // return authService.loggedInStatus;
// };
//note:CanActivate. This is the most widely used guard.
//The canActivate guard is a route guard that allows or denies access to a route based on the logic specified in the guard.
