import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { SvIpatAsignacionService } from '../../../../../services/svIpatAsignacion.service';
/* import { SvIpatConsecutivoService } from '../../../../../services/svIpatConsecutivo.service'; */
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show-svipatasignacion',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Output() readyNew = new EventEmitter<any>();
@Input() funcionario:any = null;
public apiUrl = environment.apiUrl + 'msvTCasignacion';
public errorMessage;
public respuesta;
public comparendos: any;
public table: any;

constructor(
  private _AsignacionService: SvIpatAsignacionService,
  /* private _ConsecutivoService: SvIpatConsecutivoService, */
  private _loginService: LoginService,
  ){}

  ngOnInit(){
    let token = this._loginService.getToken();

    this._AsignacionService.recordFuncionario(this.funcionario, token).subscribe(
      response => {
        this.comparendos = response.data;
        let timeoutId = setTimeout(() => {
          this.iniciarTabla();
        }, 100);
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

  iniciarTabla(){
    $('#dataTables-example').DataTable({
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
   this.table = $('#dataTables-example').DataTable();
  }

  onCancelar(){ this.ready.emit(true); }

  onNew(funcionario: any){ this.readyNew.emit(funcionario); }
  
  onEnviar(){
    let token = this._loginService.getToken();
		this._AsignacionService.edit(this.funcionario,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
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

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}

		}); 
  }

}