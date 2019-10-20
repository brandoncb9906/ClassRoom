import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStudentHomePage } from './manager-student-home.page';

describe('ManagerStudentHomePage', () => {
  let component: ManagerStudentHomePage;
  let fixture: ComponentFixture<ManagerStudentHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerStudentHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStudentHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
