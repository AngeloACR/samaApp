import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { faMoneyCheckAlt, faPrint, faIdCard, faUserCog, faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

	boxOn: boolean;
	menuOn: number;
	prevMenu: number;

	user: any;
	isAdmin: boolean;
	isEmpleado: boolean;
	isProveedor: boolean;
	isCliente: boolean;
	isMisc: boolean;

	myMenu: any;
	adminMenu: any;
	proMenu: any;
	cliMenu: any;
	miscMenu: any;
	empMenu: any;

	constructor(
		private auth: AuthService
	) {

	}

	ngOnInit() {
		this.adminMenu = [{
			name: 'Directorio',
			link: '/dir/0',
			id: 0,
			icon: faAddressBook,
			class: {
				aMenu: false
			},
		},
		{
			name: 'Perfil',
			link: '/perfil/0',
			id: 1,
			icon: faIdCard,
			class: {
				aMenu: false
			},
		},
		{
//			name: 'Información financiera',
			name: 'Información para cobro',
			link: '/fin/0',
			id: 2,
			icon: faMoneyCheckAlt,
			class: {
				aMenu: false
			},
		},
		{
			name: 'Generador',
			link: '/gen/0',
			id: 3,
			icon: faPrint,
			class: {
				aMenu: false
			},
		},
		{
			name: 'Administrador',
			link: '/adm/0',
			id: 4,
			icon: faUserCog,
			class: {
				aMenu: false
			},
		}];

		this.user = this.auth.decode();
		this.isAdmin = (this.user.type === 'Admin');
		this.isProveedor = (this.user.type === 'Proveedor');
		this.isEmpleado = (this.user.type === 'Empleado');
		this.isCliente = (this.user.type === 'Cliente');
		this.isMisc = (this.user.type === 'Miscelaneo');

		if (this.isAdmin) {
			this.myMenu = this.adminMenu;
		} else if (this.isCliente) {
			this.myMenu = this.cliMenu;
		} else if (this.isProveedor) {
			this.myMenu = this.proMenu;
		} else if (this.isEmpleado) {
			this.myMenu = this.empMenu;
		} else if (this.isMisc) {
			this.myMenu = this.miscMenu;
		}

		this.prevMenu = -1;
		this.menuOn = -1;
		this.boxOn = false;
		this.boxZero();
	}

	tMenu(menu: any) {
		this.boxZero()
		this.menuOn = menu;

		if (this.prevMenu != this.menuOn) {
			this.myMenu[menu].class = {
				aMenu: true
			};
			this.myMenu[menu].boxClass = {
				aBox: true
			};

			this.boxOn = true;
		} else {
			this.menuOn = -1;
			this.boxOn = false;
		}

		this.prevMenu = this.menuOn;

	}

	boxZero() {
		for (var i = 0; i < this.myMenu.length; i++) {
			this.myMenu[i].class = {
				aMenu: false
			};
			this.myMenu[i].boxClass = {
				aBox: false
			};
		}

	}

}
