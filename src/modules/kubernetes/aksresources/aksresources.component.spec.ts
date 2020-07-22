import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AksresourcesComponent } from './aksresources.component';

describe('AksresourcesComponent', () => {
  let component: AksresourcesComponent;
  let fixture: ComponentFixture<AksresourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AksresourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AksresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
