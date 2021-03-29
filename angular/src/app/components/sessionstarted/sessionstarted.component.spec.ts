import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionstartedComponent } from './sessionstarted.component';

describe('SessionstartedComponent', () => {
  let component: SessionstartedComponent;
  let fixture: ComponentFixture<SessionstartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionstartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
