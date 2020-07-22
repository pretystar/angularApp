import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AkslistComponent } from './akslist/akslist.component';
import { AksService } from './aks.service';
import { AksresourcesComponent } from './aksresources/aksresources.component';
import { AksnsComponent } from './aksns/aksns.component'
import { IndexComponent } from './index/index.component';
import { AksdetailsComponent } from './aksdetails/aksdetails.component';
import { AKSRoutingModule } from './aks.routes';


@NgModule({
  declarations: [
    AkslistComponent,
    AksresourcesComponent, 
    AksnsComponent, 
    IndexComponent,
    AksdetailsComponent
  ],
  
  imports: [
    CommonModule,
    AKSRoutingModule,
    // HttpClientModule,
    AppCommonModule,
    NavigationModule,
  ],


  providers: [
    AksService
  ],

  exports: [
    AkslistComponent,
    AksnsComponent,
    AksresourcesComponent,
    AksdetailsComponent
  ],
  bootstrap: [IndexComponent],
})
export class AksModule { }
