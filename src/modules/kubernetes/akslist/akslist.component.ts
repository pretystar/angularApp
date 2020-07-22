import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AksService } from '../aks.service';

@Component({
  selector: 'app-akslist',
  templateUrl: './akslist.component.html',
  styleUrls: ['./akslist.component.css']
})
export class AkslistComponent implements OnInit {
  // isAuthorizedSubscription: Subscription | undefined;
  // isAuthorized = false;

  // userDataSubscription: Subscription | undefined;
  // userData = false;
  // hasAdminRole = false;
  aksList: any;

  constructor(
    private _aksService: AksService,
    public oidcSecurityService: OidcSecurityService,
    private cdr:ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
    //   (isAuthorized: boolean) => {
    //     this.isAuthorized = isAuthorized;

    //     if (this.isAuthorized) {
    //       console.log('isAuthorized getting aksList');
          
    //     }
    //   });

    // this.userDataSubscription = this.oidcSecurityService.getUserData().subscribe(
    //   (userData: any) => {

    //     if (userData !== '') {
    //       for (let i = 0; i < userData.role.length; i++) {
    //         if (userData.role[i] === 'aks.admin') {
    //           this.hasAdminRole = true;
    //         }
    //         if (userData.role[i] === 'admin') {
    //         }
    //       }
    //     }

    //     console.log('userData getting data');
    //   });

      this.getAksList();
  }

  // ngOnDestroy(): void {
  //   if (this.isAuthorizedSubscription) {
  //     this.isAuthorizedSubscription.unsubscribe();
  //   }

  //   if (this.userDataSubscription) {
  //     this.userDataSubscription.unsubscribe();
  //   }
  // }

  private getAksList()
  {
    this._aksService.GetAKSList().subscribe(
      data => {
        this.aksList = data;
        this.cdr.detectChanges();
        console.log("aksList:");
        console.log(this.aksList);
      },
      error => console.log(error),
      () => console.log('getData Get all completed')
      );
  }

}
