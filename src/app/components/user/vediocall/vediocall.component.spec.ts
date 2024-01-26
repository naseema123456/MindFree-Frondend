import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VediocallComponent } from './vediocall.component';

describe('VediocallComponent', () => {
  let component: VediocallComponent;
  let fixture: ComponentFixture<VediocallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VediocallComponent]
    });
    fixture = TestBed.createComponent(VediocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
