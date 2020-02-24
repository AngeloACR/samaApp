import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbHandlerService } from '../../dashboard/services/db-handler.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registro: FormGroup;

  constructor(
    private auth: AuthService,
    private dbHandler: DbHandlerService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registro = new FormGroup({
      username: new FormControl(''),
      name: new FormControl(''),
      mail: new FormControl(''),
      password: new FormControl(''),
      cpassword: new FormControl(''),
    });

  }

  registerUser() {
    var values = this.registro.value;
    values['type'] = 'Cliente';
    let myEnd = '/users/'
    this.dbHandler.createSomething(values, myEnd)
      .subscribe(data => {   // data is already a JSON object
        this.router.navigateByUrl('/login');
      });
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  flush() {
    this.registro.setValue({
      username: '',
      password: ''
    });
  }

}
