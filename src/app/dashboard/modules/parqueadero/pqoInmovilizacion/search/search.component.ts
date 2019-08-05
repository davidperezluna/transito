import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PqoInmovilizacionService } from '../../../../../services/pqoInmovilizacion.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
    public errorMessage;

    public apiUrlComparendo = environment.apiUrl + 'contravencional/cvcdocomparendo';
    public apiUrlInmovilizacion = environment.apiUrl + 'parqueadero/pqoinmovilizacion';

    public inmovilizaciones;
    public inmovilizacion: any = null;
    public funcionario: any = null;
    public comparendo: any = null;
    public autorizacion: any = null;

    public formSearch: any;
    public formIndex: any;
    public formExit: any;

    public table:any = null;

    public search: any = {
      'tipoFiltro': null,
      'filtro': null,
    }

    public tiposFiltro = [
      { 'value': '1', 'label': 'Placa' },
      { 'value': '2', 'label': 'No. comparendo' },
      { 'value': '3', 'label': 'Identificación Infractor' },
    ];

    public datos: any = {
      'observaciones': null,
      'idFuncionario': null,
      'idInmovilizacion': null,
    }
  
  constructor(
    private _InmovilizacionService: PqoInmovilizacionService,
    private _ComparendoService: CvCdoComparendoService,
    private _FuncionarioService: PnalFuncionarioService,
	  private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.onInitForms();

    this.formSearch = true;

    let token = this._LoginService.getToken();
      
      let identity = this._LoginService.getIdentity();

      this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
        response => {
          if (response.status == 'success') {
            this.funcionario = response.data;

            this.datos.idFuncionario = this.funcionario.id;
          } else {
            this.funcionario = null;

            swal({
                title: 'Error!',
                text: 'Usted no tiene permisos para registrar salidas de vehiculos.',
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

  onInitForms(){
    this.formSearch = false;
    this.formIndex = false;
    this.formExit = false;
  }

  onSearch(){
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

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

          if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
          }
        }
      }
    );
  }

  onInitTable(){
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

  onExit(inmovilizacion:any){
    if (inmovilizacion.numeroComparendo) {
      let token = this._LoginService.getToken();

      this._ComparendoService.searchByNumber({ 'numero': inmovilizacion.numeroComparendo }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.comparendo = response.data;
            this.inmovilizacion = inmovilizacion;

            this.onInitForms();
  
            this.formExit = true;
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
    }else{
      swal({
        title: 'Atención!',
        text:'La inmovilización no tiene registrado el número de comparendo por lo tanto no se puede gestionar la salida.',
        type:'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  onCancelar(){
    this.ngOnInit();
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    this.datos.idInmovilizacion = this.inmovilizacion.id;

    this._InmovilizacionService.exit(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.autorizacion = response.data;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type:'success',
            confirmButtonText: 'Aceptar'
          });

          this.onSearch();
        }else{
          this.autorizacion = null;

          swal({
            title: 'Error!',
            text: response.message,
            type:'error',
            confirmButtonText: 'Aceptar'
          });
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