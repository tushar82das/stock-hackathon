import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedStockComponent } from './purchased-stock.component';

describe('PurchasedStockComponent', () => {
  let component: PurchasedStockComponent;
  let fixture: ComponentFixture<PurchasedStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
