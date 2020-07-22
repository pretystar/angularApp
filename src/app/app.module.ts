import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
// import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import { AppRoutingModule } from './app.routes';
import { NavigationModule } from '@modules/navigation/navigation.module';


// import { HttpClientModule } from '@angular/common/http';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
// import { AuthModule, ConfigResult, OidcConfigService, OidcSecurityService, OpenIdConfiguration } from 'angular-auth-oidc-client';
import { L10nConfig, L10nLoader, TranslationModule, StorageStrategy, ProviderType } from 'angular-l10n';
// import { AuthorizationGuard } from './authorization.guard';
// import { AuthorizationCanGuard } from './authorization.can.guard';
import { MaterialModule } from '@modules/shared/Material.module';
import {AuthInterceptor} from './AuthInterceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from "@modules/auth/auth.module";
import { AuthGuard } from '@modules/auth/guards';
import { map, switchMap } from 'rxjs/operators';


const l10nConfig: L10nConfig = {
    locale: {
        languages: [
            { code: 'en', dir: 'ltr' },
            { code: 'it', dir: 'ltr' },
            { code: 'fr', dir: 'ltr' },
            { code: 'de', dir: 'ltr' }
        ],
        language: 'en',
        storage: StorageStrategy.Cookie
    },
    translation: {
        providers: [
            { type: ProviderType.Static, prefix: './i18n/locale-' }
        ],
        caching: true,
        missingValue: 'No key'
    }
};

export function loadConfig(oidcConfigService: OidcConfigService, httpClient: HttpClient) {
    console.log('APP_INITIALIZER STARTING');
    const setupAction$ = httpClient.get<any>(`${window.location.origin}/api/ClientAppSettings`).pipe(
        map((customConfig) => {
            return {
                stsServer: customConfig.stsServer,
                redirectUrl: customConfig.redirect_url,
                clientId: customConfig.client_id,
                responseType: customConfig.response_type,
                scope: customConfig.scope,
                postLogoutRedirectUri: customConfig.post_logout_redirect_uri,
                startCheckSession: customConfig.start_checksession,
                silentRenew: customConfig.silent_renew,
                silentRenewUrl: customConfig.redirect_url + '/silent-renew.html',
                postLoginRoute: customConfig.startup_route,
                forbiddenRoute: customConfig.forbidden_route,
                unauthorizedRoute: customConfig.unauthorized_route,
                logLevel: 0, // LogLevel.Debug, // customConfig.logLevel
                maxIdTokenIatOffsetAllowedInSeconds: customConfig.max_id_token_iat_offset_allowed_in_seconds,
                historyCleanupOff: true,
                // autoUserinfo: false,
            };
        }),
        switchMap((config) => oidcConfigService.withConfig(config))
    );

    return () => setupAction$.toPromise();
}

@NgModule({
    imports: [
        FormsModule,
        AppRoutingModule,
        // HttpClientModule,
        MaterialModule,
        NavigationModule,
        OAuthModule,
        TranslationModule.forRoot(l10nConfig),
        AuthModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        // ForbiddenComponent,
        HomeComponent,
        // UnauthorizedComponent,
    ],
    providers: [
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [OidcConfigService, HttpClient],
            multi: true,
        },
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        // AuthorizationGuard,
        // AuthorizationCanGuard,
        Configuration
    ],
    bootstrap: [AppComponent],
})

export class AppModule {

    constructor(
        // private oidcSecurityService: OidcSecurityService,
        // private oidcConfigService: OidcConfigService,
        // configuration: Configuration,
        public l10nLoader: L10nLoader
    ) {
        this.l10nLoader.load();

        // this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {

        //     const config: OpenIdConfiguration = {
        //         stsServer: configResult.customConfig.stsServer,
        //         redirect_url: configResult.customConfig.redirect_url,
        //         client_id: configResult.customConfig.client_id,
        //         response_type: configResult.customConfig.response_type,
        //         scope: configResult.customConfig.scope,
        //         post_logout_redirect_uri: configResult.customConfig.post_logout_redirect_uri,
        //         start_checksession: configResult.customConfig.start_checksession,
        //         silent_renew: configResult.customConfig.silent_renew,
        //         silent_renew_url: configResult.customConfig.redirect_url + '/silent-renew.html',
        //         post_login_route: configResult.customConfig.startup_route,
        //         forbidden_route: configResult.customConfig.forbidden_route,
        //         unauthorized_route: configResult.customConfig.unauthorized_route,
        //         log_console_warning_active: configResult.customConfig.log_console_warning_active,
        //         log_console_debug_active: configResult.customConfig.log_console_debug_active,
        //         max_id_token_iat_offset_allowed_in_seconds: configResult.customConfig.max_id_token_iat_offset_allowed_in_seconds,
        //         history_cleanup_off: true
        //         // iss_validation_off: false
        //         // disable_iat_offset_validation: true
        //     };

        //     configuration.FileServer = configResult.customConfig.apiFileServer;
        //     configuration.Server = configResult.customConfig.apiServer;

        //     this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
        // });


        console.log('APP STARTING');
    }
}
