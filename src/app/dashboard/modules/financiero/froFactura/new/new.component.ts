import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroFactura } from '../froFactura.modelo';
import { FroFacturaService } from '../../../../../services/froFactura.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() comparendosSelect: any = null;
  public factura: FroFactura;
  public errorMessage;

  public organismosTransito: any;
  public municipio: any = null; 
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;
  public facturaNumero: any = null;
  public tramitesValor:any=[];
  public valorVehiculoId:any;
  public propietariosVehiculoRetefuente:any;
  public valorRetefuenteUnitario:any;
  


  public apiUrl = environment.apiUrl + 'financiero';

constructor(
  private _FacturaService: FroFacturaService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.factura = new FroFactura(0, 0, null, null, null, null);

    swal({
      title: 'Calculando valores!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();
    
    this._FacturaService.calculateValue(this.comparendosSelect, token).subscribe(
      response => {
        if (response.code == 200) {
          this.factura.valor = response.data.totalPagar;
          this.factura.interes = response.data.totalInteres;

          swal.close();
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    
    let token = this._loginService.getToken();

    let datos = {
      'factura': this.factura,
      'tramitesValor': this.tramitesValor,
      'valorVehiculoId': this.valorVehiculoId,
      'propietarios': this.propietariosVehiculoRetefuente,
      'retencion': this.valorRetefuenteUnitario,
      'idTipoRecaudo': 1,
    }

    this.factura.comparendos = this.comparendosSelect;
    //Tipo de recaudo infracciones
    this.factura.idTipoRecaudo = 2;
    
		this._FacturaService.register(this.factura, token).subscribe(
			response => {
        if(response.code == 200){ 
          this.factura.id = response.data.id;
          this.municipio = response.data.sedeOperativa.municipio.nombre;
          this.fechaCreacion = response.data.fechaCreacion;
          this.fechaVencimiento = response.data.fechaVencimiento;
          this.facturaNumero = response.data.numero;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          this.factura.id = null;
          
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					} 
				}
      }
    );
  }
}