import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  //Esquema para maestro
  public esquemaMaestro() {
    return {
      'rol': '',
      'id_trabajador': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'rfc': '',
      'birthday': '',
      'cubiculo': '',
      'area_investigacion': '',
      'materias_json': [],
    }
  }

  //Validación para el formulario
  public validarMaestro(data: any, editar: boolean) {
    console.log("Validando maestro... ", data);
    let error: any = [];
    //Validar campos
    // id_trabajador
    if(!this.validatorService.required(data["id_trabajador"])){
      error["id_trabajador"] = this.errorService.required;
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
    //la variable editar es para saber si se está editando o no, si no se está editando se valida la contraseña
    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }
      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }
    //Fecha de nacimiento
    if(!this.validatorService.required(data["birthday"])){
      error["birthday"] = this.errorService.required;
    }
    //Teléfono
    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }
    //RFC, primero es requerido y después se valida el formato
    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }
    //cubiculo, requerido y solo en formato numérico
    if(!this.validatorService.required(data["cubiculo"])){
      error["cubiculo"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["cubiculo"])){
      alert("El formato es solo números");
    }
    //area_investigacion
    if(!this.validatorService.required(data["area_investigacion"])){
      error["area_investigacion"] = this.errorService.required;
    }
    //materias, se valida que no esté vacío
    if((data["materias_json"].length == 0)){
      error["materias_json"] = this.errorService.required;
      //Puede ser con un alert
      //alert("Selecciona al menos una materia");
    }
    //Regresar errores
    return error;
  }
}
