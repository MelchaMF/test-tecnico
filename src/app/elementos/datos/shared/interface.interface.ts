export class PersonasClass {
  public uid: number;
  public nombre:string;
  public apellido: string;
  public correo: string;
  public telefono: number;
  public sexo:string;

  constructor(
    uid: number,
    nombre:string,
    apellido: string,
    correo: string,
    telefono: number,
    sexo:string){
      this.uid = uid;
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.telefono = telefono;
      this.sexo = sexo;
  }
}

export interface Person {
  uid: number;
  nombre:string;
  apellido: string;
  correo: string;
  telefono: number;
  sexo:string;
}
