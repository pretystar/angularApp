import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ServiceFabricService } from './ServiceFabric.service';
import { ServiceFabricListComponent } from './components/ServiceFabric-list.component';
import { ServiceFabricCreateComponent } from './components/ServiceFabric-create.component';
import { ServiceFabricEditComponent } from './components/ServiceFabric-edit.component';
import { ServicefabricAppsComponent } from './components/servicefabric-apps/servicefabric-apps.component';
import { ServicefabricServicesComponent } from './components/servicefabric-services/servicefabric-services.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServicefabricSvclistComponent } from './components/servicefabric-svclist/servicefabric-svclist.component';
import { FabricRoutingModule } from "./servicefabric.routes"
import { 
    MatTableModule, 
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule} from '@angular/material';
import { ServicefabricSvcComponent } from './components/servicefabric-svc/servicefabric-svc.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
// import { MaterialModule } from '@modules/shared/Material.module';
// import { ServiceFabricRoutes } from './ServiceFabric.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgxChartsModule,
        MatTabsModule,
        MatExpansionModule,
        FabricRoutingModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    
        // MaterialModule,
       
        // ServiceFabricRoutes
    ],

    declarations: [
        ServiceFabricListComponent,
        ServiceFabricCreateComponent,
        ServiceFabricEditComponent,
        ServicefabricAppsComponent,
        ServicefabricServicesComponent,
        ServicefabricSvclistComponent,
        ServicefabricSvcComponent,
        DialogBoxComponent
    ],
    entryComponents: [
        DialogBoxComponent
      ],
    providers: [
        ServiceFabricService
    ],

    exports: [
        ServiceFabricListComponent,
        ServiceFabricCreateComponent,
        ServiceFabricEditComponent,
        ServicefabricAppsComponent,
        ServicefabricServicesComponent,
        ServicefabricSvclistComponent
    ]
})

export class ServiceFabricModule { }
