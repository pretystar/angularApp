/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
// import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard - DrillPlan DevOps Portal',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    active: true,
                },
            ],
        } as SBRouteData,
        // canActivate: [],
        component: dashboardContainers.DashboardComponent,
        children:[
            { 
                path: 'k8s', 
                loadChildren: () => import(`@modules/kubernetes/aks.module`).then(m => m.AksModule) 
            },
            { 
                path: 'fabric', 
                loadChildren: () => import(`@modules/servicefabric/servicefabric.module`).then(m => m.ServiceFabricModule) 
            },
        ]
    },
    {
        path: 'static',
        data: {
            title: 'Dashboard Static - DrillPlan DevOps Portal',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Static',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.StaticComponent,
    },
    {
        path: 'light',
        data: {
            title: 'Dashboard Light - DrillPlan DevOps Portal',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Light',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.LightComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
