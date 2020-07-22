import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, CanActivate,CanActivateChild , ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    
    constructor(
        private router: Router,
        private oidcSecurityService: OidcSecurityService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(route + '' + state);
        console.log('AuthorizationGuard, canActivate');

        return this.oidcSecurityService.isAuthenticated$.pipe(
            map((isAuthorized: boolean) => {
                console.log('AuthorizationGuard, canActivate isAuthorized: ' + isAuthorized);

                if (!isAuthorized) {
                    this.router.navigate(['/auth/unauthorized']);
                    return false;
                }
                return true;
            })
        );
    }
    public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.oidcSecurityService.isAuthenticated$.pipe(
            map((isAuthorized: boolean) => {
                console.log('AuthorizationGuard, canActivateChild isAuthorized: ' + isAuthorized);

                if (!isAuthorized) {
                    this.router.navigate(['/auth/unauthorized']);
                    return false;
                }
                return true;
            })
        );
      }
    
    //   private mapper = map((user: User) => {
    //     if (user) return true;
    //     this.oidcSecurityService.login();
    //     return false;
    //   });
}
