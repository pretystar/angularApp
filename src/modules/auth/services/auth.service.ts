import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Language, LocaleService } from 'angular-l10n';
import { OidcSecurityService, OidcClientNotification } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    userData$: Observable<any>;
    isAuthenticated$: Observable<boolean>;
    checkSessionChanged$: Observable<boolean>;

    constructor(public oidcSecurityService: OidcSecurityService, private router: Router) {
        // if (this.oidcSecurityService.moduleSetup) {
        //     this.doCallbackLogicIfRequired();
        // } else {
        //     this.oidcSecurityService.onModuleSetup.subscribe(() => {
        //         this.doCallbackLogicIfRequired();
        //     });
        // }

        // this.oidcSecurityService.onCheckSessionChanged.subscribe(
        //     (checksession: boolean) => {
        //         console.log('...recieved a check session event');
        //         this.checksession = checksession;
        //     });

        // this.oidcSecurityService.onAuthorizationResult.subscribe(
        //     (authorizationResult: AuthorizationResult) => {
        //         this.onAuthorizationResultComplete(authorizationResult);
        //     });
    }
    ngOnInit() {
        this.userData$ = this.oidcSecurityService.userData$;
        this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
        this.checkSessionChanged$ = this.oidcSecurityService.checkSessionChanged$;
        this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => console.log('app authenticated', isAuthenticated));

        // this.userDataSubscription = this.oidcSecurityService.getUserData().subscribe(
        //     (userData: any) => {
        //         if (userData !== '') {
        //             this.userData = userData;
        //         }
        //     });
    }
    getAuth$(): Observable<{}> {
        return of({});
    }
    ngOnDestroy(): void {
    }

    login() {
        console.log('start login');

        // let culture = 'en-US';
        // if (this.locale.getCurrentCountry()) {
        //     culture = this.locale.getCurrentLanguage() + '-' + this.locale.getCurrentCountry();
        // }

        // this.oidcSecurityService.setCustomRequestParameters({ 'ui_locales': culture });

        this.oidcSecurityService.authorize();
    }

    refreshSession() {
        console.log('start refreshSession');
        this.oidcSecurityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.oidcSecurityService.logoff();
    }

    // private doCallbackLogicIfRequired() {
    //     console.log(window.location);
    //     // Will do a callback, if the url has a code and state parameter.
    //     this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
    // }

    // private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {

    //     console.log('Auth result received AuthorizationState:'
    //         + authorizationResult.authorizationState
    //         + ' validationResult:' + authorizationResult.validationResult);

    //     if (authorizationResult.authorizationState === AuthorizationState.unauthorized) {
    //         if (window.parent) {
    //             // sent from the child iframe, for example the silent renew
    //             this.router.navigate(['/unauthorized']);
    //         } else {
    //             window.location.href = '/unauthorized';
    //         }
    //     }
    // }
}
