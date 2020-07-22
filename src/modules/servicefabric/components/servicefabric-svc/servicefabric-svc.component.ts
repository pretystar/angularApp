import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceFabricService } from '../../ServiceFabric.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
@Component({
  selector: 'app-servicefabric-svc',
  templateUrl: './servicefabric-svc.component.html',
  styleUrls: ['./servicefabric-svc.component.scss']
})
export class ServicefabricSvcComponent implements OnInit {

  @Input() id: string;
  private services: any;
  displayedColumns: string[] = ['ServiceId', 'InstanceCount', 'PlanceConstraint', 'action'];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = { data: '', inProgress: false, progress: 0 };

  constructor(public dialog: MatDialog,
    private _ServiceFabricService: ServiceFabricService,
    private _route: ActivatedRoute,
    private _router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.GetFabricServices();
    });

  }
  private GetFabricServices() {
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

  private onExportServices() {
    this._ServiceFabricService.ExportServices(this.id).subscribe(response => this.downLoadFile(JSON.stringify(response), "application/octet-stream"));
  }

  private downLoadFile(response: any, type: string) {
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    downloadLink.setAttribute('download', this.id);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }



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
  //////////////////////////////////////////
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    var d = new Date();
    this.services.push({
      serviceId: row_obj.serviceId,
      instanceCount: row_obj.instanceCount,
      planceConstraint: row_obj.planceConstraint
    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.services = this.services.filter((value, key) => {
      if (value.serviceId == row_obj.serviceId) {
        value.instanceCount = row_obj.instanceCount;
        value.planceConstraint = row_obj.planceConstraint;

        
      }

      

        return true;
    });

    this._ServiceFabricService.UpdateService(this.id,row_obj).pipe(
      map(event => {
        switch (event.type) {
          // case HttpEventType.UploadProgress:
          //   file.progress = Math.round(event.loaded * 100 / event.total);
          //   break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return of(`fail to update`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }
  deleteRowData(row_obj) {
    this.services = this.services.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }
}
