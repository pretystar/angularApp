import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { ServiceFabricService } from '../ServiceFabric.service';
import { RouterLink, RouterLinkActive } from "@angular/router"
// import { ServiceFabric } from '../models/ServiceFabric';

@Component({
    selector: 'app-ServiceFabric-list',
    templateUrl: 'ServiceFabric-list.component.html'
})

export class ServiceFabricListComponent implements OnInit, OnDestroy {
    [x: string]: any;

    message: string;
    ServiceFabrics: any;
    hasAdminRole = false;
    // isAuthorizedSubscription: Subscription | undefined;
    // isAuthorized = false;

    // userDataSubscription: Subscription | undefined;
    // userData = false;

    constructor(

        private _ServiceFabricService: ServiceFabricService,
        public oidcSecurityService: OidcSecurityService,
        private cdr:ChangeDetectorRef
    ) {
        this.message = 'ServiceFabric';
    }

    ngOnInit() {
        this.getData();
        // this.isAuthorizedSubscription = this.oidcSecurityService.isAuthorized$.subscribe(
        //     (isAuthorized: boolean) => {
        //         this.isAuthorized = isAuthorized;

        //         if (this.isAuthorized) {
        //             console.log('isAuthorized getting data');
        //             this.getData();
        //         }
        //     });

        // this.userDataSubscription = this.oidcSecurityService.userData$.subscribe(
        //     (userData: any) => {

        //         if (userData !== '') {
        //             for (let i = 0; i < userData.role.length; i++) {
        //                 if (userData.role[i] === 'ServiceFabric.admin') {
        //                     this.hasAdminRole = true;
        //                 }
        //                 if (userData.role[i] === 'admin') {
        //                 }
        //             }
        //         }

        //         console.log('userData getting data');
        //     });
    }

    ngOnDestroy(): void {
        if (this.isAuthorizedSubscription) {
            this.isAuthorizedSubscription.unsubscribe();
        }

        if (this.userDataSubscription) {
            this.userDataSubscription.unsubscribe();
        }
    }

    public Delete(id: any) {
        console.log('Try to delete' + id);
        this._ServiceFabricService.Delete(id)
            .subscribe((() => console.log('subscribed')),
            error => console.log(error),
            () => this.getData());
    }

    private getData() {
        this._ServiceFabricService
            .GetAll()
            .subscribe(data => {
                this.ServiceFabrics = data;
                this.cdr.detectChanges();
                console.log(this.ServiceFabrics);
            },
            error => console.log(error),
            () => console.log('getData Get all completed')
            );
    }



}
