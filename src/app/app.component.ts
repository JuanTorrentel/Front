import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-integrador';
  constructor(  private _router: Router){

  }
  logout(){
    sessionStorage.clear();
    this._router.navigate(['/login'])
  }
}
