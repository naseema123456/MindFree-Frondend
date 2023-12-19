import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSellingComponent } from './option-selling.component';

describe('OptionSellingComponent', () => {
  let component: OptionSellingComponent;
  let fixture: ComponentFixture<OptionSellingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionSellingComponent]
    });
    fixture = TestBed.createComponent(OptionSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
