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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
