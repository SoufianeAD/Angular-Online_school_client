import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHomeworkComponent } from './details-homework.component';

describe('DetailsHomeworkComponent', () => {
  let component: DetailsHomeworkComponent;
  let fixture: ComponentFixture<DetailsHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
