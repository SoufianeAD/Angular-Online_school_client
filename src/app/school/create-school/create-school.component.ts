import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SchoolService} from '../../services/school.service';
import {School} from '../../models/School.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.scss']
})
export class CreateSchoolComponent implements OnInit {
  createForm: FormGroup;
  constructor(public schoolService: SchoolService,
              private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      webSite: new FormControl('', Validators.required)
    });

  }

  onSubmit(): void {
    const school = new School();
    school.name = this.createForm.get('name').value;
    school.address = this.createForm.get('address').value;
    school.phone = this.createForm.get('phone').value;
    school.webSite = this.createForm.get('webSite').value;
    this.schoolService.createNewSchool(school);
    this.router.navigate(['/school/list']);
  }

}
