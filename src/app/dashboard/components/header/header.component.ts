import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DbHandlerService } from '../../services/db-handler.service';
import { flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today = new Date;
  welcome: string;
  constructor(
    private dbHandler: DbHandlerService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    let hour = this.today.getHours();
    if (hour < 12 && hour >= 5) {
      this.welcome = "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      this.welcome = "Buenas tardes";
    } else if (hour >= 18 || hour < 5) {
      this.welcome = "Buenas noches";
    }

  }

  actualizar() {
    let refreshList = [
      {
        endpoint: '/users/all',
        name: 'users'
      },
      {
        endpoint: '/empresas',
        name: 'empresas'
      },
      {
        endpoint: '/retenciones',
        name: 'retenciones'
      }
    ]
    /*     this.dbHandler.getSomething('/users/all').pipe(
          flatMap((res1) => this.dbHandler.getSomething('/empresas')),
          flatMap((res2) => this.dbHandler.getSomething('/retenciones')),
        ).subscribe(info => {
          console.log(info);
          if (info[0].status) {
            this.dbHandler.refreshData(info[0], 'users');
          }
          if (info[1].status) {
            this.dbHandler.refreshData(info[1], 'empresas');
          }
          if (info[2].status) {
            this.dbHandler.refreshData(info[2], 'retenciones');
            window.location.reload();
          }
        });
     */
    let dataArray = []
    refreshList.forEach(item => {
      dataArray.push(this.dbHandler.getSomething(item.endpoint))
    })
    console.log('starting to fork')
    forkJoin(dataArray).subscribe(response => {
      var i = 0;
      response.forEach(item => {
        console.log(item)
        if(item.status){
          this.dbHandler.refreshData(item, refreshList[i].name);
        }
        i++
      });
      window.location.reload();
    }, error => {
      console.error(error);
    });


  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    //window.location.reload();
  }
}
