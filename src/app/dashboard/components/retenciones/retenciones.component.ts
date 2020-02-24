import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service'
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-retenciones',
  templateUrl: './retenciones.component.html',
  styleUrls: ['./retenciones.component.css']
})
export class RetencionesComponent implements OnInit {
  id: string;
  menuOn: number;

  menu: any;
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
        if (url == 'fin') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.setMenu();
  }



  setMenu() {
    this.menu = [{
      name: 'Retenciones',
      link: '/fin/0',
      class: {
        menuAct: false
      },
    }/* ,
    {
      name: 'Comprobantes de pago',
      link: '/fin/1',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Cuentas por pagar',
      link: '/fin/2',
      class: {
        menuAct: false
      },
    } */];
    this.menuOn = +this.id;
    this.menu[this.menuOn].class = {
      menuAct: true
    };
  }

  toggleMenu(event, item, id) {
    let link = item.link;
    this.router.navigateByUrl(link);
  }

}
