import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourtradeComponent } from './yourtrade.component';

describe('YourtradeComponent', () => {
  let component: YourtradeComponent;
  let fixture: ComponentFixture<YourtradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourtradeComponent]
    });
    fixture = TestBed.createComponent(YourtradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
