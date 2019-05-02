import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { ImoInsumoService } from '../../services/imoInsumo.service';
import { LoginService } from '../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './imoActa.component.html'
})
export class ImoActaComponent implements OnInit {
  public apiUrl = environment.apiUrl + 'insumo/imoinsumo';
  public errorMessage;
  public respuesta;
  public sedes:any;
  public sedeSelected:any;

  public data = {
    'organismoTransito':null,
    'disponibles':false,
    'anulado':false,
    'asignado':false, 
    'fechaInicio':false,
    'fechaFin':false,
  };

  constructor(
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ImoInsumoService: ImoInsumoService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.sedes = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    
  }
  
  
  onPrintActa(){
    let token = this._loginService.getToken();
    console.log(this.data);
    this._ImoInsumoService.pdfActaInsumo(token, this.data).subscribe((response)=>{
      //let file = new Blob([response], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    })

    

    // this._ImoInsumoService.pdfActaInsumo(token,this.data).subscribe(
    //   response => {
    //     var fileURL = window.URL.createObjectURL(response);
    //     console.log(fileURL);
    //     console.log(response); 
    //     window.open(fileURL);
    //   },  
    //   error => {
    //     this.errorMessage = <any>error;
  
    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // console.log(this.data);
  }
  

}