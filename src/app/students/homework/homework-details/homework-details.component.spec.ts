import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkDetailsComponent } from './homework-details.component';

describe('HomeworkDetailsComponent', () => {
  let component: HomeworkDetailsComponent;
  let fixture: ComponentFixture<HomeworkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
