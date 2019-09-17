import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloVehiculo } from '../cvCdoCurso.modelo';
import { VhloValorService } from '../../../../../services/vholCfgValor.service';

import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvcdocurso',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public vhloVehiculo: VhloVehiculo;
  public errorMessage;
  public respuesta;
  public clases: any;
  public marcas: any;
  public claseSelected: any;
  public lineaSelected: any;
  public marcaSelected: any;
  public lineas: any;

  constructor( 
    private _VhloValorService: VhloValorService,
    private _loginService: LoginService,
    private _claseService: VhloCfgClaseService,
    private _MarcaService: VhloCfgMarcaService,
    private _lineaService: VhloCfgLineaService,  
  ) { }

  ngOnInit() {
    this.vhloVehiculo = new VhloVehiculo(null, null, null, null,null);

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
    this.vhloVehiculo.claseId = this.claseSelected;
    this.vhloVehiculo.lineaId = this.lineaSelected;
    this._VhloValorService.register(this.vhloVehiculo, token).subscribe(
      response => {
        this.respuesta = response;
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
      }
    );
  }

  onChangedMarca(e){
    if (e) {
      let token = this._loginService.getToken()
        this._lineaService.selectByMarca(e, token).subscribe(
          response => {
            this.lineas = response;
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