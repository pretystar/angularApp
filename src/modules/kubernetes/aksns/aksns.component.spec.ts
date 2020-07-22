import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AksnsComponent } from './aksns.component';

describe('AksnsComponent', () => {
  let component: AksnsComponent;
  let fixture: ComponentFixture<AksnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AksnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AksnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
