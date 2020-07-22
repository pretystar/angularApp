import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicefabricAppsComponent } from './servicefabric-apps.component';

describe('ServicefabricAppsComponent', () => {
  let component: ServicefabricAppsComponent;
  let fixture: ComponentFixture<ServicefabricAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicefabricAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicefabricAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
