import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { SvIpatAsignacionService } from '../../../../../services/svIpatAsignacion.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-show-svipattalonario',
  templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() talonario:any = null;
public errorMessage;

public apiUrl = environment.apiUrl + 'seguridadvial/svipatasignacion';

public asignaciones: any;

public formIndex = true;
public formNew = false;

public datos = {
  'rangoInicial': null,
  'rangoFinal': null,
  'total': null,
  'fecha': null,
  'idTalonario': null,
}

public table: any;

constructor(
  private _AsignacionService: SvIpatAsignacionService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){
    swal({
      title: 'Cargando historico de asignaciones!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._AsignacionService.recordByTalonario({ 'idTalonario': this.talonario.id }, token).subscribe(
      response => {
        if(response.code == 200){
          this.asignaciones = response.data;
          
          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);

          swal.close();
        }else{
          this.asignaciones = null;

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

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
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

  onCancelar(){ 
    this.ready.emit(true); 
  }

  onNewAsignacion(){ 
    this.formIndex = false;
    this.formNew = true;
  }

  onCancelarAsignacion(){ 
    this.formIndex = true;
    this.formNew = false;
  }

  onCalcularTotal() {
    let inicial, final, rangos;
    inicial = this.datos.rangoInicial;
    final = this.datos.rangoFinal;

    if (final > inicial) {
        rangos = (final - inicial) + 1;

        if (rangos < 0) {
            rangos = 0;
        }
        this.datos.total = rangos;
    } else {
        swal({
            title: 'Alerta!',
            text: 'El número de inicio no puede ser superior o igual al número de finalización',
            type: 'error',
            confirmButtonText: 'Aceptar'
        });

        this.datos.total = null;
    }
}
  
  onEnviar(){
    swal({
      title: 'Generando asignación!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this.datos.idTalonario = this.talonario.id;

		this._AsignacionService.register(this.datos, token).subscribe(
			response => {
        if(response.code == 200){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
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
      }
    ); 
  }

}