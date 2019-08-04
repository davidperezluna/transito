import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FroFacParqueadero } from './froFacParqueadero.modelo';
import { FroFacturaService } from '../../../services/froFactura.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { CvCdoComparendoService } from '../../../services/cvCdoComparendo.service';
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

  public inmovilizaciones: any = null;
  public inmovilizacion: any = null;
  public tiposIdentificacion: any;
  public tipoIdentificacionSelected: any = null;
  public identificacion: any = null;
  public ciudadano: any = null;
  public funcionario: any = null;
  public comparendo: any = null;
  public municipio: any = null;
  
  public formIndex: any;
  public formNew: any;
  public formSolicitante: any;
  public formCiudadano: any;
  public formSearch: any;
  public table: any = null;
  
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;
  
  public apiUrl = environment.apiUrl;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Placa' },
    { 'value': '2', 'label': 'No. comparendo' },
    { 'value': '3', 'label': 'Identificación Infractor' },
  ];

  constructor(
    private _FacturaService: FroFacturaService,
    private _FuncionarioService: PnalFuncionarioService,
    private _InmovilizacionService: PqoInmovilizacionService,
    private _ComparendoService: CvCdoComparendoService,
    private _CiudadanoService: UserCiudadanoService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.factura = new FroFacParqueadero(null, 0, null, null, null, null, null, null, null, null, null, null); 
    this.onInitForms();

    swal({
      title: 'Cargando Datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data;
          this.factura.idOrganismoTransito = this.funcionario.organismoTransito.id;

          this.formSearch = true;
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
    );
  }

  onInitForms() {
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = false;
    this.formSolicitante = false;
    this.formCiudadano = false;
  }

  onSearchInmovilizacion() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.search.filtro) {
      swal({
        title: 'Error!',
        text: 'El filtro de búsqueda no puede estar vacio.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {

      let token = this._LoginService.getToken();
  
      this._InmovilizacionService.searchByFilter(this.search, token).subscribe(
        response => {
          if (response.code == 200) {
            this.inmovilizaciones = response.data;
  
            let timeoutId = setTimeout(() => {
              this.onInitTable();
              swal.close();
            }, 100);
  
            this.onInitForms();
  
            this.formIndex = true;
          } else {
            this.inmovilizaciones = null;
  
            swal({
              title: 'Alerta!',
              text: response.message,
              type: 'warning',
              confirmButtonText: 'Aceptar'
            });
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

  onInitTable() {
    this.table = $('#dataTables-example').DataTable({
      destroy: true,
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
  }

  onSelected(inmovilizacion: any) {
    if (inmovilizacion.numeroComparendo) {
      let token = this._LoginService.getToken();

      this._ComparendoService.searchByNumber({ 'numero': inmovilizacion.numeroComparendo }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.comparendo = response.data;
            this.inmovilizacion = inmovilizacion;

            this.onInitForms();

            this.formSolicitante = true;
          } else {
            this.comparendo = null;

            swal({
              title: response.title,
              text: response.message,
              type: response.status,
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
    } else {
      swal({
        title: 'Atención!',
        text: 'La inmovilización no tiene registrado el número de comparendo por lo tanto no se puede gestionar la salida.',
        type: 'warning',
        confirmButtonText: 'Aceptar',
      });
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
          this.municipio = response.data.organismoTransito.municipio;

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