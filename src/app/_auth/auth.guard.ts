import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
