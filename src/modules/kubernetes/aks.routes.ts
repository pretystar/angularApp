import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AkslistComponent } from './akslist/akslist.component';
import { AksnsComponent } from './aksns/aksns.component';
import { AksresourcesComponent } from './aksresources/aksresources.component'
// import { AksModule } from './aks.module';
import { IndexComponent } from './index/index.component';
import { AksdetailsComponent } from './aksdetails/aksdetails.component';


const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'list',
        component: AkslistComponent
    },
    {
        path: 'resources',
        component: AksresourcesComponent
    },
    {
        path: ':aksid/details',
        component: AksdetailsComponent
    },
    {
        path: ':aksid',
        component: AksnsComponent
    }
];

// export const AksRoutes = RouterModule.forChild(routes);
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AKSRoutingModule {}