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

  public sedes:any;
  public sedeSelected:any;
  
  public tiposActas = [
    {value:'subTotales',label:'Subtotal'} ,
    {value:'totales',label:'Totales'} ,
  ]

  public data = {
    'disponibles':false,
    'anulado':false,
    'asignado':false, 
    'fechaInicio':false,
    'fechaFin':false,
    'tipoActa':null,
    'idOrganismoTransito':null,
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

    this._ImoInsumoService.pdfActaInsumo(token, this.data).subscribe((response)=>{     
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    })
  }
}