import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwingTradeComponent } from './swing-trade.component';

describe('SwingTradeComponent', () => {
  let component: SwingTradeComponent;
  let fixture: ComponentFixture<SwingTradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwingTradeComponent]
    });
    fixture = TestBed.createComponent(SwingTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
