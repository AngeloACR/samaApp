import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service'
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {
  fields: string[];
  values: string[];
  name: string;

  openBox: {};
  showPass: {};
  boxOn: boolean;
  show: boolean;
  endpoint: string;
  type: string;
  localstorage: string;
  directorioProveedores: FormGroup;
  directorioEmpleados: FormGroup;
  directorioTrabajadores: FormGroup;
  directorioClientes: FormGroup;
  bank: FormGroup;
  title: string;

  id: string;
  forms: string[];
  addText: string;
  myForm: FormGroup;
  passwordForm: FormGroup;
  myInputs: FormArray;
  addForm: boolean;
  showForm: boolean;
  showRow: {};

  menu: any;
  menuOn: number;

  constructor(
    private dbHandler: DbHandlerService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'dir') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.setMenu()
    this.name = 'users';
    this.endpoint = '/users';
    this.name = 'users';
    if(this.id == '0'){
      this.initComponent('/users/Proveedor', 'Proveedor', 'Lista de Proveedores')
    } else if(this.id == '1'){
      this.initComponent('/users/Cliente', 'Cliente', 'Lista de Clientes')
    } else if(this.id == '2'){
      this.initComponent('/users/Empleado', 'Empleado', 'Lista de Empleados')
    } else if(this.id == '3'){
      this.initComponent('/users/Miscelaneo', 'Miscelaneo', 'Lista de Miscelaneos')
    } else if(this.id == '4'){
      this.initComponent('/users/Admin', 'Admin', 'Lista de Administradores')
    }

    this.values = [];
    let vAux = this.dbHandler.getLocal(this.name + 'Values');
    this.fields = this.dbHandler.getLocal(this.name + 'Fields');
    for (var i = 0; i < vAux.length; i++) {
      if (vAux[i][2] === this.type) {
        this.values.push(vAux[i]);
      }
    }
    this.boxOn = false;
    this.initForm();
    this.showRow = {
      showRow: false
    };
    this.openBox = {
      openBox: false
    };

  }
  setMenu() {
    this.menu = [{
      name: 'Lista de Proveedores',
      link: '/dir/0',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Lista de Clientes',
      link: '/dir/1',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Lista de Empleados',
      link: '/dir/2',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Lista de Miscelaneos',
      link: '/dir/3',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Lista de Administradores',
      link: '/dir/4',
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
    this.showForm = false;
    this.myInputs = new FormArray([]);
    this.forms = new Array();
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
      password: new FormControl(''),
      passwordAgain: new FormControl('')
    });

/*     this.myForm = new FormGroup(aux);
 */}


  initComponent(endpoint, type, title) {
    this.endpoint = endpoint;
    this.type = type;
    this.title = title;
  }
  printId(id: string) {
    return id;
  }

  deleteItem(event, item) {
    var myEnd = this.endpoint;
    if (myEnd == '/users/all') {
      myEnd = myEnd.replace('/all', '/')
    }
    this.dbHandler.deleteSomething(item[0], myEnd)
      .subscribe(data => {   // data is already a JSON object
        this.dbHandler.refreshData(myEnd, this.name);
      });
  }

  confirmAdd() {
    var myEnd = this.endpoint;
    let body = {};
    if (myEnd.includes('/users')) {
      myEnd = '/users';
      body['password'] = this.passwordForm.value.password;
    }
    let values = this.myForm.value.myInputs
    let i = 0;
    this.fields.forEach(field => {
      let myField = field.toLowerCase();
      body[myField] = values[i];
      i++;
    });
    this.dbHandler.createSomething(body, myEnd)
      .subscribe(data => {   // data is already a JSON object
        this.dbHandler.refreshData(myEnd, this.name);
      });
  }

  openForm() {
    this.forms.push('');
    this.showForm = true;
    this.showRow = {
      showRow: true
    };

  }

  toggleMenu(event, item, id) {
    let link = item.link;
    this.router.navigateByUrl(link);
  }


  tBox() {
  };

  confirmPass() {
  };

}
