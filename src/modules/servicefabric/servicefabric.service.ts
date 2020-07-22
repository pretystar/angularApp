import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ServiceFabric } from './models/ServiceFabric';
import { Configuration } from '@app/app.constants';

@Injectable()
export class ServiceFabricService {

    private actionUrl: string;
    private headers: HttpHeaders = new HttpHeaders();
    private server: string;

    constructor(private http: HttpClient, configuration: Configuration, private _securityService: OidcSecurityService) {
        this.server = configuration.Server;
        this.actionUrl = `${configuration.Server}_api/fabric/`;
    }

    private setHeaders() {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');

        const token = this._securityService.getToken();
        if (token !== '') {
            const tokenValue = 'Bearer ' + token;
            this.headers = this.headers.append('Authorization', tokenValue);
        }
    }

    public GetAll = (): Observable<any> => {
        this.setHeaders();

        return this.http.get(this.actionUrl, { headers: this.headers });
    }
    public GetAllApps(id): Observable<any> {
        this.setHeaders();

        return this.http.get(this.actionUrl + id, { headers: this.headers });
    }
    public GetAllServices(id): Observable<any>  {
        this.setHeaders();
        return this.http.get(this.actionUrl + id + "/services", { headers: this.headers })
    }
    public GetById(id: number): Observable<any> {
        this.setHeaders();
        return this.http.get(this.actionUrl + id, {
            headers: this.headers
        });
    }

    public Add(itemToAdd: any): Observable<any> {
        this.setHeaders();
        return this.http.post<any>(this.actionUrl, JSON.stringify(itemToAdd), { headers: this.headers });
    }

    public Update(id: number, itemToUpdate: any): Observable<any> {
        this.setHeaders();
        return this.http
            .put<any>(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers });
    }

    public Delete(id: number): Observable<any> {
        this.setHeaders();
        return this.http.delete<any>(this.actionUrl + id, {
            headers: this.headers
        });
    }

    public GetServiceInfoList(id, appId): Observable<any> {
        this.setHeaders();
        return this.http.get<any>(this.actionUrl + id+"/"+appId, {
            headers: this.headers
        });
    }

    public ExportServices(id): Observable<any>{
        this.setHeaders;
        return this.http.get<any>(this.actionUrl + id+"/export", {
            headers: this.headers
        });
    }
    public ImportServices(id, formData) {

        return this.http.post<any>(this.actionUrl + id + "/services", formData,{  
            headers: {'Content-Type': 'application/json'},
          reportProgress: true,  
          observe: 'events'  
        });  
    }

    public UpdateService(id, formData) {

        return this.http.post<any>(this.actionUrl + id + "/service", formData,{  
            headers: {'Content-Type': 'application/json'},
            reportProgress: true,  
            observe: 'events'  
        });  
    }
}
