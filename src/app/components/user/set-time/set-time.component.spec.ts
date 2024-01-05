import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTimeComponent } from './set-time.component';

describe('SetTimeComponent', () => {
  let component: SetTimeComponent;
  let fixture: ComponentFixture<SetTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetTimeComponent]
    });
    fixture = TestBed.createComponent(SetTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
