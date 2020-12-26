import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateSchoolComponent} from './school/create-school/create-school.component';
import {ListSchoolComponent} from './school/list-school/list-school.component';
import {CreateAdministratorComponent} from './administrator/create-administrator/create-administrator.component';
import {ListAdministratorComponent} from './administrator/list-administrator/list-administrator.component';
import {CreateClassroomComponent} from './classroom/create-classroom/create-classroom.component';
import {ListClassroomComponent} from './classroom/list-classroom/list-classroom.component';
import {ListDocumentComponent} from './document/list-document/list-document.component';
import {DocumentDetailsComponent} from './document/details-document/document-details.component';
import {ListHomeworkComponent} from './homework/list-homework/list-homework.component';
import {DetailsHomeworkComponent} from './homework/details-homework/details-homework.component';
import {HomeworkListComponent} from './students/homework/homework-list/homework-list.component';
import {HomeworkDetailsComponent} from './students/homework/homework-details/homework-details.component';
import {DocumentListComponent} from './students/document/document-list/document-list.component';
import {StudentsDocumentDetailsComponent} from "./students/document/students-document-details/students-document-details.component";


const routes: Routes = [
  { path: 'school/create', component: CreateSchoolComponent },
  { path: 'school/list', component: ListSchoolComponent },
  { path: 'administrator/create', component: CreateAdministratorComponent },
  { path: 'administrator/list', component: ListAdministratorComponent },
  { path: 'classroom/create', component: CreateClassroomComponent },
  { path: 'classroom/list', component: ListClassroomComponent },
  // professor
  { path: 'document/list', component: ListDocumentComponent },
  { path: 'document/details', component: DocumentDetailsComponent},
  { path: 'homework/list', component: ListHomeworkComponent },
  { path: 'homework/details', component: DetailsHomeworkComponent},
  // student
  { path: 'student/homework/list', component: HomeworkListComponent},
  { path: 'student/homework/details', component: HomeworkDetailsComponent},
  { path: 'student/document/list', component: DocumentListComponent},
  { path: 'student/document/details', component: StudentsDocumentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
