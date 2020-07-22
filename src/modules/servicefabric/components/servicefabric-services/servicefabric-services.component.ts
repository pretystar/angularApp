import { Component, OnInit,Input,ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceFabricService } from '../../ServiceFabric.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  

@Component({
  selector: 'app-servicefabric-services',
  templateUrl: './servicefabric-services.component.html',
  styleUrls: ['./servicefabric-services.component.scss']
})
export class ServicefabricServicesComponent implements OnInit {

  @Input() id : string;
  
  private services : any;

  constructor(
    private _ServiceFabricService: ServiceFabricService,
    private _route: ActivatedRoute,
    private _router: Router,
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.GetFabricServices();
    });

  }
  private GetFabricServices()
  {
    this._ServiceFabricService.GetAllServices(this.id).subscribe(
      data => {
        this.services = data;
        this.cdr.detectChanges();
        console.log(data);
      },
      error => console.log(error),
      () => console.log("Get services")
    )
  }

  private onExportServices(){
    this._ServiceFabricService.ExportServices(this.id).subscribe(response => this.downLoadFile(JSON.stringify(response), "application/octet-stream"));
  }

  private downLoadFile(response: any, type: string) {
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    downloadLink.setAttribute('download', this.id);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  // upload(files) {
  //   if (files.length === 0)
  //       return;

  //   const formData = new FormData();

  //   for (let file of files)
  //       formData.append(file.name, file);

  //   const req = new HttpRequest('POST', `api/files`, formData, {
  //       reportProgress: true,
  //   });

  //   this.http.request(req).subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress)
  //           this.uploadProgress = Math.round(100 * event.loaded / event.total);
  //       else if (event instanceof HttpResponse)
  //           console.log('Files uploaded!');
  //   });
  // }
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files  = { data: '',inProgress: false, progress: 0};  

  onUploadServices() {  
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {  
      
      // for (let index = 0; index < fileUpload.files.length; index++)  
      // {  
      // const file = fileUpload.files[index];  
      // this.files.push({ data: file, inProgress: false, progress: 0});  
      // }  
      let reader = new FileReader();
      reader.readAsText(fileUpload.files[0]);
      reader.onload = () => {
        let result = reader.result.toString();
        // let base64result = result.split(',')[1];

        this.uploadFile1(result);
      }
      // this.files.data = fileUpload.files[0];
      // this.uploadFile(this.files);  

      // var fd = new FormData();
      // fd.append('data', JSON.parse(fileUpload.files[0]));
      // fd.append('data', fileUpload.files[0]);
      this.fileUpload.nativeElement.value = '';  
    };  
    fileUpload.click();  
  }
  uploadFile1(data) {  
    // const formData = new FormData();  
    // formData.append('file', data);  
    
    this._ServiceFabricService.ImportServices(this.id, data).pipe(  
      map(event => {  
        switch (event.type) {  
          // case HttpEventType.UploadProgress:  
            // file.progress = Math.round(event.loaded * 100 / event.total);  
            // break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        // file.inProgress = false;  
        return of(`upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }
  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this._ServiceFabricService.ImportServices(this.id, formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }
}
