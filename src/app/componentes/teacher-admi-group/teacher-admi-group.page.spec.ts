import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAdmiGroupPage } from './teacher-admi-group.page';

describe('TeacherAdmiGroupPage', () => {
  let component: TeacherAdmiGroupPage;
  let fixture: ComponentFixture<TeacherAdmiGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAdmiGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAdmiGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
