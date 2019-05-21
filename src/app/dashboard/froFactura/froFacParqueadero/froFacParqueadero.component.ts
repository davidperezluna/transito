import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FroFacParqueadero } from './froFacParqueadero.modelo';
import { FroFacturaService } from '../../../services/froFactura.service';
import { PqoInmovilizacionService } from '../../../services/pqoInmovilizacion.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froFacParqueadero.component.html',
  providers: [DatePipe]
})

export class FroFacParqueaderoComponent implements OnInit {
  public errorMessage;
  public factura: FroFacParqueadero;

  public municipio: any = null;
  public inmovilizacion: any = null;
  public numeroComparendo: any = null;
  public tiposIdentificacion: any;
  public tipoIdentificacionSelected: any = null;
  public identificacion: any = null;
  public funcionario: any = null;
  public ciudadano: any = null;
  
  public formIndex = false;
  public formNew = false;
  public formCiudadano = false;
  public formSearch = true;
  public table: any = null;
  
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;
  
  public apiUrl = environment.apiUrl;


  constructor(
    private _FacturaService: FroFacturaService,
    private _InmovilizacionService: PqoInmovilizacionService,
    private _CiudadanoService: UserCiudadanoService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.factura = new FroFacParqueadero(null, 0, null, null, null, null, null, null, null, null, null, null); 

    swal({
      title: 'Cargando Datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    /*this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data;
          this.factura.idOrganismoTransito = this.funcionario.organismoTransito.id;

          this.formNew = true;
        } else {
          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar facturación!',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });

          this.formNew = false;
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );*/
  }

  onSearchInmovilizacion() {
    swal({
      title: 'Buscando inmovilizacion!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.numeroComparendo) {
      swal({
        title: 'Error!',
        text: 'El número de comparendo no puede estar vacio.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();
  
      this._InmovilizacionService.findByComparendo({ 'numero': this.numeroComparendo }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.inmovilizacion = response.data;
            this.factura.idInmovilizacion = this.inmovilizacion.id;
            
            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          } else {
            this.inmovilizacion = null;

            swal({
              title: 'Error!',
              text: response.message,
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
    }
  }

  onSearchCiudadano() {
    swal({
      title: 'Buscando ciudadano!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.identificacion) {
      swal({
        title: 'Error!',
        text: 'El número de identificación no puede estar vacia.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();
  
      let datos = {
        'idTipoIdentificacion': this.tipoIdentificacionSelected,
        'identificacion': this.identificacion,
      }
  
      this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.ciudadano) {
              this.ciudadano = response.data.ciudadano;
              this.factura.idCiudadano = this.ciudadano.id;
              this.formCiudadano = false;
              
              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              this.formCiudadano = true;
            }
          } else {
            this.ciudadano = null;
            this.formCiudadano = true;
  
            swal({
              title: 'Error!',
              text: response.message,
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
    }
  }

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
  }

  onCancelar(){
    this.formNew = false;
    this.formIndex = false;
    this.formSearch = true;
    this.ngOnInit();
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    //Tipo de recaudo trámites
    this.factura.idTipoRecaudo = 5;

    let datos = {
      'factura': this.factura,
    }

    this._FacturaService.register(datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.factura = response.data;         
          this.formNew = false;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          this.factura.id = null;
          this.factura.numero = null;
          this.formNew = true;

          swal({
            title: 'Error!',
            text: response.message,
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
}