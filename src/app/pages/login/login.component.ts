import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { role } from 'src/app/shared/role';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LogicaGuardService } from 'src/app/guard/logica-guard-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  show: boolean;
  form!: FormGroup;
  admin: boolean = false;
  sesion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private logicaGuardNav: LogicaGuardService,
  ) { this.show = false; }

  ngOnInit(): void {
    this.initForm();

  }

  private initForm(): void {
    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
    })
  }

  onLoginClick(): void {
    this.loginService.login(this.form.get('usuario')?.value, this.form.get('clave')?.value).subscribe(res => {
      sessionStorage.setItem(environment.tokenName, res.access_token);
      // redireccionar a pagina de inciio
      localStorage.setItem('usuario', this.form.get('usuario')?.value);

      this.pagina();
    }, err => {
      if (err.status == 500) {
        // error en el servidor
        this.mensajeError("Error en el servidor");
      } else {
        // credenciales incorrectas
        this.mensajeError("Credenciales incorrectas");
      }
    });
  }

  pagina(): void {
    if (this.logicaGuardNav.permisoValido([role.usuario])) {
  
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('registro');
    }
  }


  private mensajeError(err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    
  }
  /*canActivate(): void {
    this.admin = this.logicaGuard.permisosValidosNav([role.administrador]);
  }*/
}