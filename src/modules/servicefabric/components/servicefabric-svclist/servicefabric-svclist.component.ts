import { Component, OnInit, Input } from '@angular/core';
import { ServiceFabricService } from '../../ServiceFabric.service';

@Component({
  selector: 'app-servicefabric-svclist',
  templateUrl: './servicefabric-svclist.component.html',
  styleUrls: ['./servicefabric-svclist.component.scss']
})
export class ServicefabricSvclistComponent implements OnInit {
  @Input() id:any;
  @Input() appname: any;
  svclist: any;
  constructor(private _ServiceFabricService: ServiceFabricService) { }

  ngOnInit(): void {
    this.show();
  }
  private show(){
    console.log();
    this._ServiceFabricService.GetServiceInfoList(this.id, this.appname).subscribe(
      data => this.svclist = data,
      error => console.log(error),
      () => console.log("get service list")
    )
  }

}
