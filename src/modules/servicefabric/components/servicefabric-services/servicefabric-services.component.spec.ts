import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicefabricServicesComponent } from './servicefabric-services.component';

describe('ServicefabricServicesComponent', () => {
  let component: ServicefabricServicesComponent;
  let fixture: ComponentFixture<ServicefabricServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicefabricServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicefabricServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
