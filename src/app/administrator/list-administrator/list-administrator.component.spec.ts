import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdministratorComponent } from './list-administrator.component';

describe('ListAdministratorComponent', () => {
  let component: ListAdministratorComponent;
  let fixture: ComponentFixture<ListAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
