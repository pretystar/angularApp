import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicefabricSvcComponent } from './servicefabric-svc.component';

describe('ServicefabricSvcComponent', () => {
  let component: ServicefabricSvcComponent;
  let fixture: ComponentFixture<ServicefabricSvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicefabricSvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicefabricSvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
