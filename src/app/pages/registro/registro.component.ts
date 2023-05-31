import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { RegistrarService } from 'src/app/services/registrar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,private registyroService:RegistrarService) {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  enviarFormulario() {
    if (this.form.valid) {
      let persona: Persona = new Persona();
      persona.apellido = this.form.get('apellido')?.value;
      persona.identificacion = this.form.get('identificacion')?.value;
      persona.nombre = this.form.get('nombre')?.value;
      let usuario: Usuario = new Usuario();
      usuario.persona = persona;
      usuario.clave = this.form.get('clave')?.value;
      usuario.usuario = this.form.get('usuario')?.value;
        this.registyroService.crear(usuario).subscribe(()=>Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        ));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }
}
