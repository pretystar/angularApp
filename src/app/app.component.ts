import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChildActivationEnd, Router } from '@angular/router';
// import { OidcSecurityService, AuthorizationResult, AuthorizationState } from 'angular-auth-oidc-client';
import {
    OidcClientNotification,
    OidcSecurityService,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import './app.component.css';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

    @Language() lang = '';

    // title = '';

    // isAuthorizedSubscription: Subscription | undefined;
    // isAuthorized = false;
    // public userDataSubscription: Subscription | undefined;
    // public userData: any;

    // onChecksessionChanged: Subscription | undefined;
    // checksession = false;
    // toggleNavBar: boolean = true;
    userDataChanged$: Observable<OidcClientNotification<any>>;
    userData$: Observable<any>;
    isAuthenticated$: Observable<boolean>;
    checkSessionChanged$: Observable<boolean>;
    checkSessionChanged: any;
    constructor(
        public oidcSecurityService: OidcSecurityService,
        public locale: LocaleService,
        private router: Router,
        public translation: TranslationService,
        private titleService: Title
    ) {
        console.log('AppComponent STARTING');
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                let snapshot = (event as ChildActivationEnd).snapshot;
                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }
                this.titleService.setTitle(snapshot.data.title || 'DrillPlan DevOps Portal');
            });
    }

    ngOnInit() {
        // this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
        //     (isAuthorized: boolean) => {
        //         this.isAuthorized = isAuthorized;
        //     });

        // this.userDataSubscription = this.oidcSecurityService.getUserData().subscribe(
        //     (userData: any) => {
        //         if (userData !== '') {
        //             this.userData = userData;
        //         }
        //     });
        this.userData$ = this.oidcSecurityService.userData$;
        this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
        this.checkSessionChanged$ = this.oidcSecurityService.checkSessionChanged$;

        this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => console.log('app authenticated', isAuthenticated));
    }

    changeCulture(language: string, country: string) {
        this.locale.setDefaultLocale(language, country);
        console.log('set language: ' + language);
    }

    ngOnDestroy(): void {
        // if (this.isAuthorizedSubscription) {
        //     this.isAuthorizedSubscription.unsubscribe();
        // }
    }

    login() {
        console.log('start login');

        // let culture = 'de-CH';
        // if (this.locale.getCurrentCountry()) {
        //     culture = this.locale.getCurrentLanguage() + '-' + this.locale.getCurrentCountry();
        // }
        // console.log(culture);

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
    // private toggle() {
    //     this.toggleNavBar = !this.toggleNavBar;
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
