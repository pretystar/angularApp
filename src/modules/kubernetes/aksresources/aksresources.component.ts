import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AksService } from '../aks.service';

@Component({
  selector: 'app-aksresources',
  templateUrl: './aksresources.component.html',
  styleUrls: ['./aksresources.component.css']
})
export class AksresourcesComponent implements OnInit {

  @Input() aksid:string;
  @Input() aksns:string;

  public resourcesInNS:any;

  // public isAuthorizedSubscription: Subscription | undefined;
  // public isAuthorized = false;
  // public userDataSubscription: Subscription | undefined;
  // public userData = false;
  public hasAdminRole = false;

  constructor(private _aksService: AksService,
    private oidcSecurityService: OidcSecurityService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( val => {
      this.aksid = val.aksid;
      this.ListNamespacedPod("pod");
    })
    // this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
    //   (isAuthorized: boolean) => {
    //     this.isAuthorized = isAuthorized;
 
        
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
  }

  private ListNamespacedPod(type){
    this._aksService.ListNamespacedPod(this.aksid,this.aksns).subscribe(
      data => {
        this.resourcesInNS = data;
        console.log(this.resourcesInNS.items);
      },
      error => console.log(error),
      () => console.log('getData Get all completed')
      );
  }
}
