import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { ComparendoService } from '../../../services/comparendo.service';
import { CfgComparendoEstadoService } from '../../../services/cfgComparendoEstado.service';
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
  public table: any;

  public filtro: any = null;

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

constructor(
  private _comparendoService: ComparendoService,
  private _EstadoService: CfgComparendoEstadoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){    
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearch(){
    let token = this._loginService.getToken();

    this._comparendoService.searchByFiltros(this.search, token).subscribe(
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
}