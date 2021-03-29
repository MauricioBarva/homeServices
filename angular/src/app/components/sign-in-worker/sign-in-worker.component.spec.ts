import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWorkerComponent } from './sign-in-worker.component';

describe('SignInWorkerComponent', () => {
  let component: SignInWorkerComponent;
  let fixture: ComponentFixture<SignInWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
