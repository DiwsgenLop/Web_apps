import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit{
  public username: string = "";
  public password: string = "";
  public type: string = "password";
  //Constructor de la clase
  constructor() { }
  //Metodo que se ejecuta al cargar la pagina
  ngOnInit(): void {
      
  }
}
