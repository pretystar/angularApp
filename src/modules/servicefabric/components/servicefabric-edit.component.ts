import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { ServiceFabricService } from '../ServiceFabric.service';
import { ServiceFabric } from '../models/ServiceFabric';

@Component({
    selector: 'app-ServiceFabric-edit',
    templateUrl: 'ServiceFabric-edit.component.html'
})

export class ServiceFabricEditComponent implements OnInit, OnDestroy   {

    private id = 0;
    public message: string;
    // private sub: any;
    public ServiceFabric: ServiceFabric = {
        id: 0,
        name: '',
        description: '',
        timestamp: ''
    };

    // isAuthorizedSubscription: Subscription | undefined;
    // isAuthorized = false;

    constructor(
        private _ServiceFabricService: ServiceFabricService,
        public oidcSecurityService: OidcSecurityService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.message = 'ServiceFabric Edit';
    }

    ngOnInit() {
        // this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
        //     (isAuthorized: boolean) => {
        //         this.isAuthorized = isAuthorized;
        //     });
        // console.log('IsAuthorized:' + this.isAuthorized);

        // this.sub = this._route.params.subscribe(params => {
        //     const id = +params['id']; // (+) converts string 'id' to a number
        //     this.id = id;
        //     if (this.ServiceFabric.id === 0) {
        //         this._ServiceFabricService.GetById(id)
        //             .subscribe(data => this.ServiceFabric = data,
        //             error => console.log(error),
        //             () => console.log('ServiceFabricEditComponent:Get by Id complete'));
        //     }
        // });
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
        // if (this.isAuthorizedSubscription) {
        //     this.isAuthorizedSubscription.unsubscribe();
        // }
    }

    public Update() {
        this._ServiceFabricService.Update(this.id, this.ServiceFabric)
            .subscribe((() => console.log('subscribed')),
            error => console.log(error),
            () => this._router.navigate(['/ServiceFabric']));
    }
}
