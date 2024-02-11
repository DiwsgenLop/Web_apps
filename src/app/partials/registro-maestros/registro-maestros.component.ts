import { Component, Input, OnInit } from '@angular/core';
import { MaestroService } from 'src/app/services/maestro.service';
declare var $:any; //Declares a variable that can be used anywhere in the component
@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit{
  @Input() rol:string = "";

  public maestro:any = {};
  public editar:boolean = false;
  public errors:any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  
  //Areas de investigación
  public areas:any[] = [
    {value: '1', viewValue: 'Desarrollo Web'},
    {value: '2', viewValue: 'Programación'},
    {value: '3', viewValue: 'Base de datos'},
    {value: '4', viewValue: 'Redes'},
    {value: '5', viewValue: 'Matematicas'},
  ];
  //Materias
  public materias:any[]= [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

  constructor(
    private maestroService: MaestroService
  ){}

  ngOnInit(): void {
    //Con esto nosotros podemos obtener el esquema de maestro es decir los campos que necesitamos para registrar un maestro
    this.maestro = this.maestroService.esquemaMaestro();
    this.maestro.rol = this.rol; //Asignamos el rol (Admin, Maestro, Alumno)
    console.log("Maestro: ", this.maestro); //Imprimimos el esquema de maestro
  }

  public regresar(){

  }

  public registrar(){
    //Validar
    this.errors = [];
    
    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    //TODO: Después registraremos maestro
  }

  public actualizar(){

  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }
  //Función para checkbox
  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.maestro.materias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia, i) => {
        if(materia == event.source.value){
          this.maestro.materias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }
}