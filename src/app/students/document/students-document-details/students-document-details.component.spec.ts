import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDocumentDetailsComponent } from './students-document-details.component';

describe('StudentsDocumentDetailsComponent', () => {
  let component: StudentsDocumentDetailsComponent;
  let fixture: ComponentFixture<StudentsDocumentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsDocumentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsDocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
