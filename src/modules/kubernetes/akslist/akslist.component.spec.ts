import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkslistComponent } from './akslist.component';

describe('AkslistComponent', () => {
  let component: AkslistComponent;
  let fixture: ComponentFixture<AkslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
