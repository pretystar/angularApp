import { Component, OnInit } from '@angular/core';
import { Language, LocaleService } from 'angular-l10n';
import { OidcSecurityService, OidcClientNotification } from 'angular-auth-oidc-client';
// import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    @Language() lang = 'en';
    userDataChanged$: Observable<OidcClientNotification<any>>;
    userData$: Observable<any>;
    isAuthenticated$: Observable<boolean>;
    checkSessionChanged$: Observable<boolean>;
    checkSessionChanged: any;

    constructor(public locale: LocaleService, public oidcSecurityService: OidcSecurityService,) {
    }

    ngOnInit() {
        this.userData$ = this.oidcSecurityService.userData$;
        this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
        this.checkSessionChanged$ = this.oidcSecurityService.checkSessionChanged$;

        this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => console.log('app authenticated', isAuthenticated));
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
}
