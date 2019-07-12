import { Component, OnInit } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { ImoInsumoService } from '../../services/imoInsumo.service';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';
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
  public funcionario:any = null;
  
  public tiposActas = [
    {value:'subtotales',label:'Subtotal'} ,
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
    'idFuncionario':null,
  };

  constructor(
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ImoInsumoService: ImoInsumoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data; 
          this.data.idFuncionario = this.funcionario.id;
        } else {
          this.funcionario = null;

          swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar la impresión.',
              type: 'error',
              confirmButtonText: 'Aceptar'
          });
        }
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert('Error en la petición');
            }
        }
      }
    );

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
    let token = this._LoginService.getToken();

    this._ImoInsumoService.pdfActaInsumo(this.data, token).subscribe((response)=>{     
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    })
  }
}