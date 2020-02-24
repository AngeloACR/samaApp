import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  id: string;
  endpoint: string;
  title: string;
  forms: string[];
  fields: string[];
  values: string[];
  name: string;
  addText: string;
  myForm: FormGroup;
  passwordForm: FormGroup;
  empresasForm: FormGroup;
  myInputs: FormArray;
  addForm: boolean;
  showForm: boolean;
  showRow: {};
  showPass: {};
  boxOn: boolean;
  menu: any;
  menuOn: number;
  isUsers=false;
  isEmpresas=false;



  openBox: {};
  constructor(
    private actRoute: ActivatedRoute,
    private dbHandler: DbHandlerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'adm') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.setMenu();
    if (this.id == '0') {
      this.isUsers = true;
      this.isEmpresas = false;
      this.initComponent('/users/all', 'users', 'Administrador de usuarios', 'Agregar usuarios')
    } else if (this.id == '1') {
      this.isUsers = false;
      this.isEmpresas = true;
      this.initComponent('/empresas/', 'empresas', 'Administrador de empresas', 'Agregar empresa')
    } else if (this.id == '2') {
      this.initComponent('/permisos/', 'permisos', 'Administrador de permisos', 'Agregar permiso')
    } else if (this.id == '3') {
      this.initComponent('/generador/', 'generador', 'Administrador del generador', 'Agregar al generador')
    }
    //this.forms = new Array();

    this.values = this.dbHandler.getLocal(this.name + 'Values');
    this.fields = this.dbHandler.getLocal(this.name + 'Fields');
    this.initForm();
    this.showRow = {
      showRow: false
    };
    this.boxOn = false;
    this.openBox = {
      openBox: false
    };

  }

  setMenu() {
    this.menu = [{
      name: 'Administrar usuarios',
      link: '/adm/0',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Administrar empresas',
      link: '/adm/1',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Administrar permisos',
      link: '/adm/2',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Administrar generador',
      link: '/adm/3',
      class: {
        menuAct: false
      },
    }];
    this.menuOn = +this.id;
    this.menu[this.menuOn].class = {
      menuAct: true
    };
  }

  initForm() {
    this.forms = new Array();
    this.showForm = false;
    this.myInputs = new FormArray([]);
    let aux = {};
    this.fields.forEach(field => {
      this.myInputs.push(new FormControl(''));
    });
    this.showRow = {
      showRow: false
    };
    this.myForm = new FormGroup({
      myInputs: this.myInputs,
    });

    this.passwordForm = new FormGroup({
      name: new FormControl(''),
      mail: new FormControl(''),
      username: new FormControl(''),
      type: new FormControl(''),
      password: new FormControl(''),
      passwordAgain: new FormControl('')
    });
    this.empresasForm = new FormGroup({
      codigo: new FormControl(''),
      abreviatura: new FormControl(''),
      rif: new FormControl(''),
      ctas: new FormControl(''),
      nombre: new FormControl(''),
    });
/*     this.myForm = new FormGroup(aux);
 */}


  initComponent(endpoint, name, title, addText) {
    this.endpoint = endpoint;
    this.name = name;
    this.title = title;
    this.addText = addText;
  }
  printId(id: string) {
    return id;
  }

  deleteItem(event, item) {
    var myEnd = this.endpoint;
    if (myEnd == '/users/all') {
      myEnd = myEnd.replace('/all', '/')
    }
    console.log(item);
    let functions = [];
    /*     this.dbHandler.deleteSomething(item[0], myEnd)
          .subscribe(data => {   // data is already a JSON object
            this.dbHandler.refreshData(myEnd, this.name);
          }); */
    this.dbHandler.deleteSomething(item[1], myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(this.endpoint))
    ).subscribe((info) => {
      this.dbHandler.refreshData(info, this.name)
      window.location.reload();
    });

  }

  confirmAdd() {
    var myEnd = this.endpoint;
    let body = {};
    if (myEnd == '/users/all') {
      myEnd = myEnd.replace('/all', '/')
      body['password'] = this.passwordForm.value.password;
    }
    let values = this.myForm.value.myInputs
    let i = 0;
    this.fields.forEach(field => {
      let myField = field.toLowerCase();
      body[myField] = values[i];
      i++;
    });
/*     this.dbHandler.createSomething(body, myEnd)
      .subscribe(data => {   // data is already a JSON object
        this.dbHandler.refreshData(myEnd, this.name);
      });
 */  }

  openForm() {
    this.forms.push('');
    //this.showForm = true;
    this.tBox();

  }

  tBox() {
    this.boxOn = !this.boxOn;
    this.openBox = {
      oBox: this.boxOn
    };
  };

  confirmPass() {
    var myEnd = this.endpoint;
    let body = {};
    if (myEnd == '/users/all') {
      myEnd = myEnd.replace('/all', '/')
    }
    if(this.isEmpresas){
      body = this.passwordForm.value;
    }else if(this.isEmpresas){
      body = this.empresasForm.value;
    }
    /*     this.dbHandler.createSomething(body, myEnd)
          .subscribe(data => {   // data is already a JSON object
            this.dbHandler.refreshData(myEnd, this.name);
          });
     */
    this.dbHandler.createSomething(body, myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(this.endpoint))
    ).subscribe((info) => {
      console.log(info);
      this.tBox();
      if (info['status']) {
        this.dbHandler.refreshData(info, this.name)
        window.location.reload();
      }
    });

  };

  toggleMenu(event, item, id) {
    let link = item.link;
    this.router.navigateByUrl(link);
  }
}