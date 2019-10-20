import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHomePage } from './teacher-home.page';

describe('TeacherHomePage', () => {
  let component: TeacherHomePage;
  let fixture: ComponentFixture<TeacherHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
