import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoUserFormComponent } from './no-user-form.component';

describe('NoUserFormComponent', () => {
  let component: NoUserFormComponent;
  let fixture: ComponentFixture<NoUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
