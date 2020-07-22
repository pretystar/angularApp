import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AksdetailsComponent } from './aksdetails.component';

describe('AksdetailsComponent', () => {
  let component: AksdetailsComponent;
  let fixture: ComponentFixture<AksdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AksdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AksdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
