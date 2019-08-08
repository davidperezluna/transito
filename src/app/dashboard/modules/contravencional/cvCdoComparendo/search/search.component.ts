import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { CfgAdmFormatoService } from '../../../../../services/cfgAdmFormato.service';
import { CvCdoTrazabilidadService } from '../../../../../services/cvCdoTrazabilidad.service';
import { CvCdoCfgEstadoService } from '../../../../../services/cvCdoCfgEstado.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-search-cvcdocomparendo',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  public errorMessage;
  public comparendos: any = null;
  public comparendo: any = null;
  public audiencia: any = null;
  public estados: any = null;
  public trazabilidades: any = null;
  public trazabilidad: any = null;
  public acuerdoPago: any = null;
  public amortizaciones: any = null;
  public bienes: any = null;
  public table: any;

  public filtro: any = null;
  public formRecord: any = false;
  public formTrazabilidad: any = false;
  public formDocument: any = false;
  public formAcuerdoPago: any = false;
  public formInvestigacion: any = false;
  public formatos: any = null;

  public apiUrl = environment.apiUrl + 'configuracion';

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Nombres o Apellidos' },
    { 'value': '2', 'label': 'Identificación' },
    { 'value': '3', 'label': 'Placa' },
    { 'value': '4', 'label': 'No. de comparendo' },
  ];

  public datos = {
    'numero': null,
    'cuerpo': null,
    'id': null,
    'idFormato': null,
  }

  public datosTrazabilidad = {
    'fecha': null,
    'hora': null,
    'observaciones': null,
    'idComparendo': null,
    'idComparendoEstado': null,
  }

  public tiposBien = [
    { 'value': 'INMUEBLE', 'label': 'INMUEBLE' },
    { 'value': 'CUENTA BANCARIA', 'label': 'CUENTA BANCARIA' },
  ];

  public datosInvestigacion = {
    'nombre': null,
    'tipo': null,
    'avaluo': null,
    'embargable': false,
    'valor': null,
    'idTrazabilidad': null,
  }

