import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHomeworkComponent } from './list-homework.component';

describe('ListHomeworkComponent', () => {
  let component: ListHomeworkComponent;
  let fixture: ComponentFixture<ListHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
