import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Configuration } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AksService {

  private headers: HttpHeaders = new HttpHeaders();
  private server: string;

  constructor(private http: HttpClient, configuration: Configuration, private _securityService: OidcSecurityService) {
    this.server = configuration.Server;
  }

  private setHeaders() {
    this.setToken();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }
  private setToken(){
    this.headers = new HttpHeaders();
    const token = this._securityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.append('Authorization', tokenValue);
    }
  }
  public ListNamespace(id: string): Observable<any> {
    this.setHeaders();
    // console.log(id);
    // id="tj06";
    // return this.http.get<any>(this.server + "api/Forward/"+ id, {
    return this.http.get<any>("_api/aks/"+ id, {headers: this.headers});
  }

  public GetAKSList(): Observable<any> {
    this.setHeaders();
    // return this.http.get<any>(this.server + "api/Forward/GetAksList", {
    return this.http.get<any>("_api/aks/GetAKSList", {
      headers: this.headers
    });
  }

  public ListNamespacedPod(id:string,ns: string): Observable<any> {
    this.setHeaders();
    // return this.http.get<any>(this.server + "api/Forward/GetAksList", {
    return this.http.get<any>("_api/aks/"+id+"/"+ns , {
      headers: this.headers
    });
  }
  public ListPodForAllNamespaces(id:string): Observable<any> {
    this.setHeaders();
    // return this.http.get<any>(this.server + "api/Forward/GetAksList", {
    return this.http.get<any>("_api/aks/"+id+"/ListPodForAllNamespaces", {
      headers: this.headers
    });
  }
  public Downloadkubeconfig(id:string):Observable<any> {
    this.setToken();
    this.headers = this.headers.set('Accept', 'application/octet-stream');
      //./_api/aks/downloadaksprofile?id={{aksid}}
    return this.http.get("_api/aks/downloadaksprofile?id="+id , {headers: this.headers,responseType: 'blob'},);
  }
  public GetNodesMetrics(id:string):Observable<any> {
    this.setToken();
    this.headers = this.headers.set('Accept', 'application/octet-stream');
      //./_api/aks/downloadaksprofile?id={{aksid}}
    return this.http.get("_api/aks/GetNodesMetrics?id="+id , {headers: this.headers},);
  }
  public GetPodsMetrics(id:string):Observable<any> {
    this.setToken();
    this.headers = this.headers.set('Accept', 'application/octet-stream');
      //./_api/aks/downloadaksprofile?id={{aksid}}
    return this.http.get("_api/aks/GetPodsMetrics?id="+id , {headers: this.headers},);
  }

}
