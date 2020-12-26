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
import {HttpClientModule} from '@angular/common/http';
import { CreateClassroomComponent } from './classroom/create-classroom/create-classroom.component';
import { ListClassroomComponent } from './classroom/list-classroom/list-classroom.component';
import {FileService} from './services/file.service';
import { ListDocumentComponent } from './document/list-document/list-document.component';
import {DocumentService} from './services/document.service';
import { DocumentDetailsComponent } from './document/details-document/document-details.component';
import { ListHomeworkComponent } from './homework/list-homework/list-homework.component';
import { DetailsHomeworkComponent } from './homework/details-homework/details-homework.component';
import {HomeworkService} from './services/homework.service';
import { HomeworkListComponent } from './students/homework/homework-list/homework-list.component';
import { HomeworkDetailsComponent } from './students/homework/homework-details/homework-details.component';
import { DocumentListComponent } from './students/document/document-list/document-list.component';
import { StudentsDocumentDetailsComponent } from './students/document/students-document-details/students-document-details.component';
import {FeedBackService} from "./services/feed-back.service";

@NgModule({
  declarations: [
    AppComponent,
    CreateSchoolComponent,
    ListSchoolComponent,
    ListAdministratorComponent,
    CreateAdministratorComponent,
    CreateClassroomComponent,
    ListClassroomComponent,
    ListDocumentComponent,
    DocumentDetailsComponent,
    ListHomeworkComponent,
    DetailsHomeworkComponent,
    HomeworkListComponent,
    HomeworkDetailsComponent,
    DocumentListComponent,
    StudentsDocumentDetailsComponent,
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
    StudentService,
    FileService,
    DocumentService,
    HomeworkService,
    FeedBackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
