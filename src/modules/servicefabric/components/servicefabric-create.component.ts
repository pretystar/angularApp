import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { ServiceFabricService } from '../ServiceFabric.service';
import { ServiceFabric } from '../models/ServiceFabric';

@Component({
    selector: 'app-ServiceFabric-create',
    templateUrl: 'ServiceFabric-create.component.html'
})

export class ServiceFabricCreateComponent implements OnInit, OnDestroy {

    public message: string;
    public ServiceFabric: ServiceFabric = {
        id: 0, name: '', description: '', timestamp: ''
    };
    // isAuthorizedSubscription: Subscription | undefined;
    // isAuthorized = false;

    constructor(private _ServiceFabricService: ServiceFabricService,
        public oidcSecurityService: OidcSecurityService,
        private _router: Router
    ) {
        this.message = 'ServiceFabric Create';
    }

    ngOnInit() {
        // this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
        //     (isAuthorized: boolean) => {
        //         this.isAuthorized = isAuthorized;
        //     });
        this.ServiceFabric = { id: 0, name: '', description: '', timestamp: '' };
        // console.log('IsAuthorized:' + this.isAuthorized);
    }

    ngOnDestroy(): void {
        // if (this.isAuthorizedSubscription) {
        //     this.isAuthorizedSubscription.unsubscribe();
        // }
    }

    public Create() {
        // router navigate to ServiceFabricList
        this._ServiceFabricService
            .Add(this.ServiceFabric)
            .subscribe((data: any) => this.ServiceFabric = data,
            error => console.log(error),
            () => this._router.navigate(['/ServiceFabric']));
    }
}
