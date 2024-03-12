import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions ={
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
//Variables para las cookies
const session_cookie_name = "computacion-token";
const user_email_cookie_name = "computacion-email";
const user_id_cookie_name = "computacion-id";
const user_complete_name_cookie_name = "computacion-complete_name";
const group_name_cookie_name = "computacion-group_name";
const codigo_cookie_name = "computacion-codigo";

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  //Generaremos un validar login
  public validarLogin(username: String, password: String) {
    var data ={
      "username": username,
      "password": password
    }
    console.log("Validando login... ", data);
    let error :  any = [];
    
    if(!this.validatorService.required(data["username"])){
      error["username"] = this.errorService.required;
    }else if(!this.validatorService.max(data["username"],40)){
      error["username"]=this.errorService.max(40);
    }else if(!this.validatorService.email(data["username"])){
      error["username"]=this.errorService.email;
    }

    if(!this.validatorService.required(data["password"])){
      error["password"]=this.errorService.required
    }
    return error;
  }

  //Servicios para login y para cerrar sesión
  //Iniciar sesión
  login(username:String, password:String): Observable<any> {
    var data={
      username: username,
      password: password
    }
    return this.http.post<any>(`${environment.url_api}/token/`,data);
  }

  //Cerrar sesión
  logout(): Observable<any> {
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/logout/`, {headers: headers});
  }


  //Funciones para las cookies y almacenar datos de inicio de sesión
  //Funciones para utilizar las cookies en web
  //Regresa el quien inicio sesión
  retrieveSignedUser(){
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/me/`,{headers:headers});
  }
  //Que valores queremos obtener de la cookie
  getCookieValue(key:string){
    return this.cookieService.get(key);
  }
  //Guardar todos los datos en formato json a las cookies
  saveCookieValue(key:string, value:string){
    var secure = environment.url_api.indexOf("https")!=-1;
    this.cookieService.set(key, value, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }
  //Regresamos el token de la sesión
  getSessionToken(){
    return this.cookieService.get(session_cookie_name);
  }
  //Guardar los datos del usuario de inicio de sesión
  saveUserData(user_data:any){
    var secure = environment.url_api.indexOf("https")!=-1;
    if(user_data.rol == "administrador"){
      this.cookieService.set(user_id_cookie_name, user_data.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.first_name + " " + user_data.last_name, undefined, undefined, undefined, secure, secure?"None":"Lax");
    }else{
      this.cookieService.set(user_id_cookie_name, user_data.user.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.user.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.user.first_name + " " + user_data.user.last_name, undefined, undefined, undefined, secure, secure?"None":"Lax");
    }
    this.cookieService.set(session_cookie_name, user_data.token, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(group_name_cookie_name, user_data.rol, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }
  //Borrar los datos de la cookie, se utiliza con el logout
  destroyUser(){
    this.cookieService.deleteAll();
  }
  //Funciones para obtener los datos de la cookie
  //Email
  getUserEmail(){
    return this.cookieService.get(user_email_cookie_name);
  }
  //Nombre completo
  getUserCompleteName(){
    return this.cookieService.get(user_complete_name_cookie_name);
  }
  //Id del usuario
  getUserId(){
    return this.cookieService.get(user_id_cookie_name);
  }
  //Grupo al que pertenece
  getUserGroup(){
    return this.cookieService.get(group_name_cookie_name);
  }

}
