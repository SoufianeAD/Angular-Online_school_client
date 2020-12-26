import {NgModule} from '@angular/core';
import {Document} from './Document.module';
import {FeedBack} from './FeedBack.module';
import {FileType} from './enums/FileType';

@NgModule()
export class File {

  id: number;
  title: string;
  type: FileType;
  document: Document;
  feedBack: FeedBack;
  constructor(){}
}
