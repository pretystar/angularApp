import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ServiceFabricListComponent } from './components/ServiceFabric-list.component';
import { ServiceFabricCreateComponent } from './components/ServiceFabric-create.component';
import { ServiceFabricEditComponent } from './components/ServiceFabric-edit.component';
// import { ServiceFabricModule } from './servicefabric.module';
import { ServicefabricAppsComponent } from './components/servicefabric-apps/servicefabric-apps.component';
import { ServicefabricServicesComponent } from './components/servicefabric-services/servicefabric-services.component'
import { ServicefabricSvcComponent } from './components/servicefabric-svc/servicefabric-svc.component';

const routes: Routes = [
    {
        path: 'create',
        component: ServiceFabricCreateComponent
    },
    {
        path: ':id',
        component: ServicefabricAppsComponent
    },
    {
        path: ':id/services',
        component: ServicefabricServicesComponent
    },
    {
        path: ':id/svc',
        component: ServicefabricSvcComponent
    },
    {
        path: 'edit/:id',
        component: ServiceFabricEditComponent
    },
    {
        path: '',
        component: ServiceFabricListComponent,
    }
];
@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FabricRoutingModule {}
