import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionBuyingComponent } from './option-buying.component';

describe('OptionBuyingComponent', () => {
  let component: OptionBuyingComponent;
  let fixture: ComponentFixture<OptionBuyingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionBuyingComponent]
    });
    fixture = TestBed.createComponent(OptionBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