constructor(
  private _ComparendoService: CvCdoComparendoService,
  private _FormatoService: CfgAdmFormatoService,
  private _TrazabilidadService: CvCdoTrazabilidadService,
  private _EstadoService: CvCdoCfgEstadoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){    
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.formDocument = false;
    this.formInvestigacion = false;
    this.formTrazabilidad = false;
    this.formRecord = false;
    this.formAcuerdoPago = false;

    let token = this._LoginService.getToken();

    this._ComparendoService.searchByFiltros(this.search, token).subscribe(
			response => {
        if (response.status == 'success') {
          this.comparendos = response.data;
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          let timeoutId = setTimeout(() => {
            this.onInitTable('#dataTables-example');
          }, 100);
        } else {
          this.comparendos = null;
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'warning',
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

  onInitTable(table) {
    this.table = $(table).DataTable({
      retrieve: true,
      paging: false,
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

  onRecord(comparendo: any) {
    this.comparendo = comparendo;
    if (this.comparendo) {
      this.formRecord = true;
      this.formDocument = false;
      this.formInvestigacion = false;
      this.formTrazabilidad = false;
      this.formAcuerdoPago = false;
      this.comparendos = null;

      let token = this._LoginService.getToken();

      swal({
        title: 'Buscando trazabilidad!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      this._ComparendoService.record({ 'id': this.comparendo.id }, token).subscribe(
        response => {
          if (response.status == 'success') {
            this.trazabilidades = response.data.trazabilidades;
            this.acuerdoPago = response.data.acuerdoPago;
            this.amortizaciones = response.data.amortizaciones;

            let timeoutId = setTimeout(() => {
              this.onInitTable('#dataTables-example');
            }, 100);

            swal.close();
          } else {
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });

            this.trazabilidades = null;
            this.acuerdoPago = null;
            this.amortizaciones = null;
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

  onChangedFormato(e) {
    if (e) {
      swal({
        title: 'Cargando plantilla!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      let token = this._LoginService.getToken();

      this._FormatoService.show({ 'id': e, 'idComparendo': this.comparendo.id }, token).subscribe(
        response => {
          this.datos.numero = this.trazabilidad.estado.sigla + '-' + this.comparendo.consecutivo.numero;

          $('#summernote').summernote({
            placeholder: 'Diligencie el cuerpo del acto administrativo',
            tabsize: 2,
            height: 800,
            toolbar: [
              ['style', ['bold', 'italic', 'underline', 'clear']],
              ['fontsize', ['fontsize']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']]
            ]
          });

          $('#summernote').summernote('code',response.data.template);

          this.datos.idFormato = response.data.formato.id;

          swal.close();
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
  }

  onDocument(trazabilidad: any) {
    this.trazabilidad = trazabilidad;
    if (this.trazabilidad) {
      this.datos.id = trazabilidad.id;

      this._FormatoService.select().subscribe(
        response => {
          this.formatos = response;
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

      this.formRecord = false;
      this.formTrazabilidad = false;
      this.formAcuerdoPago = false;
      this.formInvestigacion = false;
      this.formDocument = true;
    }
  }

  onChangedEstado(e) {
    if (e) {
      swal({
        title: 'Cargando plantilla!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      let token = this._LoginService.getToken();

      this._EstadoService.show({ 'id': e }, token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.formato) {
              this._FormatoService.show({ 'id': response.data.formato.id, 'idComparendo': this.comparendo.id }, token).subscribe(
                response => {
                  if (response.code == 200) {
                    $('#summernote-trazabilidad').summernote({
                      placeholder: 'Diligencie el cuerpo del acto administrativo',
                      tabsize: 2,
                      height: 800,
                      toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']]
                      ]
                    });
          
                    $('#summernote-trazabilidad').summernote('code', response.data.template);
                  }
    
                  swal.close();
                },
                error => {
                  this.errorMessage = <any>error;
        
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              );
            }else{
              swal({
                title: 'Error!',
                text: response.message,
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }else{
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
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
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.datos.cuerpo = $('#summernote').summernote('code');

    this._TrazabilidadService.updateDocumento(this.datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
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
            alert("Error en la petición");
          }
        }
      }
    );
  }

  onTrazabilidad() {
    this._EstadoService.select().subscribe(
      response => {
        this.estados = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this.formTrazabilidad = true;
    this.formRecord = false;
    this.formAcuerdoPago = false;
    this.formInvestigacion = false;
    this.formDocument = false;
  }

  onAcuerdoPago() {
    this.formRecord = false;
    this.formTrazabilidad = false;
    this.formAcuerdoPago = true;
    this.formInvestigacion = false;
    this.formDocument = false;
  }

  onEnviarTrazabilidad() {
    let token = this._LoginService.getToken();

    this.datosTrazabilidad.idComparendo = this.comparendo.id;

    this._TrazabilidadService.register(this.datosTrazabilidad, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.onSearch();

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
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
            alert("Error en la petición");
          }
        }
      }
    );
  }

  onInvestigacion(trazabilidad: any) {
    this.trazabilidad = trazabilidad;
    if (this.trazabilidad) {
      this.datosInvestigacion.idTrazabilidad = trazabilidad.id;

      let token = this._LoginService.getToken();

      this._TrazabilidadService.searchBienes({ 'idTrazabilidad': this.trazabilidad.id }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.bienes = response.data;

            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });

            let timeoutId = setTimeout(() => {
              this.onInitTable('#dataTables-bienes');
            }, 100);
          } else {
            this.bienes = null;

            swal({
              title: response.title,
              text: response.message,
              type: response.status,
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

      this.formRecord = false;
      this.formTrazabilidad = false;
      this.formAcuerdoPago = false;
      this.formDocument = false;
      this.formInvestigacion = true;
    }
  }

  onEnviarBien() {
    let token = this._LoginService.getToken();

    this._TrazabilidadService.register(this.datosInvestigacion, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.onSearch();

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
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
            alert("Error en la petición");
          }
        }
      }
    );
  }
}