import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { LoginService } from '../../services/login.service';
import { VhloTpConvenio } from './vhloTpConvenio.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloTpConvenio.component.html',
})
export class VhloTpConvenioComponent implements OnInit {
  public errorMessage;
	public id;
	public empresas;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public formShow = false;
  public table:any;  
  public empresa: VhloTpConvenio;

  constructor(
		private _EmpresaService: UserEmpresaService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

		this._EmpresaService.indexByAlcaldia().subscribe(
				response => {
          this.empresas = response.data;

          let timeoutId = setTimeout(() => {  
            this.onInitTable();
          }, 100);

          swal.close();
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
      responsive: false,
      pageLength: 6,
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
    this.formEdit = false;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.formShow = false;
        this.ngOnInit();
      }
  }

  getConvenio(empresa:any){
    this.empresa = empresa;
    this.formShow = true;
    this.formIndex = false;
  }

}