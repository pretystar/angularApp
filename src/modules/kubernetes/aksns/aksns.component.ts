import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AksService } from '../aks.service';
@Component({
  selector: 'app-aksns',
  templateUrl: './aksns.component.html',
  styleUrls: ['./aksns.component.css']
})
export class AksnsComponent implements OnInit {

 // @Input() 
 public aksid: string;
 public aksns:any;
 public selectedAksNS: any;
//  public isAuthorizedSubscription: Subscription | undefined;
//  public isAuthorized = false;
//  public userDataSubscription: Subscription | undefined;
//  public userData = false;
 public hasAdminRole = false;
 
 


 constructor(
   private _aksService: AksService,
   private oidcSecurityService: OidcSecurityService,
   private activatedRoute: ActivatedRoute
 ) {
 }

  ngOnInit() {
  //  this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
  //    (isAuthorized: boolean) => {
  //      this.isAuthorized = isAuthorized;

       this.activatedRoute.params.subscribe( val => {
          this.aksid = val.aksid;
          this.getAksns()
        })
    //  })

  //  this.userDataSubscription = this.oidcSecurityService.getUserData().subscribe(
  //    (userData: any) => {

  //      if (userData !== '') {
  //        for (let i = 0; i < userData.role.length; i++) {
  //          if (userData.role[i] === 'aks.admin') {
  //            this.hasAdminRole = true;
  //          }
  //          if (userData.role[i] === 'admin') {
  //          }
  //        }
  //      }

  //      console.log('userData getting data');
  //    });
     
     
 }

 ngOnDestroy(): void {
  //  if (this.isAuthorizedSubscription) {
  //    this.isAuthorizedSubscription.unsubscribe();
  //  }

  //  if (this.userDataSubscription) {
  //    this.userDataSubscription.unsubscribe();
  //  }
 }

 private getAksns(){
   
   console.log("aks namespaces for: " + String(this.aksid))
   this._aksService.ListNamespace(this.aksid).subscribe(
     data => this.aksns = data,
     error => console.log(error),
     () => console.log('getData Get all completed')
     );
 }
private onSelect(ns: string){
  this.selectedAksNS = ns;
}
 // private getItemsOfNS(){
 //   this._aksService.ListNamespace(this.aksid).subscribe(
 //     data => this.aksns = data,
 //     error => console.log(error),
 //     () => console.log('getData Get all completed')
 //     );
 // }
  public downloadkubeconfig(id:string){
    this._aksService.Downloadkubeconfig(id).subscribe(response => this.downLoadFile(response, "application/octet-stream"));
  }

  // private downLoadFile(data: any, type: string) {
  //   let blob = new Blob(data, { type: type});
  //   let url = window.URL.createObjectURL(blob);
  //   let pwa = window.open(url);
  //   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
  //       alert( 'Please disable your Pop-up blocker and try again.');
  //   }
  // }
  private downLoadFile(response: any, type: string) {
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    downloadLink.setAttribute('download', this.aksid);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
