import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Log } from '../clases/log';
import { LoginService } from '../../services/login.service';

@Injectable()
export class LoggerService {
  private url = environment.apiUrl + 'configuracion/cfgauditoria';
  public identity;
  public token;
  public funcionario;
  public errorMessage;
  
  constructor(
    private _LoginService: LoginService,
    private _http: Http
  ) { }

  public saveLog(log:Log,token:any):Observable<Log>
  {      
    let json = JSON.stringify(log);

    let formData = new FormData();

    formData.append('data', json);
    formData.append('authorization', token);
    
    return this._http.post(this.url + "/new", formData).map(res => res.json());
  }

  public registerLog(token:string,action:string,json:string,url:string)
	{
    let identity = this._LoginService.getIdentity();

    let log = new Log;
    
		log.token = token;
		log.url = url;
		log.json = json;
		log.action = action;
    log.identificacion = identity.identificacion;
    
		this.saveLog(log, token).subscribe(res => {});
	}
}
