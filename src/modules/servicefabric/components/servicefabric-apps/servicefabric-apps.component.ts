// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, OnDestroy,ChangeDetectionStrategy, ChangeDetectorRef,ElementRef,ViewChild, } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceFabricService } from '../../ServiceFabric.service';
// import { ServicefabricServicesComponent } from '../servicefabric-services';
import { Chart } from 'chart.js';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServicefabricSvclistComponent } from '../servicefabric-svclist';

@Component({
  selector: 'app-servicefabric-apps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './servicefabric-apps.component.html',
  styleUrls: ['./servicefabric-apps.component.scss']
})
export class ServicefabricAppsComponent implements OnInit {
  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  private id : any;
  private apps : any;
  private healthstatistic : any;
  appSubscription: Subscription | undefined;
  view: any[] = [400, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = { domain: ['#5AA454', '#A10A28']  };
  

  constructor(
    private _ServiceFabricService: ServiceFabricService,
    private _route: ActivatedRoute,
    private _router: Router,
    private cdr:ChangeDetectorRef
  ) { 

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.GetAllApps();
    });
  }

  ngAfterViewInit() {
    this.appSubscription.add(() => {
        var healthState = this.apps.map(app => app.healthState)
        var healthdata = [healthState.filter(x => x===1).length,healthState.filter(x => x!==1).length]
        this.healthstatistic = [{"name": "health", "value": healthState.filter(x => x===1).length},
                                {"name": "unhealth","value": healthState.filter(x => x!==1).length}]
        this.cdr.detectChanges();
        this.chart = new Chart(this.myPieChart.nativeElement, {
            type: 'pie',
            data: {
                labels: ['health', 'unhealth'],
                datasets: [
                    {
                        data: healthdata,
                        backgroundColor: ['green','red'],
                    },
                ],
            },
        });
    })
    
  }
  private expand(appName){
    console.log(appName);
    // $("svc"+appName).getText().then(text => console.log("svc"+text))
    // $("svc"+appName).getAttribute()
    this._ServiceFabricService.GetServiceInfoList(this.id, appName).subscribe(
      data => console.log(data),
      error => console.log(error)
      
    )
  }
  // private GetServiceInfoList(appName){
  //   this._ServiceFabricService.GetServiceInfoList(this.id, appName).subscribe(

  //   )
  // }
  private GetAllApps(){
    this.appSubscription =  this._ServiceFabricService.GetAllApps(this.id).subscribe(
      data => {
        this.apps = data;
        this.cdr.detectChanges();
      },
      error => console.log(error),
      () => console.log("Get fabric apps")
    )
  }
}
