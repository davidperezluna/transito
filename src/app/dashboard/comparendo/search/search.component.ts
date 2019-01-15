import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { ComparendoService } from '../../../services/comparendo.service';
import { CfgAdmFormatoService } from '../../../services/cfgAdmFormato.service';
import { CvCdoTrazabilidadService } from '../../../services/cvCdoTrazabiliad.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  public errorMessage;
  public comparendos: any = null;
  public comparendo: any = null;
  public trazabilidades: any = null;
  public trazabilidad: any = null;
  public table: any;

  public filtro: any = null;
  public formRecord: any = false;
  public formDocument: any = false;
  public formatos: any = null;

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
    'id': this.trazabilidad.id,
    'idFormato': null,
  }

constructor(
  private _ComparendoService: ComparendoService,
  private _FormatoService: CfgAdmFormatoService,
  private _TrazabilidadService: CvCdoTrazabilidadService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){    
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearch(){
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
            this.iniciarTabla();
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

		}); 
  }

  iniciarTabla() {
    if (this.table) {
      this.table.destroy();
    }

    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<<',
          sPrevious: '<',
          sNext: '>',
          sLast: '>>'
        }
      }
    });
    this.table = $('#dataTables-example').DataTable();
  }

  onRecord(comparendo: any) {
    this.comparendo = comparendo;
    if (this.comparendo) {
      this.formRecord = true;
      this.formDocument = false;
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
            this.trazabilidades = response.data;
            let timeoutId = setTimeout(() => {
              this.iniciarTabla();
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
      let token = this._LoginService.getToken();

      this._FormatoService.show({ 'id': e }, token).subscribe(
        response => {
          $('#summernote').summernote('code', response.data.cuerpo);
          this.datos.idFormato = response.data.id;
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
      this.formRecord = false;
      this.formDocument = true;

      $('#summernote').summernote({
        placeholder: 'Diligencie el cuerpo del acto admisnitrativo',
        tabsize: 2,
        height: 500
      });

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
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

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
}