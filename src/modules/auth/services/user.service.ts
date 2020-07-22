import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { User } from '../models';
import { OidcSecurityService } from 'angular-auth-oidc-client';


const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    public userDataSubscription: Subscription | undefined;
    // public user: any;
    constructor(public oidcSecurityService: OidcSecurityService) {
        // this.user = {
        //     id: '123',
        //     firstName: 'Start',
        //     lastName: 'Bootstrap',
        //     email: 'no-reply@startbootstrap.com',
        // };
        this.userDataSubscription = this.oidcSecurityService.userData$.subscribe(
            (userData: any) => {
                if (userData !== '') {
                    this.user = userData;
                }
            });
    }
    ngOnInit() {

        
    }
    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
