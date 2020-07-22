import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicefabricSvclistComponent } from './servicefabric-svclist.component';

describe('ServicefabricSvclistComponent', () => {
  let component: ServicefabricSvclistComponent;
  let fixture: ComponentFixture<ServicefabricSvclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicefabricSvclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicefabricSvclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
