import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangageUserComponent } from './mangage-user.component';

describe('MangageUserComponent', () => {
  let component: MangageUserComponent;
  let fixture: ComponentFixture<MangageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangageUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
