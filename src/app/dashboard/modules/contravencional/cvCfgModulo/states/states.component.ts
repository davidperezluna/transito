import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvCfgModuloService } from '../../../../../services/cvCfgModulo.service';
import { CvCdoCfgEstadoService } from '../../../../../services/cvCdoCfgEstado.service'
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-states-cvcfgmodulo',
  templateUrl: './states.component.html'
})

export class StatesComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() modulo:any = null;
public errorMessage;

public repartos: any = null;
public estados: any = null;
public estadoSelected: any = null;

public formIndex: any;

public table: any;

constructor(
  private _ModuloService: CvCfgModuloService,
  private _EstadoService: CvCdoCfgEstadoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){
    swal({
      title: 'Cargando datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._EstadoService.selectAvailablesByModulo({ 'idModulo': this.modulo.id }, token).subscribe(
      response => {
        this.estados = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._EstadoService.searchByModulo({ 'idModulo': this.modulo.id }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.repartos = response.data;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.onInitTable();
            this.formIndex = true;
          }, 100);
        }else{
          this.repartos = null;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 10,
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._ModuloService.states({ 'idModulo':this.modulo.id, 'estados':this.estadoSelected }, token).subscribe(
			response => {
        if(response.code == 200){
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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

		}); 
  }

}