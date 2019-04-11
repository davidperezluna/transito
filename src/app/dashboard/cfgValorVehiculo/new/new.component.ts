import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgValorVehiculo } from '../cfgValorVehiculo.modelo';
import { CfgValorVehiculoService } from '../../../services/cfgValorVehiculo.service';
import { LoginService } from '../../../services/login.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgValorVehiculo: CfgValorVehiculo;
  public errorMessage;
  public respuesta;
  public clases: any;
  public marcas: any;
  public claseSelected: any;
  public lineaSelected: any;
  public marcaSelected: any;
  public lineas: any;

  constructor( 
    private _CfgValorVehiculoService: CfgValorVehiculoService,
    private _loginService: LoginService,
    private _claseService: VhloCfgClaseService,
    private _MarcaService: VhloCfgMarcaService,
    private _lineaService: VhloCfgLineaService,  
  ) { }

  ngOnInit() {
    this.cfgValorVehiculo = new CfgValorVehiculo(null, null, null, null,null);

    this._claseService.select().subscribe(
      response => {
        this.clases = response;
      },
      error => {
        this.errorMessage = <any>error;
 
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._MarcaService.getMarcaSelect().subscribe(
      response => {
        this.marcas = response;
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
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    this.cfgValorVehiculo.claseId = this.claseSelected;
    this.cfgValorVehiculo.lineaId = this.lineaSelected;
    this._CfgValorVehiculoService.register(this.cfgValorVehiculo, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: 'La placa ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });
  }

  changedDepartamento(e){
    if (this.marcaSelected) {
      let token = this._loginService.getToken()
        this._lineaService.selectByMarca(this.marcaSelected, token).subscribe(
          response => {
            console.log(response.data[0]);
            if (response.data[0] != null) {
              this.lineas = response.data;
            }else{
              this.lineas = [];
            }
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
    }

}