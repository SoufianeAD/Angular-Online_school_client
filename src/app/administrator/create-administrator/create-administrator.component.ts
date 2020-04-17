import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Administrator} from '../../models/Administrator.module';
import {AdministratorService} from '../../services/administrator.service';
import {SchoolService} from '../../services/school.service';
import {School} from '../../models/School.module';
import {Subscription} from 'rxjs';
import {Account} from '../../models/Account.module';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-administrator',
  templateUrl: './create-administrator.component.html',
  styleUrls: ['./create-administrator.component.scss']
})
export class CreateAdministratorComponent implements OnInit {

  createForm: FormGroup;
  list: School[] = [];
  listSubscription: Subscription;
  school: School;

  constructor(public administratorService: AdministratorService,
              public schoolService: SchoolService,
              public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.init();
    this.listSubscription = this.schoolService.schoolSubject.subscribe(
      (schools: School[]) => {
        this.list = schools;
      }
    );
    this.schoolService.getSchools();
  }

  init(): void {

    this.createForm = new FormGroup({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      school: new FormControl(this.list[1])
    });
  }

  onSubmit(): void {
    const administrator = new Administrator();
    administrator.lastName = this.createForm.get('lastName').value;
    administrator.firstName = this.createForm.get('firstName').value;
    administrator.email = this.createForm.get('email').value;
    administrator.phone = this.createForm.get('phone').value;

    const account = new Account();
    account.userName = administrator.email;
    account.password = administrator.lastName + '/' + administrator.firstName;
    account.school = this.createForm.get('school').value;

    administrator.account = account;
    this.accountService.createNewAccount(account);
    this.administratorService.createNewAdministrator(administrator);
    this.router.navigate(['/administrator/list']);
  }
}
