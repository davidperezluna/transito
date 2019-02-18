import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { LoginService } from '../../services/login.service';
import { EmpresaAlcaldia } from './empresaAlcaldia.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './empresaAlcaldia.component.html',
})
export class EmpresaAlcaldiaComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public empresas;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public formShow = false;
  public table:any; 
  public empresa: EmpresaAlcaldia;

  constructor(
		private _EmpresaService: EmpresaService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
		this._EmpresaService.getEmpresaAlcaldia().subscribe(
				response => {
          this.empresas = response.data;
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
      responsive: false,
      pageLength: 6,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-forward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-backward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
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

  getSucursal(empresa:any){
    this.empresa = empresa;
    console.log(this.empresa);
    this.formShow = true;
    this.formIndex = false;
  }

}