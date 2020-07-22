import { Component, OnInit, Input, AfterContentInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AksService } from '../aks.service';

@Component({
  selector: 'app-aksdetails',
  templateUrl: './aksdetails.component.html',
  styleUrls: ['./aksdetails.component.css']
})
export class AksdetailsComponent implements OnInit, AfterViewInit {
  // @Input() 
  public aksid: string;
  // public isAuthorizedSubscription: Subscription | undefined;
  // public isAuthorized = false;

  // public userDataSubscription: Subscription | undefined;
  // public userData = false;
  // public hasAdminRole = false;
  
  // _pods: Observable<any>;
  // _podmetrics:Observable<any>;
  // _nodemetrics: Observable<any>;
  pods : Subscription | undefined;
  podmetrics : Subscription | undefined;
  nodemetrics : Subscription | undefined;
  // pods = new Subject<any>();
  // podmetrics = new Subject<any>();
  // nodemetrics = new Subject<any>();
  // _pods: any;
  // _podmetrics: any;
  // _nodemetrics: any;


  constructor(
    private _aksService: AksService,
    private oidcSecurityService: OidcSecurityService,
    private activatedRoute: ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {
  }
  // get pods(){
  //   return this._pods;
  // }
  // get podmetrics(){
  //   return this._podmetrics;
  // }
  // get nodemetrics(){
  //   return this._nodemetrics;
  // }
  ngAfterViewInit(){
    
  }
  ngOnInit() {
   
    this.activatedRoute.params.subscribe( val => {
        this.aksid = val.aksid;
    })
    this.GetNodesMetrics();
    this.GetPodsMetrics();
    this.ListPodForAllNamespaces();
    
  }

  ngOnDestroy(): void {
    // if (this.isAuthorizedSubscription) {
    //   this.isAuthorizedSubscription.unsubscribe();
    // }

    // if (this.userDataSubscription) {
    //   this.userDataSubscription.unsubscribe();
    // }
  }

  private ListPodForAllNamespaces(){
    
    console.log("aksdetails for: " + String(this.aksid))
    this._aksService.ListPodForAllNamespaces(this.aksid).subscribe(
      data => {
        this.pods = data;
        this.cdr.detectChanges();
      },
      error => console.log(error),
      () => console.log('Error for getting aks pods')
      );
  }

  private GetPodsMetrics(){

    this._aksService.GetPodsMetrics(this.aksid).subscribe(
      data => {this.podmetrics = data;this.cdr.detectChanges();},
      error => console.log(error),
        () => console.log('Error for getting aks pods metrics')
      );
  }
  private GetNodesMetrics(){
    // this.nodemetrics = this._aksService.GetNodesMetrics(this.aksid);
    this._aksService.GetNodesMetrics(this.aksid).subscribe(
      data => {this.nodemetrics = data;this.cdr.detectChanges();},
      error => console.log(error),
        () => console.log('Error for getting aks node metrics')
      );
  }
  private PodInNode(nodeofPod:string, node:string){
    return (nodeofPod == node);
  }
  // private getItemsOfNS(){
  //   this._aksService.ListNamespace(this.aksid).subscribe(
  //     data => this.aksns = data,
  //     error => console.log(error),
  //     () => console.log('getData Get all completed')
  //     );
  // }

  

}
