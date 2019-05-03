import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CvCdoComparendoService } from '../../../services/cvCdoComparendo.service';
import { CfgComparendoEstadoService } from '../../../services/cfgComparendoEstado.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html'
})

export class StateComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public errorMessage;
  public estados: any = null;
  public estadoSelected: any;
  public comparendos: any = null;
  public table: any;

constructor(
  private _LoginService: LoginService,
  private _ComparendoService: CvCdoComparendoService,
  private _EstadoService: CfgComparendoEstadoService,
){}

  ngOnInit() { 
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
  }

  onSearch(){
    let token = this._LoginService.getToken();

    this._ComparendoService.searchByState({'idEstado': this.estadoSelected}, token).subscribe(
			response => {
        if(response.status == 'success'){
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
        }else{
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

  iniciarTabla() {
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
}