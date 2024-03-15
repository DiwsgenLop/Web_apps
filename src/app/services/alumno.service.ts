import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
//Librerias necesarias para la conexion con la API
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//Configuracion para la api
const httpOptions ={
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  //Esquema para alumno
  public esquemaAlumno() {
    return {
      'rol': '',
      'clave_alumno': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_de_nacimiento': '',
      'curp': '',
      'rfc':'',
      'edad':'',
      'telefono': '',
      'ocupacion': '',
    }
  }

  //Validación para el formulario
  public validarAlumno(data: any, editar: boolean) {
    console.log("Validando alumno... ", data);
    let error: any = [];
    //Validar campos
    // clave_alumno
    if(!this.validatorService.required(data["clave_alumno"])){
      error["clave_alumno"] = this.errorService.required;
    }
    //Nombre
    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }
    //Apellido
    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }
    //Email necesita 3 validaciones, primera de requerido, 2da de longitud máxima y 3ra de formato de email
    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }
    //Password y confirmar password
    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }
      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }
    //Fecha de nacimiento
    if(!this.validatorService.required(data["fecha_de_nacimiento"])){
      error["fecha_de_nacimiento"] = this.errorService.required;
    }

    //CURP con validacion para minimo y maximo de caracteres
    if(!this.validatorService.required(data["curp"])){
      error["curp"] = this.errorService.required;
    }else if(!this.validatorService.min(data["curp"], 18)){
      error["curp"] = this.errorService.min(18);
    }else if(!this.validatorService.max(data["curp"], 18)){
      error["curp"] = this.errorService.max(18);
    }
   
    //RFC con validacion para minimo y maximo de caracteres
    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    //Edad que sea requerida y que sea numerica
    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      alert("El formato es solo números");
    }
    //Telefono
    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }
    //Ocupacion
    if(!this.validatorService.required(data["ocupacion"])){
      error["ocupacion"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Servicio para HTTP
  //registrar nuevo usuario alumno
  public registrarAlumno(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/alumnos/`, data, httpOptions);
  }
}
