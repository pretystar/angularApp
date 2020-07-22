import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthCanGuard implements CanLoad {

    constructor(private oidcSecurityService: OidcSecurityService
    ) {}

    canLoad(): boolean {
        
        this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
            console.log('app authenticated', isAuthenticated);
            return isAuthenticated;
        });
        return false;
    }
}
