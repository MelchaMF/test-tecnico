import { PersonasClass, Person } from '../../shared/interface.interface';
import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})


export class DatosComponent {

  formulario: FormGroup | any;
  person: PersonasClass | any;
  count: number = 0;
  Personas: Array<Person> = [];
  selPerson: Person | any;
  tabla: boolean = false;
  btnEditar: boolean = false;
  valCorreo: string = '';
  msj: boolean = false;
  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{0,9}")]],
      sexo: ['', Validators.required],
    })
  }
  f(campo: string) {
    return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
  }
  validarNum(event: any) {

    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  guardar() {
    this.Personas.find(e => {
      this.valCorreo = e.correo
    });
    //console.log('VALORES: ', this.formulario);

    if (this.valCorreo === this.formulario.controls.correo.value) {
      this.msj = true;

    } else {
      this.tabla = true;
      this.msj = false;
      this.person = new PersonasClass(
        this.count,
        this.formulario.controls.nombre.value,
        this.formulario.controls.apellido.value,
        this.formulario.controls.correo.value,
        this.formulario.controls.telefono.value,
        this.formulario.controls.sexo.value,)

      this.Personas.push(this.person)
      //console.log('ARRAY TABLA: ', this.Personas);



      this.count = +1
      this.formulario.reset({});
      this.btnEditar = false;
    }
  }





eliminar(i: number){
  this.Personas = this.Personas.filter(e => e.uid !== i);
  if (this.Personas.length === 0) {
    this.tabla = false;
  } else {
    this.tabla = true;
  }
}

buscar(i: number){
  return this.Personas.find(e => e.uid === i);

}


seleccionar(i: number){
  this.selPerson = this.buscar(i)

  this.formulario.reset({
    nombre: this.selPerson.nombre,
    apellido: this.selPerson.apellido,
    correo: this.selPerson.correo,
    telefono: this.selPerson.telefono,
    sexo: this.selPerson.sexo
  })

  this.btnEditar = true;

}

modificar(){

  this.selPerson = this.buscar(this.selPerson.uid)

  this.selPerson.nombre = this.formulario.controls.nombre.value;
  this.selPerson.apellido = this.formulario.controls.apellido.value;
  this.selPerson.correo = this.formulario.controls.correo.value;
  this.selPerson.telefono = this.formulario.controls.telefono.value;
  this.selPerson.sexo = this.formulario.controls.sexo.value;

  this.formulario.reset({});
  this.btnEditar = false;

}
}
