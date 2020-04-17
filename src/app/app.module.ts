import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AbsenceService} from './services/absence.service';
import {AccountService} from './services/account.service';
import {AdministratorService} from './services/administrator.service';
import {ClassRoomService} from './services/class-room.service';
import {ProfessorService} from './services/professor.service';
import {SchoolService} from './services/school.service';
import {SessionService} from './services/session.service';
import {StudentService} from './services/student.service';
import { CreateSchoolComponent } from './school/create-school/create-school.component';
import { ListSchoolComponent } from './school/list-school/list-school.component';
import { ListAdministratorComponent } from './administrator/list-administrator/list-administrator.component';
import { CreateAdministratorComponent } from './administrator/create-administrator/create-administrator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { CreateClassroomComponent } from './classroom/create-classroom/create-classroom.component';
import { ListClassroomComponent } from './classroom/list-classroom/list-classroom.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSchoolComponent,
    ListSchoolComponent,
    ListAdministratorComponent,
    CreateAdministratorComponent,
    CreateClassroomComponent,
    ListClassroomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AbsenceService,
    AccountService,
    AdministratorService,
    ClassRoomService,
    ProfessorService,
    SchoolService,
    SessionService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
