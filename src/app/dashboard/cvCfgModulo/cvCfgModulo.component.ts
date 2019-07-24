import { Component, OnInit } from '@angular/core';
import { CvCfgModuloService } from '../../services/cvCfgModulo.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvCfgModulo.component.html'
})

export class CvCfgModuloComponent implements OnInit {
  public errorMessage;

	public modulo: any;
	public modulos: any = null;
  
  public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table: any = null;


  constructor(
    private _ModuloService: CvCfgModuloService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._ModuloService.index().subscribe(
				response => {
          this.modulos = response.data;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
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


  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
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
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onEdit(modulo:any){
    this.modulo = modulo;
    this.formEdit = true;
    this.formIndex = false;
  }
}