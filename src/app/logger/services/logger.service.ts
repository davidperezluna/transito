import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Log } from '../clases/log';

@Injectable()
export class LoggerService {
  private url = environment.apiUrl + 'cfgauditoria';
  public identity;
  public token;
  
  constructor(
    private _http: Http
  ) { }

  public saveLog(log:Log,token:any):Observable<Log>
  {
    let json = JSON.stringify(log);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
                .map(res => res.json());
  }

  public registerLog(token:string,action:string,json:string,url:string)
	{
		let log = new Log;
		log.token = token;
		log.url = url;
		log.json = json;
		log.action = action;
		this.saveLog(log,token).subscribe(res => {});
	}
}
