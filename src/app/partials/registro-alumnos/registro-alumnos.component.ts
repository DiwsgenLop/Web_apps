import { Component, Input, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
declare var $:any; //Declares a variable that can be used anywhere in the component
@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit{
  @Input() rol:string = ""; //Input to receive the role from the parent component

  public alumno:any = {}; //Object to store the student data
  public editar:boolean = false; //Variable to know if the student is being edited
  public errors:any = {}; //Object to store the errors
  //For passwords
  public hide_1: boolean = false; 
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  //Constructor
  constructor(
    private alumnoService: AlumnoService
  ){}

  ngOnInit(): void {
    this.alumno = this.alumnoService.esquemaAlumno(); //Get the student schema
    this.alumno.rol = this.rol; //Assign the role (Admin, Maestro, Alumno)
    console.log("Alumno: ", this.alumno); //Print the student schema
  }

  
  public regresar(){

  }

  public registrar(){
    //Validar
    this.errors = [];
    
    this.errors = this.alumnoService.validarAlumno(this.alumno, this.editar);
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
  //Agregar funcion para detectar cambio de fecha
  public changefecha(event:any){
    console.log("Evento: ", event);
    console.log(event.value.toISOString());

    this.alumno.fecha_nacimiento = event.value.toISOString().split('T')[0];
    console.log("Fecha:", this.alumno.fecha_nacimiento);
  }


}
