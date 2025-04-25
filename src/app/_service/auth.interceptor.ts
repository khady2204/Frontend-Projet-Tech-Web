import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from './user-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuthService = inject(UserAuthService);

  // Ne pas ajouter le token si le header "No-Auth" est présent
  if (req.headers.get('No-Auth') === 'True') {
    return next(req);
  }
  const token = userAuthService.getToken();

  if (token) {
    console.log('Interceptor - adding Authorization header:', `Bearer ${token}`);
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(modifiedReq);
  }

  return next(req);
};
