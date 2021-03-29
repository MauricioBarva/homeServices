import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerStartedSessionComponent } from './worker-started-session.component';

describe('WorkerStartedSessionComponent', () => {
  let component: WorkerStartedSessionComponent;
  let fixture: ComponentFixture<WorkerStartedSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerStartedSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerStartedSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
